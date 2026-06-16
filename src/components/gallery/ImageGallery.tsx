"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "@/types/content";

type ImageGalleryProps = {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
};

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + images.length) % images.length,
    );
  }, [images.length]);
  const showNext = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrev]);

  if (!images.length) return null;

  const gridClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <>
      <div className={`grid gap-4 ${gridClass}`}>
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 text-left shadow-sm ring-1 ring-slate-200 transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <Image
              src={image.src}
              alt={image.alt || "Réalisation UNIGRAF"}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {image.alt && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-sm font-medium text-white">{image.alt}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-5xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute -top-12 right-0 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
              >
                Fermer
              </button>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black">
                <Image
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt || "Réalisation UNIGRAF"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {images[activeIndex].alt && (
                <p className="mt-3 text-center text-sm text-white/90">
                  {images[activeIndex].alt}
                </p>
              )}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70"
                    aria-label="Image précédente"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70"
                    aria-label="Image suivante"
                  >
                    ›
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
