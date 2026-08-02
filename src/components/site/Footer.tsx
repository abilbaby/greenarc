import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, Zap } from "lucide-react";
import { CONTACT } from "@/data/mock";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-neon text-primary-foreground">
              <Zap className="size-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold">
              GREEN<span className="text-neon">ARC</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Ernakulam's floodlit football and cricket arena. Open twenty hours a day, built for
            people who take their weekend game seriously.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/book", label: "Book a slot" },
              { to: "/pricing", label: "Pricing" },
              { to: "/gallery", label: "Gallery" },
              { to: "/contact", label: "Contact" },
              { to: "/admin", label: "Owner dashboard" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-neon">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
            Visit
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-neon" />
              {CONTACT.address}
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-neon" />
              <a href={`tel:${CONTACT.phone}`} className="hover:text-neon">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-neon" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-neon">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
            Hours
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">{CONTACT.hours}</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-colors hover:text-neon"
          >
            <Instagram className="size-4" /> @greenarc
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()}  Sports Arena. All rights reserved.</p>
          <p>Demo experience — bookings and payments are simulated.</p>
        </div>
      </div>
    </footer>
  );
}
