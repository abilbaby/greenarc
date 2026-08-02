import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { CONTACT } from "@/data/mock";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { NeonButton } from "@/components/site/NeonButton";

const title = "Contact GREENARC — Malavana, Ernakulam";
const description =
  "Call, WhatsApp or visit GREENARC Sports Arena in Malavana, Ernakulam. Open 5 AM to 1 AM, seven days a week.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Contact"
          title="Come see the pitch"
          subtitle="Drop in any evening for a tour, or send us a note and we'll reply within the hour."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <form onSubmit={submit} className="glass rounded-3xl p-7">
              <h3 className="font-display text-lg font-semibold">Send us a message</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" placeholder="Arjun Menon" />
                <Field label="Phone" placeholder="+91 00000 00000" />
              </div>
              <div className="mt-4">
                <Field label="Email" placeholder="you@example.com" type="email" />
              </div>
              <div className="mt-4">
                <label className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Enquiry type
                </label>
                <select
                  defaultValue="booking"
                  className="mt-2 h-12 w-full rounded-xl border border-input bg-surface px-4 text-sm outline-none transition-colors focus:border-neon/60"
                >
                  <option value="booking">Slot booking</option>
                  <option value="tournament">Tournament / corporate event</option>
                  <option value="membership">Season membership</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your team, preferred days and timings."
                  className="mt-2 w-full resize-none rounded-xl border border-input bg-surface p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-neon/60"
                />
              </div>

              <NeonButton size="lg" className="mt-6 w-full" disabled={status !== "idle"}>
                <AnimatePresence mode="wait" initial={false}>
                  {status === "idle" ? (
                    <motion.span key="i" className="flex items-center gap-2">
                      <Send className="size-4" /> Send message
                    </motion.span>
                  ) : status === "loading" ? (
                    <motion.span key="l" className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" /> Sending…
                    </motion.span>
                  ) : (
                    <motion.span key="s" className="flex items-center gap-2">
                      <Check className="size-4" /> Message sent
                    </motion.span>
                  )}
                </AnimatePresence>
              </NeonButton>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Demo form — nothing is submitted anywhere.
              </p>
            </form>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.08}>
              <div className="glass rounded-3xl p-7">
                <h3 className="font-display text-lg font-semibold">Reach us directly</h3>
                <ul className="mt-6 space-y-5 text-sm">
                  <InfoRow icon={<MapPin className="size-4" />} label="Address">
                    {CONTACT.address}
                  </InfoRow>
                  <InfoRow icon={<Phone className="size-4" />} label="Phone">
                    <a href={`tel:${CONTACT.phone}`} className="hover:text-neon">
                      {CONTACT.phone}
                    </a>
                  </InfoRow>
                  <InfoRow icon={<Mail className="size-4" />} label="Email">
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-neon">
                      {CONTACT.email}
                    </a>
                  </InfoRow>
                  <InfoRow icon={<Clock className="size-4" />} label="Hours">
                    {CONTACT.hours}
                  </InfoRow>
                </ul>

                <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neon text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                  >
                    <Phone className="size-4" /> Call now
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full glass text-sm font-semibold transition-colors hover:text-neon"
                  >
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="overflow-hidden rounded-3xl border border-border">
                <iframe
                  title="GREENARC location map"
                  src={CONTACT.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full grayscale-[0.4]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-input bg-surface px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-neon/60"
      />
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neon/12 text-neon">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <p className="mt-1 leading-relaxed">{children}</p>
      </div>
    </li>
  );
}
