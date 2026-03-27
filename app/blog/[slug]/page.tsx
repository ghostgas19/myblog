import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { FilmStrip } from '@/components/film-strip'
import { ArrowLeft, Clock, Tag } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Ruang Cerita`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const paragraphs = post.content.split('\n\n').filter(Boolean)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FilmStrip />

      <div className="max-w-2xl mx-auto px-6 pb-20 pt-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8 text-xs font-mono tracking-widest uppercase text-muted-foreground">
          <Link href="/" className="hover:text-amber transition-colors duration-200 flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            Beranda
          </Link>
          <span>/</span>
          <span className="text-amber truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Cover */}
        <div className="w-full h-48 md:h-64 flex items-center justify-center bg-gradient-to-br from-maroon-deep via-maroon-warm to-amber rounded-sm mb-8 relative overflow-hidden">
          {post.bannerUrl ? (
            <img
              src={post.bannerUrl}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 12px)',
            }}
          />
        </div>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[9px] tracking-[2px] uppercase bg-amber text-primary-foreground px-2 py-0.5 rounded-sm flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" />
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground italic">{formatDate(post.createdAt)}</span>
            <span className="text-xs text-muted-foreground italic flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime} menit baca
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-foreground text-balance [text-shadow:2px_2px_0_theme(colors.maroon-deep)]">
            {post.title}
          </h1>

          <div className="h-px bg-gradient-to-r from-amber via-maroon-warm to-transparent mt-6" />
        </header>

        {/* Article body */}
        <article 
          className="prose prose-invert prose-amber max-w-none font-sans text-[0.96rem] leading-[1.85] text-cream-dark 
                     prose-headings:font-serif prose-headings:text-foreground prose-headings:font-bold
                     prose-p:mb-5 prose-p:leading-relaxed
                     prose-strong:text-foreground prose-strong:font-semibold
                     prose-a:text-amber prose-a:no-underline hover:prose-a:underline
                     prose-blockquote:border-l-amber prose-blockquote:bg-maroon-mid/20 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-sm prose-blockquote:italic
                     prose-li:marker:text-amber"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />


        {/* Footer divider */}
        <div className="flex items-center gap-3 my-10" aria-hidden="true">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-maroon-warm to-transparent" />
          <span className="text-amber opacity-80">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-maroon-warm to-transparent" />
        </div>

        {/* Back link */}
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[2px] uppercase text-amber-light hover:tracking-[4px] transition-all duration-200 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda
          </Link>
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
            ■ {post.slug.slice(0, 6).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  )
}
