export type PostStatus = 'draft' | 'published'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  status: PostStatus
  coverEmoji: string
  coverGradient: string
  bannerUrl?: string
  readingTime: number
  createdAt: string
}

export interface Message {
  id: string;
  content: string;
  sender_name: string;
  created_at: string;
}
