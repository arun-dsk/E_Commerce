import Link from "next/link";

import AboutHeading from "@/Components/About/AboutHeading";

const aboutHighlights = [
  {
    title: "Curated collection",
    description:
      "Every piece is selected to feel modern, practical, and easy to style day after day.",
  },
  {
    title: "Fast checkout",
    description:
      "Smooth cart flows and simple navigation keep the shopping experience quick and focused.",
  },
  {
    title: "Trusted quality",
    description:
      "We aim for durable products, clean presentation, and a premium storefront feel.",
  },
];

const aboutMetrics = [
  { value: "20+", label: "Featured products" },
  { value: "4", label: "Collection families" },
  { value: "24/7", label: "Storefront access" },
];

export default function AboutPage() {
  return (
    <main className="px-6 py-28 md:px-16">
      <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            About our store
          </span>

          <div className="space-y-5">
            <AboutHeading />

            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              We built this storefront to feel simple, fast, and visually calm.
              The goal is to make shopping feel premium without getting in the
              way of the products themselves.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/#Products"
              className="rounded-xl bg-green-400 px-6 py-3 font-semibold !text-black transition-colors  hover:bg-green-500"
            >
              Browse collection
            </Link>

            <Link
              href="/cart"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold  dark:!text-green-600 transition-colors hover:border-slate-400"
            >
              View cart
            </Link>
          </div>

          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {aboutMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-lg"
              >
                <p className="text-3xl font-bold text-emerald-600">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {aboutHighlights.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-3xl p-6 shadow-xl ${
                index === 0
                  ? "bg-slate-950 text-white"
                  : index === 1
                    ? "bg-white/85 text-slate-900"
                    : "bg-emerald-600 text-white"
              }`}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] opacity-70">
                0{index + 1}
              </p>
              <h2 className="text-2xl font-semibold">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 opacity-85">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
