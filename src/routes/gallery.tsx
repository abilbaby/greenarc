import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GALLERY } from "@/data/mock";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Lightbox } from "@/components/site/Lightbox";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";

const title = "Gallery — Inside the GREENARC Arena";
const description =
  "Photos of the GREENARC pitches, cricket nets, and tournament nights in Malavana, Ernakulam.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: GalleryPage,
});

const FILTERS = ["All", "Turf", "Events", "Facilities"] as const;

function GalleryPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);

  const items = GALLERY.filter((g) => filter === "All" || g.category === filter);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Gallery"
          title="Inside the arena"
          subtitle="Match nights, tournament finals and the everyday details that make the place work."
        />

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                filter === f
                  ? "bg-neon text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id + filter} delay={(i % 6) * 0.05}>
              <button
                onClick={() => setIndex(GALLERY.findIndex((g) => g.id === item.id))}
                className="group relative block aspect-4/3 w-full overflow-hidden rounded-2xl border border-border text-left hover-lift"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-neon">{item.category}</p>
                  <h3 className="mt-1 font-semibold">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item.caption}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox items={GALLERY} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </SiteLayout>
  );
}
