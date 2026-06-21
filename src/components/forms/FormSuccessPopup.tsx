"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { easeOut, springSnappy } from "@/lib/motion";

type FormSuccessPopupProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export function FormSuccessPopup({ open, title, message, onClose }: FormSuccessPopupProps) {
  const reduced = useReducedMotion();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (!open || reduced) return;

    const timer = window.setTimeout(handleClose, 6000);
    return () => window.clearTimeout(timer);
  }, [open, reduced, handleClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Fermer la notification"
            className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-success-title"
            aria-describedby="form-success-message"
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl shadow-brand-navy/20"
            initial={reduced ? false : { opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={springSnappy}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-orange/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl" />

            <div className="relative px-6 py-8 text-center sm:px-8">
              <motion.div
                className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50"
                initial={reduced ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...springSnappy, delay: 0.1 }}
              >
                <motion.svg
                  viewBox="0 0 52 52"
                  className="h-12 w-12"
                  aria-hidden="true"
                >
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: easeOut, delay: 0.15 }}
                  />
                  <motion.path
                    d="M14 27l8 8 16-18"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: easeOut, delay: 0.45 }}
                  />
                </motion.svg>
              </motion.div>

              <motion.h2
                id="form-success-title"
                className="text-2xl font-bold text-brand-navy"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25, ease: easeOut }}
              >
                {title}
              </motion.h2>

              <motion.p
                id="form-success-message"
                className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35, ease: easeOut }}
              >
                {message}
              </motion.p>

              <motion.button
                type="button"
                onClick={handleClose}
                className="mt-7 inline-flex items-center justify-center rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-orange-dark"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45, ease: easeOut }}
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
              >
                Parfait, merci !
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
