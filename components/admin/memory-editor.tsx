"use client";

import { useState, useEffect } from "react";
import { Memory, getMemories, addMemory, deleteMemory, updateMemory } from "@/lib/data";
import { ImageUpload } from "@/components/admin/image-upload";
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Plus, 
  Trash2, 
  Save, 
  Loader2, 
  Image as ImageIcon 
} from "lucide-react";
import { toast } from "sonner";

export function MemoryEditor() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState({
    image: "",
    location: "",
    caption: "",
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchMemories();
  }, []);

  async function fetchMemories() {
    try {
      const data = await getMemories();
      setMemories(data);
    } catch (err) {
      toast.error("Gagal mengambil data kenangan");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!newItem.image) {
      toast.error("Foto wajib diunggah");
      return;
    }
    setSaving(true);
    try {
      await addMemory(newItem);
      toast.success("Kenangan baru ditambahkan");
      setNewItem({
        image: "",
        location: "",
        caption: "",
        date: new Date().toISOString().split('T')[0]
      });
      fetchMemories();
    } catch (err) {
      toast.error("Gagal menambah kenangan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus kenangan ini?")) return;
    try {
      await deleteMemory(id);
      toast.success("Kenangan dihapus");
      fetchMemories();
    } catch (err) {
      toast.error("Gagal menghapus");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-6 h-6 animate-spin text-amber" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Form Tambah Baru */}
      <section className="bg-card border border-border rounded-sm p-6 shadow-sm">
        <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-amber" />
          Tambah Kenangan Baru
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8">
          <div className="space-y-2">
            <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground block">
              Foto Polaroid
            </label>
            <ImageUpload 
              value={newItem.image}
              onUpload={(url: string) => setNewItem({ ...newItem, image: url })}
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground block flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> Lokasi
                </label>
                <input 
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  placeholder="Contoh: Yogyakarta, Indonesia"
                  className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground block flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Tanggal
                </label>
                <input 
                  type="date"
                  value={newItem.date}
                  onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                  className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground block flex items-center gap-1.5">
                <ImageIcon className="w-3 h-3" /> Cerita Singkat
              </label>
              <textarea 
                value={newItem.caption}
                onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                placeholder="Tuliskan cerita singkat di balik foto ini..."
                rows={3}
                className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber resize-none"
              />
            </div>

            <button
              onClick={handleAdd}
              disabled={saving}
              className="bg-amber hover:bg-amber-light text-primary-foreground font-mono text-[10px] tracking-[2px] uppercase px-6 py-2.5 rounded-sm transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              Simpan Kenangan
            </button>
          </div>
        </div>
      </section>

      {/* Daftar Kenangan */}
      <section>
        <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
          <Camera className="w-5 h-5 text-amber" />
          Koleksi Kenangan ({memories.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <div key={memory.id} className="bg-card border border-border rounded-sm overflow-hidden flex flex-col group">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <img 
                  src={memory.image} 
                  alt={memory.location}
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />
                <button
                  onClick={() => handleDelete(memory.id)}
                  className="absolute top-2 right-2 p-2 bg-destructive/80 hover:bg-destructive text-destructive-foreground rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[9px] text-amber uppercase flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> {memory.location}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground uppercase flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" /> {new Date(memory.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm italic font-serif leading-relaxed opacity-80 decoration-amber/30 decoration-wavy underline-offset-4 line-clamp-3">
                  "{memory.caption}"
                </p>
              </div>
            </div>
          ))}

          {memories.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-sm">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-[2px]">
                Belum ada kenangan yang tersimpan.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
