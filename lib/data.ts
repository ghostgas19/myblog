import type { Post, Message, Profile, Recommendation, Memory } from "./types";
import { supabase } from "./supabase-server";

// ---- Default seed data (dipakai saat pertama kali DB masih kosong) ----

const defaultCategories: string[] = [
  "Reflections",
  "Travel",
  "Recommendations",
  "Life",
  "Camera",
  "Daily",
];

// Seed posts – akan dimasukkan ke database saat pertama kali
const defaultPosts: Post[] = [
  {
    id: "1",
    title: "Why I Started Writing Again After Two Years of Silence",
    slug: "why-i-started-writing-again",
    excerpt:
      "Some say writing is the best way to understand yourself. I didn't believe it — until one night I sat in front of a blank screen and unconsciously my hands started moving, word by word, honest without filter.",
    content: `Some say writing is the best way to understand yourself. I didn't believe it — until one night I sat in front of a blank screen and unconsciously my hands started moving.

The last two years I filled with things that looked productive from the outside: projects finished, targets met, satisfying numbers. But something was missing. A sort of ability to sit still without feeling guilty.

The first writing that appeared wasn't a beautiful story. It was a complaint. About how tired I was of pretending to be okay. And for some reason, after writing it down, I slept better than usual.

Maybe that's what I've been looking for all this time. Not an audience, not appreciation. Just one place where I don't need to edit myself.`,
    category: "Reflections",
    status: "published",
    coverEmoji: "🎞️",
    coverGradient: "from-maroon-deep via-maroon-warm to-amber",
    bannerUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop",
    readingTime: 7,
    createdAt: "2025-03-12T08:00:00Z",
  },
  {
    id: "2",
    title: "Night Train to a City I Never Planned",
    slug: "night-train-to-unplanned-city",
    excerpt:
      "The ticket was bought three minutes before departure. No plan, no lodging. Just a backpack and one camera with one roll of film left.",
    content: `The ticket was bought three minutes before departure. No plan, no lodging. Just a backpack and one camera with one roll of film left.

As the train started moving, I realized — this might be the most irresponsible decision I've made in a year. But also the most exciting.

The city was small. It wasn't on any tourist destination list. But there was one coffee shop by the tracks that made the most honest tubruk coffee I've ever drunk. And an old man who told stories about this city twenty years ago, before everything changed.

One roll of film. Thirty-six frames. Nothing Instagram-worthy. But everything real.`,
    category: "Travel",
    status: "published",
    coverEmoji: "🚂",
    coverGradient: "from-maroon-mid to-amber",
    bannerUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop",
    readingTime: 5,
    createdAt: "2025-02-28T10:00:00Z",
  },
  {
    id: "3",
    title: "5 Books That Changed the Way I See Silence",
    slug: "5-books-changed-way-see-silence",
    excerpt:
      "Not self-help. Not motivation. These are books that made me feel happy sitting alone for hours without feeling the need to do anything.",
    content: `Not self-help. Not motivation. These are books that made me feel happy sitting alone for hours without feeling the need to do anything.

**1. Siddhartha — Hermann Hesse.** Not about religion. About the journey of finding that the answers are not outside, always inside.

**2. The Remains of the Day — Kazuo Ishiguro.** The loneliest novel I've ever read. And precisely because of that, the most touching.

**3. Meditations — Marcus Aurelius.** Not to be read all at once. One paragraph a day is enough to change your perspective.

**4. Norwegian Wood — Haruki Murakami.** Because sometimes we need to meet characters who are more troubled than we are.

**5. Sapiens — Yuval Noah Harari.** So we remember that all our worries, in a larger timescale, are not as big as we think.`,
    category: "Recommendations",
    status: "published",
    coverEmoji: "📚",
    coverGradient: "from-maroon-warm to-maroon-deep",
    bannerUrl:
      "https://images.unsplash.com/photo-150784272343-583f20270319?w=1200&h=600&fit=crop",
    readingTime: 4,
    createdAt: "2025-02-14T09:00:00Z",
  },
  {
    id: "4",
    title: "On Making Peace with Our Own Life's Pace",
    slug: "making-peace-with-own-life-pace",
    excerpt:
      "Everyone seems to be a step ahead. But maybe that's how life works — it's not about who's the fastest, but who's the most aware.",
    content: `Everyone seems to be a step ahead. College friends already working in big companies. Others already have houses. Another just posted a wedding photo.

And us? Still here, with coffee that's already cold, staring at a to-do list that isn't finished.

I once spent too much time comparing. Until one day I realized: I was running on someone else's track. Of course I always lost.

My track isn't slower. Just different. And making peace with that is one of the hardest yet most liberating things I've ever done.`,
    category: "Life",
    status: "published",
    coverEmoji: "☁️",
    coverGradient: "from-amber to-maroon-warm",
    bannerUrl:
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1200&h=600&fit=crop",
    readingTime: 6,
    createdAt: "2025-02-03T14:00:00Z",
  },
  {
    id: "5",
    title: "Small Things I Was Grateful for at the End of Last Year",
    slug: "small-things-grateful-for",
    excerpt:
      "Not big achievements. Not dramatic moments. But coffee at the right temperature, rain on the right day, and conversations that didn't need to end.",
    content: `Not big achievements. Not dramatic moments. This is about things that are easy to miss if we're too busy looking for the big ones.

Coffee at the right temperature on a cold morning. Heavy rain in the afternoon when there were no plans to go out. Finding a book that felt like it was written exactly for my heart's condition at that time.

Conversations that flowed without notice, until realizing two hours had passed. Moments when someone says "I feel the same way" and it feels like not being alone anymore.

Last year wasn't perfect. But there were enough small moments that made it worthy of being remembered warmly.`,
    category: "Reflections",
    status: "published",
    coverEmoji: "🌙",
    coverGradient: "from-maroon-deep to-maroon-mid",
    bannerUrl:
      "https://images.unsplash.com/photo-1507842217343-583f20270319?w=1200&h=600&fit=crop",
    readingTime: 3,
    createdAt: "2025-01-20T18:00:00Z",
  },
  {
    id: "6",
    title: "Travel Notes: Film Camera in the Digital Era",
    slug: "film-camera-digital-era",
    excerpt:
      "When everyone holds a smartphone with a 50-megapixel camera, I choose to carry a camera that can only take 36 photos.",
    content: `When everyone holds a smartphone with a 50-megapixel camera, I choose to carry a camera that can only take 36 photos.

That choice makes me more selective. More present. More aware that every frame has a price.

There's something magical when we wait for the roll of film to be developed and printed. A small tension. Anticipation that we can't feel in the digital age.

And when those photos finally appear — with all their imperfections, grain, slightly off colors — it feels like a memory that's more real than any high resolution.`,
    category: "Recommendations",
    status: "draft",
    coverEmoji: "📷",
    coverGradient: "from-maroon-mid to-maroon-warm",
    bannerUrl:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=600&fit=crop",
    readingTime: 5,
    createdAt: "2025-01-10T11:00:00Z",
  },
];

