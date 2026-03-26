"use server";

import { revalidatePath } from "next/cache";
import {
  createPost,
  updatePost,
  deletePost,
  createCategory,
  deleteCategory,
} from "./data";
import type { PostStatus } from "./types";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const status = (formData.get("status") as PostStatus) ?? "draft";
  const bannerUrl = formData.get("bannerUrl") as string | null;

  if (!title || !content || !category) {
    return { error: "Title, category and content are required." };
  }

  const post = createPost({
    title,
    slug,
    excerpt: content.slice(0, 180).replace(/\*\*/g, "") + "...",
    content,
    category,
    status,
    bannerUrl: bannerUrl || undefined,
    coverEmoji: "📝",
    coverGradient: "from-maroon-mid to-maroon-warm",
    readingTime: Math.ceil(content.split(" ").length / 200),
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");

  return { success: true, post };
}

export async function updatePostAction(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const status = formData.get("status") as PostStatus;
  const bannerUrl = formData.get("bannerUrl") as string | null;

  if (!title || !content || !category) {
    return { error: "Title, category and content are required." };
  }

  const post = updatePost(id, {
    title,
    slug,
    excerpt: content.slice(0, 180).replace(/\*\*/g, "") + "...",
    content,
    category,
    status,
    bannerUrl: bannerUrl || undefined,
    readingTime: Math.ceil(content.split(" ").length / 200),
  });

  if (!post) return { error: "Post not found." };

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");

  return { success: true, post };
}

export async function deletePostAction(id: string) {
  const ok = deletePost(id);
  if (!ok) return { error: "Post not found." };

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");

  return { success: true };
}

export async function createCategoryAction(name: string) {
  const trimmed = name?.trim();
  if (!trimmed) return { error: "Nama kategori tidak boleh kosong." };
  if (trimmed.length > 40)
    return { error: "Nama kategori maksimal 40 karakter." };

  const category = createCategory(trimmed);
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");

  return { success: true, category };
}

export async function deleteCategoryAction(name: string) {
  if (!name) return { error: "Nama kategori tidak valid." };

  const ok = deleteCategory(name);
  if (!ok) return { error: "Kategori tidak ditemukan." };

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");

  return { success: true };
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Mock auth — replace with real auth (NextAuth, Supabase, etc.)
  if (email === "admin@ruangcerita.id" && password === "password") {
    return { success: true };
  }
  return { error: "Invalid credentials. Try admin@ruangcerita.id / password" };
}

export async function logoutAction() {
  return { success: true };
}
