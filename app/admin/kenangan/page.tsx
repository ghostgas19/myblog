import { MemoryEditor } from "@/components/admin/memory-editor";
import { Camera } from "lucide-react";

export default function AdminMemoriesPage() {
  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto">
      <header className="mb-10 text-center md:text-left">
        <div className="inline-block bg-film-yellow text-primary-foreground font-mono text-[9px] tracking-[4px] uppercase px-3 py-1 rounded-sm mb-4">
          ▣ Photo Collection
        </div>
        <h1 className="font-serif text-3xl font-bold flex items-center justify-center md:justify-start gap-3">
          <Camera className="w-8 h-8 text-amber" />
          Memories
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto md:mx-0">
          Manage your collection of photos, locations, and short stories from
          moments captured along the way.
        </p>
      </header>

      <MemoryEditor />
    </div>
  );
}
