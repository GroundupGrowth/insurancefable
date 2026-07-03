'use client';

import { Newspaper } from 'lucide-react';
import { Card, PageHeader } from '../ui';

/* Blog: placeholder until the WordPress content export arrives. The full
   inventory (139 posts) is mapped in docs/migration/inventory.md. */

export default function BlogAdminPage() {
  return (
    <>
      <PageHeader title="Blog" text="Article management lands with the content migration." />
      <Card className="text-center py-16">
        <span className="inline-flex w-14 h-14 rounded-2xl bg-[#F5F5F5] items-center justify-center mb-5">
          <Newspaper className="w-6 h-6 text-[#0D1B3D]/40" />
        </span>
        <h2 className="text-[#0D1B3D] text-xl font-medium mb-2">Waiting on the content export</h2>
        <p className="text-[#0D1B3D]/60 text-sm leading-relaxed max-w-md mx-auto">
          The live site has 139 posts, already inventoried and mapped to one article template.
          Once the WordPress export is in, they migrate in a single pass and this section becomes
          the place to browse, edit, and publish them.
        </p>
        <p className="text-[#0D1B3D]/40 text-xs mt-4">
          Until then, blog links on the site point to the existing WordPress blog.
        </p>
      </Card>
    </>
  );
}