// ---- Helper: seed awal ke Supabase kalau tabel masih kosong ----

async function ensureSeeded() {
  // Cek apakah sudah ada post di DB
  const { data, error } = await supabase
    .from("posts")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Supabase getPosts (seed check) error:", error);
    return;
  }

  if (data && data.length > 0) return;

  // Seed categories
  const categoryRows = defaultCategories.map((name) => ({ name }));
  const { error: catError } = await supabase
    .from("categories")
    .upsert(categoryRows, { onConflict: "name" });
  if (catError) {
    console.error("Supabase seed categories error:", catError);
  }

  // Seed posts
  const postRows = defaultPosts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    status: p.status,
    cover_emoji: p.coverEmoji,
    cover_gradient: p.coverGradient,
    banner_url: p.bannerUrl ?? null,
    reading_time: p.readingTime,
    created_at: p.createdAt,
  }));

  const { error: postError } = await supabase.from("posts").upsert(postRows, {
    onConflict: "id",
  });
  if (postError) {
    console.error("Supabase seed posts error:", postError);
  }
}

// ---- Categories API ----

export async function getCategories(): Promise<string[]> {
  await ensureSeeded();

  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Supabase getCategories error:", error);
    // fallback ke default kalau error parah
    return [...defaultCategories];
  }

  return (data ?? []).map((row: { name: string }) => row.name);
}


export async function createCategory(name: string): Promise<string> {
  const normalized = name.trim();
  if (!normalized) return normalized;

  // Cek dulu apakah sudah ada (case-insensitive)
  const { data: existing, error: selectError } = await supabase
    .from("categories")
    .select("name")
    .ilike("name", normalized)
    .maybeSingle();

  if (selectError && selectError.code !== "PGRST116") {
    console.error("Supabase createCategory select error:", selectError);
  }

  if (existing?.name) {
    return existing.name;
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({ name: normalized })
    .select("name")
    .single();

  if (error) {
    console.error("Supabase createCategory insert error:", error);
    throw new Error("Gagal menyimpan kategori");
  }

  return data.name;
}

export async function deleteCategory(name: string): Promise<boolean> {
  const { error, count } = await supabase
    .from("categories")
    .delete({ count: "exact" })
    .ilike("name", name);

  if (error) {
    console.error("Supabase deleteCategory error:", error);
    return false;
  }

  return (count ?? 0) > 0;
}

// ---- Posts API ----

function mapRowToPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    status: row.status,
    coverEmoji: row.cover_emoji,
    coverGradient: row.cover_gradient,
    bannerUrl: row.banner_url ?? undefined,
    readingTime: row.reading_time,
    createdAt: row.created_at,
  };
}

export async function getPosts(): Promise<Post[]> {
  await ensureSeeded();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, category, status, cover_emoji, cover_gradient, banner_url, reading_time, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getPosts error:", error);
    return [];
  }

  return (data ?? []).map(mapRowToPost);
}

