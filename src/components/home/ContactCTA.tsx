import { MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/data/mock";
import { Reveal } from "@/components/site/Reveal";
import { ExternalNeonLink, NeonLink } from "@/components/site/NeonButton";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] glass-strong px-6 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: "var(--gradient-hero)" }}
          />
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold leading-tight sm:text-5xl">
            The lights are on. <span className="neon-text">Get your squad in.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground">
            Pick a slot online, or message us on WhatsApp and we'll hold the pitch for twenty
            minutes while your group decides.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <NeonLink to="/book" size="lg">
              Book a slot
            </NeonLink>
            <ExternalNeonLink href={`https://wa.me/${CONTACT.whatsapp}`} size="lg">
              <MessageCircle className="size-4" />
              WhatsApp us
            </ExternalNeonLink>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex h-13 items-center gap-2 rounded-full border border-neon/40 px-8 text-base font-semibold text-neon transition-colors hover:bg-neon/10"
            >
              <Phone className="size-4" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
