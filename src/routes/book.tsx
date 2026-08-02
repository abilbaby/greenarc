import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, Clock, Loader2, PartyPopper, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { DURATIONS, SPORTS, getSlotsForDate } from "@/data/mock";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { NeonButton } from "@/components/site/NeonButton";
import { cn } from "@/lib/utils";

const title = "Book a Turf Slot — GREENARC Ernakulam";
const description =
  "Check live slot availability, pick your duration and confirm a football or cricket turf booking at GREENARC in under a minute.";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: BookPage,
});

function buildDays() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function BookPage() {
  const [days] = useState(buildDays);
  const [dayIndex, setDayIndex] = useState(0);
  const [slotTime, setSlotTime] = useState<string | null>(null);
  const [duration, setDuration] = useState(2);
  const [sport, setSport] = useState(SPORTS[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [reference, setReference] = useState("");

  const date = days[dayIndex];
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const slots = useMemo(() => getSlotsForDate(date, isWeekend), [date, isWeekend]);
  const selected = slots.find((s) => s.time === slotTime) ?? null;

  const subtotal = selected ? Math.round(selected.price * duration) : 0;
  const convenience = subtotal ? 49 : 0;
  const total = subtotal + convenience;
  const canConfirm = Boolean(selected && name.trim() && phone.trim().length >= 10);

  const confirm = () => {
    if (!canConfirm) return;
    setStatus("loading");
    setTimeout(() => {
      setReference(`TF-${Math.floor(4000 + Math.random() * 5000)}`);
      setStatus("done");
    }, 1400);
  };

  const reset = () => {
    setStatus("idle");
    setSlotTime(null);
    setName("");
    setPhone("");
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Book now"
          title="Reserve your slot"
          subtitle="Live availability for the next two weeks. No payment needed to hold a slot in this demo."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0 space-y-6">
            {/* Date picker */}
            <section className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CalendarDays className="size-4 text-neon" />
                Choose a date
              </div>
              <div className="mt-5 flex gap-2.5 overflow-x-auto pb-2">
                {days.map((d, i) => {
                  const active = i === dayIndex;
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => {
                        setDayIndex(i);
                        setSlotTime(null);
                      }}
                      className={cn(
                        "min-w-[74px] shrink-0 rounded-2xl border px-3 py-3 text-center transition-all duration-300",
                        active
                          ? "border-transparent bg-neon text-primary-foreground"
                          : "border-border bg-surface text-muted-foreground hover:border-neon/40 hover:text-foreground",
                      )}
                    >
                      <div className="text-[11px] uppercase tracking-wider">
                        {i === 0 ? "Today" : DAY_NAMES[d.getDay()]}
                      </div>
                      <div className="font-display text-xl font-bold">{d.getDate()}</div>
                      <div className="text-[11px]">{MONTHS[d.getMonth()]}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Slots */}
            <section className="glass rounded-3xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="size-4 text-neon" />
                  Available slots
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-neon" /> Available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-chart-4" /> Filling fast
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-muted-foreground" /> Booked
                  </span>
                </div>
              </div>

              {(["Morning", "Evening", "Night"] as const).map((period) => (
                <div key={period} className="mt-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {period}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                    {slots
                      .filter((s) => s.period === period)
                      .map((s) => {
                        const booked = s.status === "booked";
                        const active = slotTime === s.time;
                        return (
                          <button
                            key={s.time}
                            disabled={booked}
                            onClick={() => setSlotTime(s.time)}
                            className={cn(
                              "rounded-xl border px-3 py-3 text-left transition-all duration-300",
                              booked && "cursor-not-allowed border-border bg-surface opacity-40",
                              !booked && active && "border-transparent bg-neon text-primary-foreground",
                              !booked &&
                                !active &&
                                "border-border bg-surface hover:border-neon/50 hover:-translate-y-0.5",
                            )}
                          >
                            <div className="text-sm font-semibold">{s.time}</div>
                            <div
                              className={cn(
                                "mt-0.5 text-xs",
                                active ? "text-primary-foreground/80" : "text-muted-foreground",
                              )}
                            >
                              {booked
                                ? "Booked"
                                : s.status === "filling"
                                  ? "Filling fast"
                                  : `₹${s.price}/hr`}
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </section>

            {/* Duration + sport */}
            <section className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Users className="size-4 text-neon" />
                Duration & format
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {DURATIONS.map((d) => (
                  <button
                    key={d.hours}
                    onClick={() => setDuration(d.hours)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left transition-all duration-300",
                      duration === d.hours
                        ? "border-transparent bg-neon text-primary-foreground"
                        : "border-border bg-surface hover:border-neon/50",
                    )}
                  >
                    <div className="text-sm font-semibold">{d.label}</div>
                    <div
                      className={cn(
                        "mt-0.5 text-xs",
                        duration === d.hours
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                      {d.note}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {SPORTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSport(s.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                      sport === s.id
                        ? "border-neon bg-neon/12 text-neon"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-12 rounded-xl border border-input bg-surface px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-neon/60"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  inputMode="tel"
                  className="h-12 rounded-xl border border-input bg-surface px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-neon/60"
                />
              </div>
            </section>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass-strong rounded-3xl p-6">
              <h3 className="font-display text-lg font-semibold">Booking summary</h3>

              <dl className="mt-6 space-y-3.5 text-sm">
                <Row label="Date">
                  {DAY_NAMES[date.getDay()]}, {date.getDate()} {MONTHS[date.getMonth()]}
                </Row>
                <Row label="Slot">{selected ? selected.time : "—"}</Row>
                <Row label="Duration">{duration} hour{duration === 1 ? "" : "s"}</Row>
                <Row label="Format">{SPORTS.find((s) => s.id === sport)?.label}</Row>
                <Row label="Arena">Arena A · 7-a-side</Row>
              </dl>

              <div className="my-6 h-px bg-border" />

              <dl className="space-y-3 text-sm">
                <Row label={`Slot rate × ${duration}h`}>
                  {subtotal ? `₹${subtotal.toLocaleString("en-IN")}` : "—"}
                </Row>
                <Row label="Convenience fee">₹{convenience}</Row>
              </dl>

              <div className="mt-5 flex items-end justify-between">
                <span className="text-sm text-muted-foreground">Total payable</span>
                <span className="font-display text-3xl font-bold text-neon">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <NeonButton
                size="lg"
                className="mt-6 w-full"
                disabled={!canConfirm || status === "loading"}
                onClick={confirm}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Holding your slot…
                  </>
                ) : (
                  "Confirm booking"
                )}
              </NeonButton>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                {canConfirm
                  ? "Free cancellation up to 6 hours before kick-off."
                  : "Pick a slot and add your name & phone to continue."}
              </p>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {status === "done" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] grid place-items-center bg-background/85 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md rounded-3xl glass-strong p-8 text-center neon-glow"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 14 }}
                className="mx-auto grid size-16 place-items-center rounded-full bg-neon text-primary-foreground"
              >
                <Check className="size-8" strokeWidth={3} />
              </motion.span>

              <h3 className="mt-6 font-display text-2xl font-bold">Slot confirmed</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                See you on {DAY_NAMES[date.getDay()]}, {date.getDate()} {MONTHS[date.getMonth()]} at{" "}
                {selected?.time}. A confirmation has been sent to {phone}.
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-surface p-4 text-left text-sm">
                <Row label="Reference">
                  <span className="font-mono text-neon">{reference}</span>
                </Row>
                <div className="mt-3">
                  <Row label="Player">{name}</Row>
                </div>
                <div className="mt-3">
                  <Row label="Amount">₹{total.toLocaleString("en-IN")}</Row>
                </div>
              </div>

              <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <PartyPopper className="size-3.5 text-neon" />
                Demo booking — nothing was charged.
              </p>

              <NeonButton className="mt-6 w-full" onClick={reset}>
                Done
              </NeonButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SiteLayout>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}
