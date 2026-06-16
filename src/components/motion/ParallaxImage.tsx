"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { imageReveal } from "@/lib/motion";

type ParallaxImageProps = Omit<ImageProps, "ref"> & {
  containerClassName?: string;
  parallax?: boolean;
};

export function ParallaxImage({
  containerClassName = "",
  parallax = true,
  className,
  alt,
  ...props
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], parallax && !reduced ? [30, -30] : [0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], parallax && !reduced ? [1.05, 1, 1.02] : [1, 1, 1]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${containerClassName}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={reduced ? undefined : imageReveal}
    >
      <motion.div style={{ y, scale }} className="relative h-full w-full">
        <Image alt={alt} className={className} {...props} />
      </motion.div>
    </motion.div>
  );
}
