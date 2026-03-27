import { Suspense } from 'react'
import Link from 'next/link'
import { getPosts } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { DeletePostButton } from '@/components/admin/delete-post-button'
import { PenSquare, Eye, FileText, CheckCircle, Clock, PenLine } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function StatsCards() {
  const posts = await getPosts()
  const published = posts.filter((p) => p.status === 'published').length
  const drafts = posts.filter((p) => p.status === 'draft').length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {[
        { label: 'Total Tulisan', value: posts.length, icon: <FileText className="w-5 h-5" />, color: 'text-amber' },
        { label: 'Terpublikasi', value: published, icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-400' },
        { label: 'Draft', value: drafts, icon: <Clock className="w-5 h-5" />, color: 'text-muted-foreground' },
      ].map(({ label, value, icon, color }) => (
        <div key={label} className="bg-card border border-border rounded-sm p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
          <span className={color}>{icon}</span>
          <div>
            <div className="font-mono text-[8px] sm:text-[10px] tracking-[2px] uppercase text-muted-foreground">{label}</div>
            <div className={`font-serif text-xl sm:text-2xl font-bold ${color}`}>{value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

async function PostsTable() {
  const posts = await getPosts()

  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden overflow-x-auto">
      {/* Film frame top */}
      <div
        className="h-3 bg-film-strip"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgba(255,255,255,0.06) 6px, rgba(255,255,255,0.06) 12px)',
        }}
      />

      {/* Table header - hidden on mobile, shown on sm and up */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_100px_120px_80px] gap-4 px-3 sm:px-5 py-2 sm:py-3 border-b border-border font-mono text-[8px] sm:text-[9px] tracking-[2px] uppercase text-muted-foreground">
        <span>Judul</span>
        <span>Kategori</span>
        <span>Tanggal</span>
        <span className="text-right">Aksi</span>
      </div>

      {/* Rows - responsive layout */}
      {posts.length === 0 ? (
        <div className="px-4 sm:px-5 py-8 sm:py-12 text-center text-muted-foreground font-mono text-xs tracking-widest uppercase">
          Belum ada tulisan.
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="grid grid-cols-1 sm:grid-cols-[1fr_100px_120px_80px] gap-3 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 border-b border-border/50 items-start sm:items-center hover:bg-muted/20 transition-colors duration-150 last:border-0"
          >
            {/* Title + status */}
            <div className="min-w-0">
              <p className="font-serif text-sm sm:text-base font-semibold text-foreground truncate leading-tight">
                {post.title}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5 sm:mt-1">
                <span
                  className={`inline-flex items-center gap-1 font-mono text-[7px] sm:text-[8px] tracking-[1px] sm:tracking-[1.5px] uppercase px-1.5 py-0.5 rounded-sm ${
                    post.status === 'published'
                      ? 'bg-green-400/15 text-green-400 border border-green-400/25'
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  {post.status === 'published' ? (
                    <CheckCircle className="w-2.5 h-2.5" />
                  ) : (
                    <Clock className="w-2.5 h-2.5" />
                  )}
                  {post.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>

            {/* Category - visible on sm and up */}
            <span className="hidden sm:inline font-mono text-[8px] sm:text-[9px] tracking-[1px] uppercase text-amber bg-amber/10 px-2 py-0.5 rounded-sm w-fit">
              {post.category}
            </span>

            {/* Date - visible on sm and up */}
            <span className="hidden sm:inline text-xs text-muted-foreground italic">{formatDate(post.createdAt)}</span>

            {/* Actions - on mobile show below title, on sm and up on right */}
            <div className="flex items-center justify-start sm:justify-end gap-1 sm:gap-2 flex-wrap">
              <Link
                href={`/blog/${post.slug}`}
                className="p-1.5 text-muted-foreground hover:text-amber transition-colors duration-200"
                aria-label="Lihat tulisan"
                target="_blank"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                href={`/admin/edit/${post.id}`}
                className="p-1.5 text-muted-foreground hover:text-amber transition-colors duration-200"
                aria-label="Edit tulisan"
              >
                <PenLine className="w-4 h-4" />
              </Link>
              <DeletePostButton id={post.id} />
            </div>

            {/* Mobile-only category and date info */}
            <div className="sm:hidden col-span-1 flex flex-wrap gap-2 text-[10px] text-muted-foreground mt-2">
              <span className="font-mono text-[8px] tracking-[1px] uppercase text-amber bg-amber/10 px-2 py-0.5 rounded-sm">
                {post.category}
              </span>
              <span className="italic">{formatDate(post.createdAt)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden animate-pulse">
      <div className="h-3 bg-film-strip" />
      <div className="px-5 py-3 border-b border-border">
        <div className="h-3 w-64 bg-muted rounded-sm" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-5 py-4 border-b border-border/50 flex gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded-sm" />
            <div className="h-3 w-16 bg-muted rounded-sm" />
          </div>
          <div className="h-4 w-20 bg-muted rounded-sm" />
          <div className="h-4 w-24 bg-muted rounded-sm" />
          <div className="h-4 w-16 bg-muted rounded-sm ml-auto" />
        </div>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[2px] uppercase text-muted-foreground mt-1">
            Kelola semua tulisan
          </p>
        </div>
        <Link
          href="/admin/new"
          className="flex items-center gap-2 bg-amber hover:bg-amber-light text-primary-foreground font-mono text-[9px] sm:text-[10px] tracking-[2px] uppercase px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm transition-colors duration-200 whitespace-nowrap"
        >
          <PenSquare className="w-4 h-4" />
          <span>Tulisan Baru</span>
        </Link>
      </div>

      {/* Stats */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 sm:h-20 bg-card border border-border rounded-sm animate-pulse" />
            ))}
          </div>
        }
      >
        <StatsCards />
      </Suspense>

      {/* Posts table */}
      <Suspense fallback={<TableSkeleton />}>
        <PostsTable />
      </Suspense>
    </div>
  )
}