export async function getPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, category, status, cover_emoji, cover_gradient, banner_url, reading_time, created_at",
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getPublishedPosts error:", error);
    return [];
  }

  return (data ?? []).map(mapRowToPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, category, status, cover_emoji, cover_gradient, banner_url, reading_time, created_at",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.error("Supabase getPostBySlug error:", error);
    return undefined;
  }

  return data ? mapRowToPost(data) : undefined;
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, category, status, cover_emoji, cover_gradient, banner_url, reading_time, created_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.error("Supabase getPostById error:", error);
    return undefined;
  }

  return data ? mapRowToPost(data) : undefined;
}

export async function createPost(
  data: Omit<Post, "id" | "createdAt">,
): Promise<Post> {
  const id = String(Date.now());
  const createdAt = new Date().toISOString();

  const row = {
    id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    status: data.status,
    cover_emoji: data.coverEmoji,
    cover_gradient: data.coverGradient,
    banner_url: data.bannerUrl ?? null,
    reading_time: data.readingTime,
    created_at: createdAt,
  };

  const { error } = await supabase.from("posts").insert(row);
  if (error) {
    console.error("Supabase createPost error:", error);
    throw new Error("Gagal menyimpan tulisan");
  }

  return { ...data, id, createdAt };
}

export async function updatePost(
  id: string,
  data: Partial<Omit<Post, "id" | "createdAt">>,
): Promise<Post | null> {
  const patch: any = {};
  if (data.title !== undefined) patch.title = data.title;
  if (data.slug !== undefined) patch.slug = data.slug;
  if (data.excerpt !== undefined) patch.excerpt = data.excerpt;
  if (data.content !== undefined) patch.content = data.content;
  if (data.category !== undefined) patch.category = data.category;
  if (data.status !== undefined) patch.status = data.status;
  if (data.coverEmoji !== undefined) patch.cover_emoji = data.coverEmoji;
  if (data.coverGradient !== undefined)
    patch.cover_gradient = data.coverGradient;
  if (data.bannerUrl !== undefined) patch.banner_url = data.bannerUrl ?? null;
  if (data.readingTime !== undefined) patch.reading_time = data.readingTime;

  const { data: updated, error } = await supabase
    .from("posts")
    .update(patch)
    .eq("id", id)
    .select(
      "id, title, slug, excerpt, content, category, status, cover_emoji, cover_gradient, banner_url, reading_time, created_at",
    )
    .maybeSingle();

  if (error) {
    console.error("Supabase updatePost error:", error);
    return null;
  }

  return updated ? mapRowToPost(updated) : null;
}

export async function deletePost(id: string): Promise<boolean> {
  const { error, count } = await supabase
    .from("posts")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    console.error("Supabase deletePost error:", error);
    return false;
  }

  return (count ?? 0) > 0;
}

// ---- Messages API ----

function mapRowToMessage(row: any): Message {
  return {
    id: row.id,
    content: row.content,
    sender_name: row.sender_name || "Anonim",
    created_at: row.created_at,
  };
}

export async function getMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getMessages error:", error);
    return [];
  }

  return (data ?? []).map(mapRowToMessage);
}

export async function createMessage(content: string, senderName?: string): Promise<Message | null> {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      content,
      sender_name: senderName || "Anonim",
    })
    .select("*")
    .single();

  if (error) {
    console.error("Supabase createMessage error:", error);
    return null;
  }

  return mapRowToMessage(data);
}

export async function deleteMessage(id: string): Promise<boolean> {
  const { error, count } = await supabase
    .from("messages")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteMessage error:", error);
    return false;
  }

  return (count ?? 0) > 0;
}

// ---- Settings API (Dynamic Content) ----

export async function getProfile(): Promise<Profile> {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "profile")
    .maybeSingle();

  if (error || !data) {
    console.error("Supabase getProfile error:", error);
    return {
      name: "Author",
      bio: "Stories about travels and small moments.",
      role: "Author",
      avatar: "👤",
    };
  }
  return data.value;
}

export async function getRecommendations(): Promise<Recommendation[]> {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "recommendations")
    .maybeSingle();

  if (error || !data) {
    console.error("Supabase getRecommendations error:", error);
    return [];
  }
  return data.value;
}

export async function updateSetting(key: string, value: any): Promise<boolean> {
  const { error } = await supabase
    .from("settings")
    .upsert({ key, value, updated_at: new Date().toISOString() });

  if (error) {
    console.error(`Supabase updateSetting (${key}) error:`, error);
    return false;
  }
  return true;
}

// Memory functions
export async function getMemories(): Promise<Memory[]> {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("date", { ascending: false });
  if (error) {
    console.error("Error fetching memories:", error);
    return [];
  }
  return data as Memory[];
}

export async function addMemory(memory: Omit<Memory, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("memories")
    .insert([memory])
    .select();
  if (error) throw error;
  return data;
}

export async function deleteMemory(id: string) {
  console.log("Menghapus kenangan dengan ID:", id);
  const { error } = await supabase
    .from("memories")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error("Gagal menghapus kenganan di Supabase:", error);
    throw error;
  }
  return true;
}

export async function updateMemory(id: string, memory: Partial<Memory>) {
  const { data, error } = await supabase
    .from("memories")
    .update(memory)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}
