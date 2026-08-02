import { Check, Sparkles } from "lucide-react";
import { PRICING } from "@/data/mock";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { NeonLink } from "@/components/site/NeonButton";

export function PricingSection({ heading = true }: { heading?: boolean }) {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-24">
      {heading ? (
        <SectionHeading
          eyebrow="Pricing"
          title="Straight pricing, no surprises"
          subtitle="Per-hour rates for the full arena. Split it across your squad and it's cheaper than a coffee run."
        />
      ) : null}

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {PRICING.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 0.08}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-3xl p-7 hover-lift",
                tier.highlight ? "glass-strong neon-glow" : "glass",
              )}
            >
              {tier.badge ? (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-neon px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Sparkles className="size-3.5" />
                  {tier.badge}
                </span>
              ) : null}

              <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{tier.window}</p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="font-display text-5xl font-bold text-neon">₹{tier.price}</span>
                <span className="pb-2 text-sm text-muted-foreground">/{tier.unit}</span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-neon" />
                    {f}
                  </li>
                ))}
              </ul>

              <NeonLink
                to="/book"
                variant={tier.highlight ? "neon" : "glass"}
                className="mt-8 w-full"
              >
                Book {tier.name.toLowerCase()} slot
              </NeonLink>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
