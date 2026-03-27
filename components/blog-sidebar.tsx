import { getProfile } from "@/lib/data";

interface BlogSidebarProps {
  postCount: number
}

const TAGS = ['Refleksi', 'Perjalanan', 'Rekomendasi', 'Kehidupan', 'Kamera', 'Harian', 'Semua']

function SidebarBlock({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden mb-6">
      <div
        className="h-3 bg-film-strip"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, transparent 0px, transparent 4px, rgba(255,255,255,0.06) 4px, rgba(255,255,255,0.06) 8px)',
        }}
      />
      <div className="px-4 py-3 border-b border-border font-mono text-[10px] tracking-[3px] uppercase text-amber">
        {title}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export async function BlogSidebar({ postCount }: BlogSidebarProps) {
  const profile = await getProfile();
  
  return (
    <aside aria-label="Sidebar blog">
      <SidebarBlock title="Tentang Penulis">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-amber bg-maroon-deep overflow-hidden group mb-2.5">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
            )}
          </div>
          <div className="font-serif text-base text-foreground text-center">{profile.name}</div>
          <p className="text-[0.75rem] leading-relaxed text-cream-dark text-center opacity-80 mt-1.5 line-clamp-4">
            {profile.bio}
          </p>
        </div>
      </SidebarBlock>


      <SidebarBlock title="⬛ Film Counter">
        <div className="text-center">
          <div className="font-mono text-3xl text-film-yellow tracking-[6px] [text-shadow:0_0_12px_rgba(245,215,110,0.4)]">
            {String(postCount).padStart(2, '0')}
          </div>
          <div className="font-mono text-[9px] tracking-[3px] text-muted-foreground mt-1 uppercase">
            tulisan terpublikasi
          </div>
        </div>
      </SidebarBlock>

      <SidebarBlock title="Topik">
        <div className="flex flex-wrap gap-1.5">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[1px] uppercase px-2.5 py-1 border border-maroon-warm rounded-sm text-maroon-light hover:bg-maroon-warm hover:text-cream cursor-pointer transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </SidebarBlock>
    </aside>
  )
}
