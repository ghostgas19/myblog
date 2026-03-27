"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePostAction } from "@/lib/actions";
import { Trash2, Loader2 } from "lucide-react";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { toast } from "sonner";

export function DeletePostButton({ id }: { id: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deletePostAction(id);
        toast.success("Post deleted successfully.");
        router.refresh();
      } catch (err) {
        toast.error("Failed to delete post.");
      } finally {
        setShowConfirm(false);
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={pending}
        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors duration-200 disabled:opacity-50"
        aria-label="Delete post"
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
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone and all data will be lost."
        confirmText="Yes, Delete"
        variant="danger"
      />
    </>
  );
}
