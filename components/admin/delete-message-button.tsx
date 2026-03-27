"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteMessage } from "@/lib/data";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { toast } from "sonner";

export function DeleteMessageButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const ok = await deleteMessage(id);
        if (ok) {
          toast.success("Pesan telah dihapus selamanya.");
          router.refresh();
        } else {
          toast.error("Gagal menghapus pesan.");
        }
      } catch (err) {
        toast.error("Terjadi kesalahan saat menghapus.");
      } finally {
        setShowConfirm(false);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
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

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Hapus Pesan"
        message="Pesan ini akan dihapus selamanya dari kotak surat Anda. Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus Selamanya"
        variant="danger"
      />
    </>
  );
}
