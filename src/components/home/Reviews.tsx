import { Quote, Star } from "lucide-react";
import { REVIEWS } from "@/data/mock";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeading
        eyebrow="Reviews"
        title="What players say after full-time"
        subtitle="1,280 verified ratings, averaging 4.9. Here's a slice of it."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.06}>
            <GlassCard className="h-full p-7">
              <Quote className="size-7 text-neon/50" />
              <p className="mt-4 text-pretty leading-relaxed text-foreground/90">"{r.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-neon/12 font-display font-semibold text-neon">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-neon text-neon" />
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
