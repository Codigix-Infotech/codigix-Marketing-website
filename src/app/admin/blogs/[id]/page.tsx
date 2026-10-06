import BlogEditor from '@/components/admin/BlogEditor';

export default function EditBlogPage({ params }: { params: { id: string } }) {
  return <BlogEditor id={Number(params.id)} />;
}
