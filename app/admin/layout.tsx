import Link from 'next/link'
import { Film, LayoutDashboard, PenSquare, Home, LogOut } from 'lucide-react'
import { getSession, logoutAction } from '@/lib/actions'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await getSession()

  // If not authenticated, render children directly (for login page)
  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5 mb-0.5">
            <Film className="w-4 h-4 text-amber" />
            <span className="font-serif text-base font-bold text-foreground">
              Ruang <em className="italic text-amber-light">Cerita</em>
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-[3px] uppercase text-muted-foreground">
            Admin Dashboard
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1" aria-label="Admin navigation">
          <NavItem href="/admin" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
          <NavItem href="/admin/new" icon={<PenSquare className="w-4 h-4" />} label="Tulisan Baru" />
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <NavItem href="/" icon={<Home className="w-4 h-4" />} label="Lihat Blog" />
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive transition-colors duration-200 group"
            >
              <span className="text-muted-foreground group-hover:text-destructive transition-colors duration-200">
                <LogOut className="w-4 h-4" />
              </span>
              <span className="font-mono text-[11px] tracking-[1.5px] uppercase">Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-12 bg-sidebar border-b border-sidebar-border flex items-center px-6 shrink-0">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, transparent 0px, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 16px)',
            }}
          />
          <div className="absolute left-64 font-mono text-[9px] tracking-[4px] uppercase text-film-yellow opacity-60">
            ▣ CMS · Ruang Cerita
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 group"
    >
      <span className="text-muted-foreground group-hover:text-amber transition-colors duration-200">
        {icon}
      </span>
      <span className="font-mono text-[11px] tracking-[1.5px] uppercase">{label}</span>
    </Link>
  )
}
