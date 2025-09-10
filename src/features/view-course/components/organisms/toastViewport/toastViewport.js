'use client'

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./toastViewport.module.css";

export function ToastViewport({ toasts, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className={styles.viewport}>
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <ToastCard key={t.id} t={t} onClose={() => onClose(t.id)} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

function ToastCard({ t, onClose }) {
  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const variantClass =
    t.variant === "success" ? styles.success :
    t.variant === "warning" ? styles.warning :
    t.variant === "error" ? styles.error :
    styles.info;

  return (
    <motion.div
      role="status"
      aria-live={t.variant === "error" ? "assertive" : "polite"}
      className={`${styles.card} ${variantClass}`}
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -12, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
    >
      <div className={styles.row}>
        <div className={styles.icon} aria-hidden>
          {t.variant === "success" ? "✅" : t.variant === "warning" ? "⚠️" : t.variant === "error" ? "⛔" : "ℹ️"}
        </div>
        <div className={styles.content}>
          {t.title ? <div className={styles.title}>{t.title}</div> : null}
          <div className={styles.message}>{t.message}</div>
          {t.actionLabel && (
            <div className={styles.actions}>
              <button
                onClick={() => { t.onAction?.(); onClose(); }}
                className={styles.actionBtn}
              >
                {t.actionLabel}
              </button>
            </div>
          )}
        </div>
        {t.dismissible !== false && (
          <button
            aria-label="Cerrar"
            className={styles.closeBtn}
            onClick={onClose}
          >
            ✕
          </button>
        )}
      </div>
      <div
        className={styles.bar}
        // Animate the progress bar to zero over duration
        style={{ "--durationms": `${Math.max(0, t.duration || 0)}ms` }}
      />
    </motion.div>
  );
}
