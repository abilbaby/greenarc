import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  CalendarCheck,
  Clock,
  ImageIcon,
  LayoutDashboard,
  Plus,
  Search,
  Tag,
  Trash2,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ADMIN_BOOKINGS,
  ADMIN_KPIS,
  ADMIN_SLOTS,
  GALLERY,
  OCCUPANCY_SERIES,
  PRICING,
  REVENUE_SERIES,
  SPORT_SPLIT,
} from "@/data/mock";
import { cn } from "@/lib/utils";
import { NeonButton } from "@/components/site/NeonButton";

const title = "Owner Dashboard — GREENARC Admin";
const description =
  "Demo admin dashboard for GREENARC: revenue, occupancy, today's bookings, pricing, slot and gallery management.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "slots", label: "Slots", icon: Clock },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];

function AdminPage() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 grid-lines opacity-40" />
      <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-60 shrink-0 flex-col rounded-3xl glass-strong p-5 lg:flex">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-neon text-primary-foreground">
              <Zap className="size-5" strokeWidth={2.5} />
            </span>
            <span className="font-display font-bold">
              GREEN<span className="text-neon">ARC</span>
            </span>
          </Link>
          <p className="mt-1 pl-12 text-xs text-muted-foreground">Owner console</p>

          <nav className="mt-8 space-y-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-300",
                  tab === t.id
                    ? "bg-neon/12 text-neon"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                <t.icon className="size-4" />
                {t.label}
              </button>
            ))}
          </nav>

          <Link
            to="/"
            className="mt-auto flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-neon"
          >
            <ArrowLeft className="size-4" /> Back to site
          </Link>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl glass-strong px-6 py-5">
            <div>
              <h1 className="font-display text-2xl font-bold">Good evening, Ravi</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Tuesday, 28 July · 27 bookings scheduled today
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-input bg-surface px-4 sm:flex">
                <Search className="size-4 text-muted-foreground" />
                <input
                  placeholder="Search bookings"
                  className="h-10 w-44 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <NeonButton size="sm">
                <Plus className="size-4" /> New booking
              </NeonButton>
            </div>
          </header>

          {/* Mobile tabs */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  tab === t.id ? "bg-neon text-primary-foreground" : "glass text-muted-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5"
          >
            {tab === "overview" ? <Overview /> : null}
            {tab === "bookings" ? <Bookings /> : null}
            {tab === "pricing" ? <ManagePricing /> : null}
            {tab === "slots" ? <ManageSlots /> : null}
            {tab === "gallery" ? <ManageGallery /> : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title: heading,
  children,
  className,
  action,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-3xl glass p-6", className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-base font-semibold">{heading}</h2>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

const chartTooltip = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "var(--popover-foreground)",
  },
} as const;

