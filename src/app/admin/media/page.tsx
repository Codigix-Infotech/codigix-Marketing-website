'use client';

import { MediaGrid } from '@/components/admin/MediaLibrary';
import { Card, PageHeader } from '@/components/admin/ui';

export default function MediaPage() {
  return (
    <div>
      <PageHeader title="Media Library" description="All uploaded images. Uploads are resized and converted to WebP automatically for fast page loads." />
      <Card>
        <MediaGrid folder="general" />
      </Card>
    </div>
  );
}
