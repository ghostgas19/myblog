import { notFound } from "next/navigation";
import { getPostById, getCategories } from "@/lib/data";
import { PostEditor } from "@/components/admin/post-editor";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    getPostById(id),
    getCategories(),
  ]);

  if (!post) notFound();

  return <PostEditor post={post} categories={categories} />;
}
