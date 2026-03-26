import { redirect } from "next/navigation";
import { getCategories } from "@/lib/data";
import { getSession } from "@/lib/actions";
import { PostEditor } from "@/components/admin/post-editor";

export default async function NewPostPage() {
  const isAuthenticated = await getSession();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const categories = await getCategories();
  return <PostEditor categories={categories} />;
}
