import { getPublishedPosts, getCategories, getProfile } from "@/lib/data";
import HomePageWithIntro from "@/components/home-page-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [posts, categories, profile] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
    getProfile(),
  ]);

  return <HomePageWithIntro posts={posts} categories={categories} profile={profile} />;
}
