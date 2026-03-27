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

export interface Profile {
  name: string;
  bio: string;
  role: string;
  avatar: string;
}

export interface Recommendation {
  id: string;
  title: string;
  artist: string;
  description?: string;
  image: string;
  link?: string;
  emoji?: string;
  type?: string;
}

export interface Memory {
  id: string;
  image: string;
  location: string;
  caption: string;
  date: string;
  created_at?: string;
}
