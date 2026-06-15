"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    src: "/Herowallpaper1.jpg",
    heading: "Level up your Style",
  },
  {
    src: "/Herowallpaper2.jpg",
    heading: "Upgrade Your Vibe",
  },
  {
    src: "/Herowallpaper3.jpg",
    heading: "Elevate Everyday Elegance",
  },
  {
    src: "/Herowallpaper4.jpg",
    heading: "Discover Refined Style",
  },
] as const;

const brands = [
  "/Amiparis.png",
  "/gucci.png",
  "/dior.png",
  "/lv.png",
] as const;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden text-white">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,24,0.2),rgba(20,20,24,0.5))]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-6 py-20 md:px-20">
        <div className="mt-16 flex flex-col gap-5">
          <h3 className="text-lg font-medium tracking-wide md:text-2xl">
            Summer Collection
          </h3>

          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="max-w-4xl text-4xl font-bold leading-tight md:text-7xl"
            >
              {slides[currentSlide].heading}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-8">
            {brands.map((item, index) => (
              <motion.div
                key={item}
                animate={{
                  scale: currentSlide === index ? 1.08 : 1,
                  y: currentSlide === index ? -8 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={item}
                  alt="brand"
                  width={100}
                  height={60}
                  className="object-contain"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>

          <p className="max-w-2xl text-lg text-gray-200 md:text-xl">
            We ensure our customers have the best shopping experience
          </p>

          <div className="flex gap-4">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                className={`h-4 w-4 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "scale-125 bg-white"
                    : "bg-gray-400/90"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
