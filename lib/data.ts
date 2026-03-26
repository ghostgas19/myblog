import type { Post } from "./types";

// In-memory categories store
let categories: string[] = [
  "Refleksi",
  "Perjalanan",
  "Rekomendasi",
  "Kehidupan",
  "Kamera",
  "Harian",
];

export async function getCategories(): Promise<string[]> {
  return [...categories];
}

export function createCategory(name: string): string {
  const normalized = name.trim();
  if (
    categories.map((c) => c.toLowerCase()).includes(normalized.toLowerCase())
  ) {
    return categories.find(
      (c) => c.toLowerCase() === normalized.toLowerCase(),
    )!;
  }
  categories.push(normalized);
  return normalized;
}

export function deleteCategory(name: string): boolean {
  const idx = categories.findIndex(
    (c) => c.toLowerCase() === name.toLowerCase(),
  );
  if (idx === -1) return false;
  categories.splice(idx, 1);
  return true;
}

// In-memory store — swap this out for Prisma/Drizzle ORM later
const posts: Post[] = [
  {
    id: "1",
    title: "Mengapa Saya Mulai Menulis Lagi Setelah Dua Tahun Diam",
    slug: "mengapa-saya-mulai-menulis-lagi",
    excerpt:
      "Ada yang bilang menulis adalah cara terbaik untuk memahami diri sendiri. Saya tidak percaya itu — sampai suatu malam saya duduk di depan layar kosong dan tanpa sadar tangan mulai bergerak, kata demi kata, jujur tanpa filter.",
    content: `Ada yang bilang menulis adalah cara terbaik untuk memahami diri sendiri. Saya tidak percaya itu — sampai suatu malam saya duduk di depan layar kosong dan tanpa sadar tangan mulai bergerak.

Dua tahun terakhir saya isi dengan hal-hal yang terlihat produktif dari luar: proyek selesai, target terpenuhi, angka-angka yang memuaskan. Tapi ada yang hilang. Semacam kemampuan untuk duduk diam tanpa merasa bersalah.

Tulisan pertama yang muncul bukan cerita indah. Itu keluhan. Tentang betapa lelahnya saya berpura-pura baik-baik saja. Dan entah kenapa, setelah menuliskannya, saya tidur lebih nyenyak dari biasanya.

Mungkin itulah yang selama ini saya cari. Bukan audiens, bukan apresiasi. Hanya satu tempat di mana saya tidak perlu menyunting diri sendiri.`,
    category: "Refleksi",
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
    title: "Kereta Malam ke Kota yang Tidak Pernah Saya Rencanakan",
    slug: "kereta-malam-ke-kota-tak-direncanakan",
    excerpt:
      "Tiket itu dibeli tiga menit sebelum keberangkatan. Tidak ada rencana, tidak ada penginapan. Hanya tas ransel dan satu kamera dengan satu roll film tersisa.",
    content: `Tiket itu dibeli tiga menit sebelum keberangkatan. Tidak ada rencana, tidak ada penginapan. Hanya tas ransel dan satu kamera dengan satu roll film tersisa.

Saat kereta mulai bergerak, saya sadar — ini mungkin keputusan paling tidak bertanggung jawab yang pernah saya buat. Tapi juga yang paling mengasyikkan dalam setahun terakhir.

Kota itu kecil. Tidak ada di daftar destinasi wisata mana pun. Tapi ada satu warung kopi di tepi rel yang membuat kopi tubruk paling jujur yang pernah saya minum. Dan seorang bapak tua yang cerita tentang kota ini dua puluh tahun lalu, sebelum semua berubah.

Satu roll film. Tiga puluh enam frame. Tidak ada yang Instagram-worthy. Tapi semuanya nyata.`,
    category: "Perjalanan",
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
    title: "5 Buku yang Mengubah Cara Saya Melihat Keheningan",
    slug: "5-buku-mengubah-cara-melihat-keheningan",
    excerpt:
      "Bukan self-help. Bukan motivasi. Ini buku-buku yang membuat saya merasa senang duduk sendirian selama berjam-jam tanpa merasa perlu melakukan apa-apa.",
    content: `Bukan self-help. Bukan motivasi. Ini buku-buku yang membuat saya merasa senang duduk sendirian selama berjam-jam tanpa merasa perlu melakukan apa-apa.

**1. Siddhartha — Hermann Hesse.** Bukan tentang agama. Tentang perjalanan menemukan bahwa jawaban tidak ada di luar, selalu di dalam.

**2. The Remains of the Day — Kazuo Ishiguro.** Novel paling sepi yang pernah saya baca. Dan justru karena itu, paling mengena.

**3. Meditations — Marcus Aurelius.** Bukan untuk dibaca habis sekaligus. Satu paragraf sehari, sudah cukup untuk mengubah cara pandang.

**4. Norwegian Wood — Haruki Murakami.** Karena terkadang kita perlu bertemu karakter yang lebih galau dari kita sendiri.

**5. Sapiens — Yuval Noah Harari.** Supaya kita ingat bahwa semua kekhawatiran kita, dalam skala waktu yang lebih besar, tidak sebesar yang kita kira.`,
    category: "Rekomendasi",
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
    title: "Tentang Berdamai dengan Kecepatan Hidup Kita Sendiri",
    slug: "berdamai-kecepatan-hidup-sendiri",
    excerpt:
      "Semua orang sepertinya sudah selangkah lebih maju. Tapi mungkin memang begitu cara hidup bekerja — bukan tentang siapa yang paling cepat, tapi siapa yang paling sadar.",
    content: `Semua orang sepertinya sudah selangkah lebih maju. Teman kuliah sudah kerja di perusahaan besar. Yang lain sudah punya rumah. Yang satu lagi baru posting foto pernikahan.

Dan kita? Masih di sini, dengan kopi yang sudah dingin, menatap to-do list yang belum selesai.

Saya pernah menghabiskan terlalu banyak waktu membandingkan. Sampai suatu hari saya sadar: saya sedang berlari di lintasan orang lain. Tentu saja saya selalu kalah.

Lintasan saya tidak lebih lambat. Hanya berbeda. Dan berdamai dengan itu adalah salah satu hal terberat sekaligus paling membebaskan yang pernah saya lakukan.`,
    category: "Kehidupan",
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
    title: "Hal-hal Kecil yang Saya Syukuri di Akhir Tahun Lalu",
    slug: "hal-kecil-yang-disyukuri",
    excerpt:
      "Bukan pencapaian besar. Bukan momen dramatis. Tapi kopi yang tepat suhunya, hujan di hari yang pas, dan percakapan yang tidak perlu berakhir.",
    content: `Bukan pencapaian besar. Bukan momen dramatis. Ini tentang hal-hal yang mudah terlewat kalau kita terlalu sibuk mencari yang besar.

Kopi yang tepat suhunya di pagi yang dingin. Hujan deras di sore hari ketika tidak ada rencana keluar. Menemukan buku yang rasanya ditulis tepat untuk kondisi hati kita saat itu.

Percakapan yang mengalir tanpa terasa, sampai sadar sudah dua jam berlalu. Momen ketika seseorang berkata "saya juga merasakan hal yang sama" dan rasanya tidak sendirian lagi.

Tahun lalu tidak sempurna. Tapi ada cukup banyak momen kecil yang membuatnya layak untuk dikenang dengan hangat.`,
    category: "Refleksi",
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
    title: "Catatan Perjalanan: Kamera Film di Era Digital",
    slug: "kamera-film-era-digital",
    excerpt:
      "Ketika semua orang memegang smartphone dengan kamera 50 megapiksel, saya memilih membawa kamera yang hanya bisa mengambil 36 foto.",
    content: `Ketika semua orang memegang smartphone dengan kamera 50 megapiksel, saya memilih membawa kamera yang hanya bisa mengambil 36 foto.

Pilihan itu membuat saya lebih selektif. Lebih hadir. Lebih sadar bahwa setiap frame punya harga.

Ada sesuatu yang magis ketika kita menunggu roll film dicuci dan dicetak. Ketegangan kecil. Antisipasi yang tidak bisa kita rasakan di era digital.

Dan ketika foto-foto itu akhirnya muncul — dengan segala ketidaksempurnaannya, grain-nya, warnanya yang sedikit melenceng — rasanya seperti kenangan yang lebih nyata dari resolusi tinggi mana pun.`,
    category: "Rekomendasi",
    status: "draft",
    coverEmoji: "📷",
    coverGradient: "from-maroon-mid to-maroon-warm",
    bannerUrl:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=600&fit=crop",
    readingTime: 5,
    createdAt: "2025-01-10T11:00:00Z",
  },
];

// Simulated async DB layer — swap for Prisma later
export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getPublishedPosts(): Promise<Post[]> {
  return posts.filter((p) => p.status === "published");
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  return posts.find((p) => p.id === id);
}

export function createPost(data: Omit<Post, "id" | "createdAt">): Post {
  const newPost: Post = {
    ...data,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return newPost;
}

export function updatePost(
  id: string,
  data: Partial<Omit<Post, "id">>,
): Post | null {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...data };
  return posts[idx];
}

export function deletePost(id: string): boolean {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  posts.splice(idx, 1);
  return true;
}
