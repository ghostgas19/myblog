'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deletePostAction } from '@/lib/actions'
import { Trash2 } from 'lucide-react'

export function DeletePostButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleDelete() {
    startTransition(async () => {
      await deletePostAction(id)
      router.refresh()
    })
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] tracking-[1px] uppercase text-destructive-foreground">
          Yakin?
        </span>
        <button
          onClick={handleDelete}
          disabled={pending}
          className="font-mono text-[9px] tracking-[1px] uppercase text-destructive hover:underline disabled:opacity-50"
        >
          {pending ? '...' : 'Ya'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="font-mono text-[9px] tracking-[1px] uppercase text-muted-foreground hover:underline"
        >
          Batal
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-muted-foreground hover:text-destructive transition-colors duration-200"
      aria-label="Hapus tulisan"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
