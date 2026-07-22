'use client';

import { useEffect, useRef, useState } from 'react';

/* Interactive force-directed map of a site's pages and their real internal
   links. Plain canvas, no dependencies; physics run client-side. Used by
   /graph/ (this site) and /graph-old-website/ (the live WordPress site),
   each passing its own extracted data. */

export interface GraphData {
  nodes: GraphNode[];
  links: [number, number][];
}

export interface GraphNode {
  id: string;
  t: string;
  k: string;
  in: number;
}

const COLORS: Record<string, string> = {
  home: '#FFD166',
  pillar: '#C5BDE5',
  article: '#6FA8DC',
  wiki: '#67D5B5',
  advisor: '#F49E71',
  page: '#9AA5B8',
};
const LABELS: Record<string, string> = {
  home: 'Home',
  pillar: 'Pillars',
  article: 'Articles',
  wiki: 'Wiki',
  advisor: 'Advisors',
  page: 'Pages',
};

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  dragged?: boolean;
}

interface SiteGraphProps {
  data: GraphData;
  subtitle: string;
  /** Base for opening nodes on click; '' = same site */
  linkBase?: string;
}

export default function SiteGraph({ data, subtitle, linkBase = '' }: SiteGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef('');
  const hiddenRef = useRef(new Set<string>());
  const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(new Set());

  useEffect(() => {
    hiddenRef.current = hiddenTypes;
  }, [hiddenTypes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tip = tipRef.current;
    if (!canvas || !tip) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const N: SimNode[] = data.nodes.map((n, i) => {
      const golden = Math.PI * (3 - Math.sqrt(5));
      const r = 60 + Math.sqrt(i) * 26;
      return {
        ...n,
        x: Math.cos(i * golden) * r,
        y: Math.sin(i * golden) * r,
        vx: 0,
        vy: 0,
        r: 3.5 + Math.min(14, Math.sqrt(n.in) * 1.9),
      };
    });
    const L = data.links;
    const adj: number[][] = N.map(() => []);
    for (const [s, t] of L) {
      adj[s].push(t);
      adj[t].push(s);
    }

    let W = 0;
    let H = 0;
    const DPR = window.devicePixelRatio || 1;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    const cam = { x: 0, y: 0, z: Math.min(window.innerWidth, window.innerHeight) / 1400 };
    const toScreen = (x: number, y: number) => [(x - cam.x) * cam.z + W / 2, (y - cam.y) * cam.z + H / 2];
    const toWorld = (px: number, py: number) => [(px - W / 2) / cam.z + cam.x, (py - H / 2) / cam.z + cam.y];

    let alpha = 1;
    let hover = -1;
    let dragNode: SimNode | null = null;
    let panning = false;
    let lastM: [number, number] | null = null;
    let lastPinch = 0;
    let raf = 0;

    const tick = () => {
      if (alpha < 0.005) return;
      alpha *= 0.995;
      for (let i = 0; i < N.length; i++) {
        const a = N[i];
        for (let j = i + 1; j < N.length; j++) {
          const b = N[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          const d2 = dx * dx + dy * dy || 1;
          if (d2 > 250000) continue;
          const f = (900 / d2) * alpha;
          dx *= f;
          dy *= f;
          a.vx += dx;
          a.vy += dy;
          b.vx -= dx;
          b.vy -= dy;
        }
      }
      for (const [s, t] of L) {
        const a = N[s];
        const b = N[t];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (d - 70) * 0.01 * alpha;
        a.vx += (dx / d) * f;
        a.vy += (dy / d) * f;
        b.vx -= (dx / d) * f;
        b.vy -= (dy / d) * f;
      }
      for (const n of N) {
        n.vx -= n.x * 0.0006 * alpha;
        n.vy -= n.y * 0.0006 * alpha;
        if (n !== dragNode) {
          n.x += n.vx;
          n.y += n.vy;
        }
        n.vx *= 0.85;
        n.vy *= 0.85;
      }
    };

    const draw = () => {
      tick();
      const hiddenSet = hiddenRef.current;
      const q = queryRef.current.toLowerCase();
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const focus = hover >= 0 ? new Set([hover, ...adj[hover]]) : null;
      ctx.lineWidth = 0.6;
      for (const [s, t] of L) {
        if (hiddenSet.has(N[s].k) || hiddenSet.has(N[t].k)) continue;
        const inFocus = focus && (s === hover || t === hover);
        if (focus && !inFocus) continue;
        const [x1, y1] = toScreen(N[s].x, N[s].y);
        const [x2, y2] = toScreen(N[t].x, N[t].y);
        ctx.strokeStyle = inFocus ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.07)';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      for (let i = 0; i < N.length; i++) {
        const n = N[i];
        if (hiddenSet.has(n.k)) continue;
        const [x, y] = toScreen(n.x, n.y);
        if (x < -40 || y < -40 || x > W + 40 || y > H + 40) continue;
        const match = q !== '' && (n.t.toLowerCase().includes(q) || n.id.includes(q));
        const dim = (focus && !focus.has(i)) || (q !== '' && !match);
        ctx.globalAlpha = dim ? 0.12 : 1;
        ctx.fillStyle = COLORS[n.k];
        ctx.beginPath();
        ctx.arc(x, y, n.r * Math.max(cam.z, 0.5), 0, 7);
        ctx.fill();
        if (match || i === hover || (cam.z > 1.1 && n.in > 6 && !dim)) {
          ctx.fillStyle = 'rgba(255,255,255,.85)';
          ctx.font = `${i === hover ? '600 ' : ''}11px system-ui`;
          ctx.fillText(n.t.length > 42 ? `${n.t.slice(0, 40)}…` : n.t, x + n.r + 5, y + 3);
        }
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    };

    const nodeAt = (px: number, py: number) => {
      const [wx, wy] = toWorld(px, py);
      for (let i = N.length - 1; i >= 0; i--) {
        const n = N[i];
        if (hiddenRef.current.has(n.k)) continue;
        const dx = wx - n.x;
        const dy = wy - n.y;
        const r = (n.r + 3) / Math.min(cam.z, 1);
        if (dx * dx + dy * dy < r * r) return i;
      }
      return -1;
    };

    const onMove = (e: MouseEvent) => {
      if (dragNode) {
        const [wx, wy] = toWorld(e.clientX, e.clientY);
        dragNode.x = wx;
        dragNode.y = wy;
        dragNode.dragged = true;
        alpha = Math.max(alpha, 0.1);
      } else if (panning && lastM) {
        cam.x -= (e.clientX - lastM[0]) / cam.z;
        cam.y -= (e.clientY - lastM[1]) / cam.z;
      } else {
        hover = nodeAt(e.clientX, e.clientY);
        if (hover >= 0) {
          const n = N[hover];
          tip.style.display = 'block';
          tip.style.left = `${Math.min(e.clientX + 14, W - 330)}px`;
          tip.style.top = `${e.clientY + 14}px`;
          tip.innerHTML = `<b>${n.t}</b><small>${n.id} · ${LABELS[n.k]} · ${n.in} incoming links</small>`;
        } else {
          tip.style.display = 'none';
        }
      }
      lastM = [e.clientX, e.clientY];
    };
    const onDown = (e: MouseEvent) => {
      const i = nodeAt(e.clientX, e.clientY);
      if (i >= 0) {
        dragNode = N[i];
        dragNode.dragged = false;
      } else panning = true;
      canvas.classList.add('cursor-grabbing');
    };
    const onUp = (e: MouseEvent) => {
      if (dragNode && !dragNode.dragged) {
        const i = nodeAt(e.clientX, e.clientY);
        if (i >= 0 && N[i] === dragNode) window.open(linkBase + N[i].id, '_blank');
      }
      dragNode = null;
      panning = false;
      canvas.classList.remove('cursor-grabbing');
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const f = e.deltaY < 0 ? 1.12 : 0.89;
      const [wx, wy] = toWorld(e.clientX, e.clientY);
      cam.z *= f;
      const [wx2, wy2] = toWorld(e.clientX, e.clientY);
      cam.x += wx - wx2;
      cam.y += wy - wy2;
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const i = nodeAt(t.clientX, t.clientY);
        if (i >= 0) {
          dragNode = N[i];
          dragNode.dragged = false;
        } else panning = true;
        lastM = [t.clientX, t.clientY];
      } else if (e.touches.length === 2) {
        lastPinch = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && lastM) {
        const t = e.touches[0];
        if (dragNode) {
          const [wx, wy] = toWorld(t.clientX, t.clientY);
          dragNode.x = wx;
          dragNode.y = wy;
          dragNode.dragged = true;
          alpha = Math.max(alpha, 0.1);
        } else if (panning) {
          cam.x -= (t.clientX - lastM[0]) / cam.z;
          cam.y -= (t.clientY - lastM[1]) / cam.z;
        }
        lastM = [t.clientX, t.clientY];
      } else if (e.touches.length === 2) {
        const d = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        if (lastPinch > 0) cam.z *= d / lastPinch;
        lastPinch = d;
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (dragNode && !dragNode.dragged && e.changedTouches.length === 1) {
        window.open(linkBase + dragNode.id, '_blank');
      }
      dragNode = null;
      panning = false;
      lastPinch = 0;
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="fixed inset-0 bg-[#0D1B3D] overflow-hidden">
      <canvas ref={canvasRef} className="block cursor-grab" />
      <div className="fixed top-4 left-4 bg-[#0D1B3D]/85 backdrop-blur border border-white/10 rounded-2xl p-4 max-w-[300px]">
        <p className="text-white font-medium text-[15px]">Insurance Fable · Site Graph</p>
        <p className="text-white/50 text-[11.5px]">
          {subtitle} · {data.nodes.length} pages · {data.links.length} internal links
        </p>
        <input
          type="text"
          placeholder="Search pages…"
          onChange={(e) => {
            queryRef.current = e.target.value.trim();
          }}
          className="mt-2.5 w-full bg-white/10 border border-white/15 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-white/40 placeholder:text-white/40"
        />
        <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5">
          {Object.keys(COLORS).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() =>
                setHiddenTypes((prev) => {
                  const next = new Set(prev);
                  if (next.has(k)) next.delete(k);
                  else next.add(k);
                  return next;
                })
              }
              className={`flex items-center gap-1.5 text-[11px] text-white/75 ${hiddenTypes.has(k) ? 'opacity-30' : ''}`}
            >
              <i className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: COLORS[k] }} />
              {LABELS[k]}
            </button>
          ))}
        </div>
        <a href="/" className="mt-3 inline-block text-white/50 hover:text-white text-[11px] underline">
          ← Back to the site
        </a>
      </div>
      <div
        ref={tipRef}
        className="fixed hidden pointer-events-none bg-white text-[#0D1B3D] rounded-lg px-2.5 py-1.5 text-xs max-w-[320px] shadow-xl [&_small]:block [&_small]:text-[#0D1B3D]/55"
      />
      <p className="fixed bottom-3 left-4 text-white/35 text-[11px] hidden md:block">
        scroll = zoom · drag background = pan · drag node = move · click node = open page · hover = highlight links
      </p>
    </div>
  );
}