function Overview() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ADMIN_KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className="rounded-3xl glass p-6 hover-lift"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{k.label}</p>
            <p className="mt-3 font-display text-3xl font-bold">{k.value}</p>
            <p
              className={cn(
                "mt-2 inline-flex items-center gap-1 text-xs font-medium",
                k.trend === "up" ? "text-neon" : "text-muted-foreground",
              )}
            >
              {k.trend === "up" ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              {k.delta} vs last week
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Revenue this week">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_SERIES}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--neon)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={48} />
                <Tooltip {...chartTooltip} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--neon)"
                  strokeWidth={2.5}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Sport split">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SPORT_SPLIT}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  stroke="none"
                >
                  {SPORT_SPLIT.map((_, i) => (
                    <Cell key={i} fill={`var(--chart-${i + 1})`} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex justify-center gap-4 text-xs text-muted-foreground">
            {SPORT_SPLIT.map((s, i) => (
              <span key={s.name} className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{ background: `var(--chart-${i + 1})` }}
                />
                {s.name} {s.value}%
              </span>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.3fr]">
        <Panel title="Occupancy by hour">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OCCUPANCY_SERIES}>
                <XAxis dataKey="hour" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={32} />
                <Tooltip {...chartTooltip} cursor={{ fill: "var(--surface)" }} />
                <Bar dataKey="pct" fill="var(--neon)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Today's bookings"
          action={<span className="text-xs text-muted-foreground">Next 6 slots</span>}
        >
          <ul className="space-y-2.5">
            {ADMIN_BOOKINGS.slice(0, 6).map((b) => (
              <li
                key={b.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-3"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neon/12 text-xs font-semibold text-neon">
                  {b.slot.split(":")[0]}
                  {b.slot.slice(-2).toLowerCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{b.customer}</p>
                  <p className="text-xs text-muted-foreground">
                    {b.sport} · {b.duration} · {b.id}
                  </p>
                </div>
                <span className="text-sm font-semibold">₹{b.amount.toLocaleString("en-IN")}</span>
                <StatusPill status={b.status} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "hidden shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-block",
        status === "Confirmed" && "bg-neon/12 text-neon",
        status === "Pending" && "bg-chart-4/15 text-chart-4",
        status === "Cancelled" && "bg-destructive/15 text-destructive",
      )}
    >
      {status}
    </span>
  );
}

function Bookings() {
  const [query, setQuery] = useState("");
  const rows = ADMIN_BOOKINGS.filter((b) =>
    (b.customer + b.id + b.sport).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Panel
      title="All bookings"
      action={
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter…"
          className="h-9 w-40 rounded-full border border-input bg-surface px-4 text-sm outline-none focus:border-neon/60"
        />
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {["Ref", "Customer", "Phone", "Slot", "Duration", "Sport", "Amount", "Status"].map(
                (h) => (
                  <th key={h} className="pb-3 font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr
                key={b.id}
                className="border-t border-border transition-colors hover:bg-surface"
              >
                <td className="py-3.5 font-mono text-xs text-neon">{b.id}</td>
                <td className="py-3.5 font-medium">{b.customer}</td>
                <td className="py-3.5 text-muted-foreground">{b.phone}</td>
                <td className="py-3.5">{b.slot}</td>
                <td className="py-3.5 text-muted-foreground">{b.duration}</td>
                <td className="py-3.5 text-muted-foreground">{b.sport}</td>
                <td className="py-3.5 font-semibold">₹{b.amount.toLocaleString("en-IN")}</td>
                <td className="py-3.5">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-medium",
                      b.status === "Confirmed" && "bg-neon/12 text-neon",
                      b.status === "Pending" && "bg-chart-4/15 text-chart-4",
                      b.status === "Cancelled" && "bg-destructive/15 text-destructive",
                    )}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No bookings match that.</p>
        ) : null}
      </div>
    </Panel>
  );
}

function ManagePricing() {
  const [prices, setPrices] = useState(() =>
    Object.fromEntries(PRICING.map((p) => [p.id, p.price])) as Record<string, number>,
  );
  const [saved, setSaved] = useState(false);

  return (
    <Panel
      title="Manage pricing"
      action={
        <NeonButton
          size="sm"
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 1800);
          }}
        >
          {saved ? "Saved" : "Save changes"}
        </NeonButton>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {PRICING.map((tier) => (
          <div key={tier.id} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="font-semibold">{tier.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{tier.window}</p>
            <div className="mt-5 flex items-center gap-2">
              <span className="text-lg text-muted-foreground">₹</span>
              <input
                type="number"
                value={prices[tier.id]}
                onChange={(e) =>
                  setPrices((p) => ({ ...p, [tier.id]: Number(e.target.value) }))
                }
                className="h-11 w-full rounded-xl border border-input bg-background px-3 font-display text-xl font-bold text-neon outline-none focus:border-neon/60"
              />
              <span className="whitespace-nowrap text-xs text-muted-foreground">/hr</span>
            </div>
            <input
              type="range"
              min={500}
              max={3000}
              step={50}
              value={prices[tier.id]}
              onChange={(e) => setPrices((p) => ({ ...p, [tier.id]: Number(e.target.value) }))}
              className="mt-4 w-full accent-[var(--neon)]"
            />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ManageSlots() {
  const [slots, setSlots] = useState(ADMIN_SLOTS);

  return (
    <Panel
      title="Manage slots"
      action={
        <NeonButton size="sm" variant="glass">
          <Plus className="size-4" /> Add slot
        </NeonButton>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {slots.map((s, i) => (
          <div
            key={s.time + s.arena}
            className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-4"
          >
            <div>
              <p className="font-semibold">{s.time}</p>
              <p className="text-xs text-muted-foreground">{s.arena}</p>
            </div>
            <button
              role="switch"
              aria-checked={s.open}
              aria-label={`Toggle ${s.time} ${s.arena}`}
              onClick={() =>
                setSlots((prev) =>
                  prev.map((p, idx) => (idx === i ? { ...p, open: !p.open } : p)),
                )
              }
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors duration-300",
                s.open ? "bg-neon" : "bg-secondary",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full bg-background transition-transform duration-300",
                  s.open ? "translate-x-5.5" : "translate-x-0.5",
                )}
              />
            </button>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        Toggling a slot closes it for online booking immediately. Demo only — nothing is persisted.
      </p>
    </Panel>
  );
}

function ManageGallery() {
  const [items, setItems] = useState(GALLERY);

  return (
    <Panel
      title="Gallery management"
      action={
        <NeonButton size="sm" variant="glass">
          <Plus className="size-4" /> Upload
        </NeonButton>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((g) => (
          <div key={g.id} className="group relative overflow-hidden rounded-2xl border border-border">
            <img
              src={g.src}
              alt={g.title}
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-4/3 w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-3">
              <p className="text-xs font-medium">{g.title}</p>
              <p className="text-[11px] text-muted-foreground">{g.category}</p>
            </div>
            <button
              aria-label={`Remove ${g.title}`}
              onClick={() => setItems((prev) => prev.filter((p) => p.id !== g.id))}
              className="absolute right-2 top-2 grid size-8 place-items-center rounded-full glass-strong text-destructive opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No images left. Refresh to restore the demo set.
        </p>
      ) : null}
    </Panel>
  );
}
