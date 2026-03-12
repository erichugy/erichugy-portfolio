"use client";

import { useEffect, useRef } from "react";

interface CelebrationModalProps {
  onClose: () => void;
  onReset: () => void;
}

const CONFETTI_EMOJIS = ["🎊", "🎉", "✨", "🍕", "🍣", "🌮"];

export default function CelebrationModal({ onClose, onReset }: CelebrationModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Celebration"
      onClick={onClose}
    >
      {CONFETTI_EMOJIS.map((e, i) => (
        <span
          key={i}
          className="pointer-events-none absolute text-2xl animate-[confetti-fall_3s_ease-in_infinite]"
          style={{
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 0.4}s`,
            top: "-2rem",
          }}
        >
          {e}
        </span>
      ))}

      <div
        className="relative mx-4 w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-heading">
          🎉 You found them all!
        </h2>

        <div className="mb-6 flex aspect-video items-center justify-center rounded-lg border border-border bg-page-alt">
          <p className="text-sm text-muted">🎬 Video coming soon</p>
        </div>

        <div className="flex gap-3">
          <button
            ref={closeRef}
            onClick={onClose}
            className="flex-1 rounded-[10px] border border-border px-4 py-2.5 text-sm font-semibold text-heading transition-colors hover:bg-page-alt"
          >
            Close
          </button>
          <button
            onClick={onReset}
            className="flex-1 rounded-[10px] bg-accent px-4 py-2.5 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-hover"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
