"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteMessage } from "@/lib/data";

export function DeleteMessageButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Hapus pesan ini selamanya?")) return;

    startTransition(async () => {
      try {
        const ok = await deleteMessage(id);
        if (ok) {
          router.refresh();
        } else {
          alert("Gagal menghapus pesan.");
        }
      } catch (err) {
        alert("Terjadi kesalahan.");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors duration-200 disabled:opacity-50"
      aria-label="Hapus pesan"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
