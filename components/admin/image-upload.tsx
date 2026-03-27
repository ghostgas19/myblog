"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, CheckCircle } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onUpload: (url: string) => void;
  label?: string;
}

export function ImageUpload({
  value,
  onUpload,
  label = "Banner Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size cannot exceed 5MB");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Blob
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUpload(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleClear() {
    setPreview(null);
    onUpload("");
    setError(null);
  }

  return (
    <div className="space-y-1.5">
      <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground flex items-center gap-1.5">
        <Upload className="w-3 h-3" /> {label}
      </label>

      {preview ? (
        <div className="relative bg-card border border-border rounded-sm overflow-hidden group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-black/0 md:group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 bg-amber hover:bg-amber-light text-primary-foreground font-mono text-[9px] tracking-[1px] uppercase px-2.5 py-1.5 rounded-sm transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Uploading
                </>
              ) : (
                <>
                  <Upload className="w-3 h-3" />
                  Change
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={uploading}
              className="flex items-center gap-1.5 bg-destructive/70 hover:bg-destructive text-destructive-foreground font-mono text-[9px] tracking-[1px] uppercase px-2.5 py-1.5 rounded-sm transition-colors disabled:opacity-50"
            >
              <X className="w-3 h-3" />
              Remove
            </button>
          </div>

          <div className="absolute top-2 right-2 bg-green-400/15 border border-green-400/25 rounded-sm p-1 text-green-400">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-border hover:border-amber/50 rounded-sm p-6 text-center transition-colors disabled:opacity-50 bg-muted/30 hover:bg-muted/50"
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin text-muted-foreground" />
              <p className="font-mono text-[10px] tracking-[1px] uppercase text-muted-foreground">
                Uploading...
              </p>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="font-mono text-[10px] tracking-[1px] uppercase text-muted-foreground mb-0.5">
                Click or drag image here
              </p>
              <p className="text-xs text-muted-foreground/60">
                JPG, PNG, WebP • Max 5MB
              </p>
            </>
          )}
        </button>
      )}

      {error && <p className="text-xs text-destructive font-mono">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
