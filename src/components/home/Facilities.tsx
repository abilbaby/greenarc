import {
  Car,
  Coffee,
  Droplets,
  Shield,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FACILITIES } from "@/data/mock";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const ICONS: Record<string, LucideIcon> = { Zap, Shield, Droplets, Coffee, Car, Video };

export function Facilities() {
  return (
    <section id="facilities" className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeading
        eyebrow="Facilities"
        title="Everything a serious game needs"
        subtitle="We obsess over the details most turfs skip — surface quality, lighting, and what happens after the final whistle."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FACILITIES.map((f, i) => {
          const Icon = ICONS[f.icon] ?? Zap;
          return (
            <Reveal key={f.title} delay={i * 0.06}>
              <GlassCard className="h-full p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-neon/12 text-neon">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
