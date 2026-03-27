"use client";

import * as React from "react";
import * as ReactDom from "react-dom";
import { AlertCircle, Film, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary" | "success";
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  variant = "danger",
  loading = false,
}: ConfirmModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const variantStyles = {
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[4px_4px_0_theme(colors.red.900)]",
    primary: "bg-amber text-primary-foreground hover:bg-amber-light shadow-[4px_4px_0_theme(colors.amber.900)]",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-[4px_4px_0_theme(colors.green.900)]",
  };

  const iconStyles = {
    danger: "text-destructive bg-destructive/10",
    primary: "text-amber bg-amber/10",
    success: "text-green-500 bg-green-500/10",
  };

  return ReactDom.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={loading ? undefined : onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-card border-2 border-maroon-deep max-w-sm w-full shadow-[12px_12px_0_theme(colors.maroon-mid)] animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Film strip decoration top */}
        <div 
          className="h-6 bg-film-strip flex items-center justify-between px-3" 
          style={{
            backgroundImage: 'repeating-linear-gradient(to right, transparent 0px, transparent 10px, rgba(255,255,255,0.08) 10px, rgba(255,255,255,0.08) 20px)'
          }}
        >
          <Film className="w-3.5 h-3.5 text-white/20" />
          <Film className="w-3.5 h-3.5 text-white/20" />
        </div>
        
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className={cn("p-2.5 rounded-sm shrink-0", iconStyles[variant])}>
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground leading-tight mb-1">{title}</h3>
              <div className="w-10 h-0.5 bg-amber/30 mb-3" />
            </div>
          </div>
          
          <p className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-muted-foreground uppercase tracking-wider mb-8 border-l-2 border-maroon-warm/30 pl-4 py-1">
            {message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="flex-1 font-mono text-[10px] tracking-[2px] uppercase py-3 border border-border hover:bg-muted transition-all active:translate-y-0.5 active:shadow-none bg-card"
            >
              {cancelText}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className={cn(
                "flex-1 font-mono text-[10px] tracking-[2px] uppercase py-3 transition-all active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2",
                variantStyles[variant]
              )}
            >
              {loading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {confirmText}
            </button>
          </div>
        </div>
        
        {/* Film strip decoration bottom */}
        <div 
          className="h-4 bg-film-strip opacity-40" 
          style={{
            backgroundImage: 'repeating-linear-gradient(to right, transparent 0px, transparent 15px, rgba(0,0,0,0.1) 15px, rgba(0,0,0,0.1) 30px)'
          }}
        />
        
        {/* Kodak style label */}
        <div className="absolute top-0 right-10 bg-film-yellow text-[8px] font-mono font-bold px-2 py-0.5 text-black uppercase transform -translate-y-px">
          KDK-200
        </div>
      </div>
    </div>,
    document.body
  );
}
