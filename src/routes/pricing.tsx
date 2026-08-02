import { createFileRoute } from "@tanstack/react-router";
import { ADDONS, FAQS } from "@/data/mock";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PricingSection } from "@/components/home/PricingSection";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { GlassCard } from "@/components/site/GlassCard";
import { ContactCTA } from "@/components/home/ContactCTA";

const title = "Pricing — Morning, Evening & Weekend Turf Rates";
const description =
  "GREENARC turf pricing: ₹900/hr mornings, ₹1500/hr evenings and ₹1800/hr weekends, plus cricket nets and tournament packages.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 pt-16">
        <SectionHeading
          eyebrow="Rates"
          title="Pick the window that fits your squad"
          subtitle="All rates are for the full 7-a-side arena including equipment, lights and locker access. GST included."
        />
      </div>

      <PricingSection heading={false} />

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <SectionHeading eyebrow="Add-ons" title="Extras you can stack on" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADDONS.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.06}>
              <GlassCard className="flex h-full flex-col justify-between p-6">
                <h3 className="font-semibold">{a.name}</h3>
                <p className="mt-4">
                  <span className="font-display text-2xl font-bold text-neon">₹{a.price}</span>
                  <span className="ml-1.5 text-xs text-muted-foreground">{a.unit}</span>
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-24">
        <SectionHeading eyebrow="FAQ" title="Before you book" />
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="group glass rounded-2xl p-5 transition-colors open:border-neon/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span className="text-neon transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
    </SiteLayout>
  );
}
