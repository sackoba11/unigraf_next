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

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

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
        {activeImage && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-[110] rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6 sm:top-6"
            >
              Fermer
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-2 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-black/60 px-4 py-3 text-2xl leading-none text-white backdrop-blur-sm transition hover:bg-black/80 sm:left-6 lg:left-10"
                  aria-label="Image précédente"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-2 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-black/60 px-4 py-3 text-2xl leading-none text-white backdrop-blur-sm transition hover:bg-black/80 sm:right-6 lg:right-10"
                  aria-label="Image suivante"
                >
                  ›
                </button>
              </>
            )}

            <motion.div
              className="flex w-full max-w-[min(96vw,1600px)] flex-col items-center justify-center"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Zone image : hauteur/largeur viewport, ratio libre */}
              <div className="relative flex h-[min(78vh,900px)] w-full items-center justify-center sm:h-[min(82vh,960px)] lg:h-[min(85vh,1000px)]">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt || "Réalisation UNIGRAF"}
                  width={1920}
                  height={1440}
                  className="max-h-full max-w-full object-contain"
                  sizes="(max-width: 768px) 96vw, (max-width: 1536px) 90vw, 1600px"
                  priority
                />
              </div>

              <div className="mt-4 flex w-full max-w-3xl flex-col items-center gap-1 px-2 text-center">
                {activeImage.alt && (
                  <p className="text-sm text-white/90 sm:text-base">{activeImage.alt}</p>
                )}
                {images.length > 1 && (
                  <p className="text-xs text-white/50">
                    {activeIndex + 1} / {images.length}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
