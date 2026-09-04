import { NextResponse } from 'next/server';
import { callerIsOwner } from '../../../../lib/adminApiAuth';
import { Ga4Error, ga4BatchReports, ga4Configured, reportRows } from '../../../../lib/ga4';

/* GA4 report for /admin/analytics (owner-only): totals, daily sessions,
   traffic by default channel group, and top pages for a date range — one
   batched Data-API call. */

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  if (!(await callerIsOwner(request))) {
    return NextResponse.json({ error: 'Owner access required.' }, { status: 403 });
  }
  if (!ga4Configured()) {
    return NextResponse.json(
      {
        error: 'not_configured',
        setup:
          'Google Analytics is not connected yet. In Google Cloud: create a service account, enable the Google Analytics Data API, and create a JSON key. In GA4 Admin → Property access management: add the service account email as Viewer. Then add Vercel env vars GA4_PROPERTY_ID (numeric property id), GOOGLE_SA_EMAIL, and GOOGLE_SA_PRIVATE_KEY (the private_key from the JSON key) and redeploy.',
      },
      { status: 503 },
    );
  }

  const params = new URL(request.url).searchParams;
  const start = params.get('start') ?? '';
  const end = params.get('end') ?? '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) {
    return NextResponse.json({ error: 'Pass start and end as YYYY-MM-DD.' }, { status: 400 });
  }

  try {
    const [totals, daily, channels, pages] = await ga4BatchReports(start, end, [
      { metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'newUsers' }, { name: 'keyEvents' }] },
      {
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      },
      {
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'keyEvents' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      },
      {
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: '12',
      },
    ]);

    const totalsRow = reportRows(totals)[0]?.metrics ?? [0, 0, 0, 0];
    return NextResponse.json({
      totals: {
        sessions: totalsRow[0] ?? 0,
        users: totalsRow[1] ?? 0,
        newUsers: totalsRow[2] ?? 0,
        keyEvents: totalsRow[3] ?? 0,
      },
      daily: reportRows(daily).map((row) => ({ date: row.dims[0], sessions: row.metrics[0] ?? 0 })),
      channels: reportRows(channels).map((row) => ({
        channel: row.dims[0],
        sessions: row.metrics[0] ?? 0,
        users: row.metrics[1] ?? 0,
        keyEvents: row.metrics[2] ?? 0,
      })),
      pages: reportRows(pages).map((row) => ({
        path: row.dims[0],
        views: row.metrics[0] ?? 0,
        sessions: row.metrics[1] ?? 0,
      })),
    });
  } catch (error) {
    if (error instanceof Ga4Error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    return NextResponse.json({ error: 'Google Analytics request failed.' }, { status: 502 });
  }
}
