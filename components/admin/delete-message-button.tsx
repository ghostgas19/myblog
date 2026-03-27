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
          toast.success("Message deleted permanently.");
          router.refresh();
        } else {
          toast.error("Failed to delete message.");
        }
      } catch (err) {
        toast.error("An error occurred while deleting.");
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
        aria-label="Delete message"
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
        title="Delete Message"
        message="This message will be permanently deleted from your inbox. This action cannot be undone."
        confirmText="Delete Permanently"
        variant="danger"
      />
    </>
  );
}
