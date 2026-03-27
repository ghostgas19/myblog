"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PenSquare,
  Home,
  Film,
  Menu,
  X,
  Mail,
  Settings,
} from "lucide-react";



import { cn } from "@/lib/utils";

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-sidebar border-r border-sidebar-border flex-col shrink-0">
        <AdminSidebarContent onNavigate={close} />
      </aside>

      {/* Mobile sidebar (drawer) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col md:hidden transform transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!open}
      >
        <AdminSidebarContent onNavigate={close} />
      </aside>

      {/* Backdrop for mobile drawer */}
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={close}
          aria-label="Tutup menu navigasi"
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="relative h-12 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4 sm:px-6 shrink-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, transparent 0px, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 16px)",
            }}
          />
          <div className="relative z-10 flex items-center gap-3">
            {/* Hamburger (mobile only) */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-sm text-sidebar-foreground/80 hover:text-amber hover:bg-sidebar-accent/40 p-1.5 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <span className="font-mono text-[9px] tracking-[3px] sm:tracking-[4px] uppercase text-film-yellow opacity-80">
              ▣ CMS · Ruang Cerita
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function AdminSidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  return (
    <>
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
        <NavItem
          href="/admin"
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Dashboard"
          onClick={onNavigate}
        />
        <NavItem
          href="/admin/new"
          icon={<PenSquare className="w-4 h-4" />}
          label="Tulisan Baru"
          onClick={onNavigate}
        />
        <NavItem
          href="/admin/messages"
          icon={<Mail className="w-4 h-4" />}
          label="Pesan Masuk"
          onClick={onNavigate}
        />
        <NavItem
          href="/admin/settings"
          icon={<Settings className="w-4 h-4" />}
          label="Pengaturan"
          onClick={onNavigate}
        />


      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-sidebar-border">
        <NavItem
          href="/"
          icon={<Home className="w-4 h-4" />}
          label="Lihat Blog"
          onClick={onNavigate}
        />
      </div>
    </>
  );
}

function NavItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 group"
    >
      <span className="text-muted-foreground group-hover:text-amber transition-colors duration-200">
        {icon}
      </span>
      <span className="font-mono text-[11px] tracking-[1.5px] uppercase">{label}</span>
    </Link>
  );
}
