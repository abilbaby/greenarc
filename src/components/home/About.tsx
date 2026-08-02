import { CheckCircle2 } from "lucide-react";
import galleryAerial from "@/assets/gallery-aerial.jpg";
import { Reveal } from "@/components/site/Reveal";
import { NeonLink } from "@/components/site/NeonButton";

const POINTS = [
  "Built in 2026 by a group of Sunday-league regulars who were tired of bad turf",
  "Resurfaced every 30 months, groomed and infill-levelled twice a week",
  "Managed by a full-time ground crew — never an unattended booking",
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border">
            <img
              src={galleryAerial}
              alt="Aerial view of the GREENARC arena complex at night"
              loading="lazy"
              width={1200}
              height={900}
              className="size-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 rounded-2xl glass-strong px-5 py-3">
              <div className="font-display text-2xl font-bold text-neon">1.4 acres</div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Malavana, Ernakulam
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-neon">
            <span className="size-1.5 rounded-full bg-neon live-dot" />
            About GREENARC
          </span>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            A neighbourhood arena built to professional standards
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            GREENARC started with one pitch and a simple promise: the surface will always be
            playable, the lights will always be on, and the booking will never be a phone-call
            negotiation. Seven years later we host over 500 games a month — from 6 AM office
            regulars to midnight five-a-side rivalries.
          </p>

          <ul className="mt-7 space-y-3.5">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-neon" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <NeonLink to="/book">Check availability</NeonLink>
            <NeonLink to="/contact" variant="glass">
              Visit us
            </NeonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
