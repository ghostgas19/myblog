import { notFound, redirect } from "next/navigation";
import { getPostById, getCategories } from "@/lib/data";
import { getSession } from "@/lib/actions";
import { PostEditor } from "@/components/admin/post-editor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const isAuthenticated = await getSession();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const [post, categories] = await Promise.all([
    getPostById(id),
    getCategories(),
  ]);

  if (!post) notFound();

  return <PostEditor post={post} categories={categories} />;
}
