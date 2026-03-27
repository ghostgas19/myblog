"use client";

import { useState } from "react";
import { FilmStrip } from "@/components/film-strip";
import Link from "next/link";
import { Send, Loader2 } from "lucide-react";

export default function KotakSuratPage() {
  const [content, setContent] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSending(true);
    setError("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, sender_name: senderName }),
      });

      if (!res.ok) throw new Error("Gagal mengirim pesan");

      setIsSent(true);
      setContent("");
      setSenderName("");
    } catch (err) {
      setError("Maaf, terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FilmStrip label="Kotak Surat · Pesan Tanpa Nama" />

      <div className="max-w-2xl mx-auto px-6 py-20">
        <header className="text-center mb-12">
          <h1 className="font-serif text-5xl font-bold text-amber mb-4 italic">Kotak Surat</h1>
          <p className="font-mono text-sm tracking-[3px] text-maroon-light uppercase">Titipkan pesan, rahasia, atau sapaan hangat.</p>
        </header>

        {isSent ? (
          <div className="bg-white/5 border border-white/10 p-12 text-center rounded-lg shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-amber/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-amber" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-4">Pesan Terkirim!</h2>
            <p className="font-sans text-muted-foreground mb-8 text-balance">
              Terima kasih telah menitipkan pesanmu di kotak surat ini. Mungkin suatu saat nanti akan terjawab.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="font-mono text-[10px] tracking-[3px] uppercase text-amber hover:text-film-yellow transition-colors"
            >
              Kirim Pesan Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 relative">
            {/* Paper decoration */}
            <div className="bg-[#fdfcf0] p-8 md:p-12 shadow-[10px_10px_0_rgba(0,0,0,0.2)] border border-amber/10 min-h-[400px] relative text-gray-800">
              {/* Lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                   style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2.5rem'}} />
              
              <div className="relative z-10 space-y-6">
                <textarea
                  required
                  placeholder="Tuliskan pesanmu di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-64 bg-transparent border-none focus:ring-0 font-mono text-lg resize-none placeholder:text-gray-400 leading-[2.5rem]"
                  disabled={isSending}
                />
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 pt-4 border-t border-gray-200">
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Dari:</span>
                  <input
                    type="text"
                    placeholder="Nama atau Anonim"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:ring-0 font-mono text-sm text-gray-700 italic placeholder:text-gray-300"
                    disabled={isSending}
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 font-mono text-xs text-center">{error}</p>}

            <div className="flex justify-center flex-col items-center gap-6">
              <button
                type="submit"
                disabled={isSending || !content.trim()}
                className="group relative flex items-center gap-3 bg-amber hover:bg-amber-light text-primary-foreground font-mono text-xs tracking-[4px] uppercase px-10 py-5 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0_theme(colors.maroon-deep)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Masukkan ke Kotak Surat
                  </>
                )}
              </button>
              
              <Link href="/" className="font-mono text-[10px] tracking-[4px] text-muted-foreground hover:text-amber transition-colors uppercase">
                ← Kembali
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
