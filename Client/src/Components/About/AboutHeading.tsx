"use client";

import { useContext } from "react";

import { ThemeContext } from "@/context/ThemeContext";

export default function AboutHeading() {
  const { theme } = useContext(ThemeContext);

  return (
    <h1
      className={`max-w-3xl text-4xl font-bold tracking-tight transition-colors duration-300 md:text-6xl ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}
    >
      Curated pieces for a sharper everyday wardrobe.
    </h1>
  );
}
