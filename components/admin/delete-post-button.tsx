'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deletePostAction } from '@/lib/actions'
import { Trash2, Loader2 } from 'lucide-react'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { toast } from 'sonner'

export function DeletePostButton({ id }: { id: string }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleDelete() {
    startTransition(async () => {
      try {
        await deletePostAction(id)
        toast.success('Tulisan berhasil dihapus.')
        router.refresh()
      } catch (err) {
        toast.error('Gagal menghapus tulisan.')
      } finally {
        setShowConfirm(false)
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={pending}
        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors duration-200 disabled:opacity-50"
        aria-label="Hapus tulisan"
      >
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        loading={pending}
        title="Hapus Tulisan"
        message="Yakin ingin menghapus tulisan ini? Tindakan ini tidak dapat dibatalkan dan semua data akan hilang."
        confirmText="Ya, Hapus"
        variant="danger"
      />
    </>
  )
}
