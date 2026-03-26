'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FilmStrip } from '@/components/film-strip'
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (!response.ok || data.error) {
          setError(data.error ?? 'Login gagal, coba lagi.')
          return
        }

        const from = searchParams.get('from') || '/admin'
        router.push(from)
      } catch (err) {
        setError('Terjadi kesalahan saat login.')
      }
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <FilmStrip label="Admin · Ruang Cerita · Restricted" />

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-film-yellow text-primary-foreground font-mono text-[9px] tracking-[4px] uppercase px-3 py-1 rounded-sm mb-5">
              ▣ Admin Access
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Ruang <em className="italic text-amber-light">Cerita</em>
            </h1>
            <p className="text-xs text-muted-foreground font-mono tracking-[2px] uppercase mt-2">
              Dashboard Login
            </p>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            {/* Film frame top */}
            <div
              className="h-4 bg-film-strip"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgba(255,255,255,0.06) 6px, rgba(255,255,255,0.06) 12px)',
              }}
            />

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Error banner */}
              {error && (
                <div className="flex items-start gap-2.5 bg-destructive/15 border border-destructive/30 rounded-sm p-3 text-xs text-destructive-foreground">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-destructive" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue="admin@ruangcerita.id"
                  placeholder="admin@ruangcerita.id"
                  className="w-full bg-input border border-border rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground block">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="w-full bg-input border border-border rounded-sm px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Hint */}
              <p className="font-mono text-[9px] tracking-[1px] text-muted-foreground/60 text-center">
                Demo: admin@ruangcerita.id / password
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={pending}
                className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-primary-foreground font-mono text-[10px] tracking-[3px] uppercase px-4 py-3 rounded-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {pending ? (
                  <span className="animate-pulse">Masuk...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Masuk
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-[10px] font-mono tracking-[2px] uppercase text-muted-foreground mt-6">
            <a href="/" className="hover:text-amber transition-colors duration-200">
              ← Kembali ke Blog
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
