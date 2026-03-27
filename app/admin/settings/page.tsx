import { Suspense } from 'react'
import { getProfile, getRecommendations } from '@/lib/data'
import AdminContentEditor from '@/components/admin/content-editor'
import { Settings, Loader2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function EditorSection() {
  const [profile, recommendations] = await Promise.all([
    getProfile(),
    getRecommendations(),
  ])

  return (
    <AdminContentEditor 
      initialProfile={profile} 
      initialRecommendations={recommendations} 
    />
  )
}

export default function AdminSettingsPage() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8 border-b border-border pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber mb-1">
            <Settings className="w-5 h-5" />
            <h1 className="font-serif text-2xl font-bold text-foreground">Pengaturan Konten</h1>
          </div>
          <p className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground">
            Kelola profil dan kurasi rekomendasi secara dinamis
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground font-mono text-xs tracking-widest uppercase">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          Memuat Pengaturan...
        </div>
      }>
        <EditorSection />
      </Suspense>
    </div>
  )
}
