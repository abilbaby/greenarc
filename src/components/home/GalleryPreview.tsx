import { ArrowUpRight } from "lucide-react";
import { GALLERY } from "@/data/mock";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { NeonLink } from "@/components/site/NeonButton";
import { cn } from "@/lib/utils";

export function GalleryPreview() {
  const items = GALLERY.slice(0, 5);
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeading
        eyebrow="Gallery"
        title="Nights that look like this"
        subtitle="Match days, tournaments and the quiet 6 AM sessions — shot on the arena, not stock."
      />

      <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={item.id}
            delay={i * 0.06}
            className={cn(
              i === 0 && "col-span-2 row-span-2",
              i === 3 && "lg:col-span-2",
            )}
          >
            <figure className="group relative size-full overflow-hidden rounded-2xl border border-border">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                width={1200}
                height={900}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-neon">{item.category}</p>
                <p className="mt-1 text-sm font-medium">{item.title}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <NeonLink to="/gallery" variant="glass" size="lg">
          View full gallery
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </NeonLink>
      </div>
    </section>
  );
}
