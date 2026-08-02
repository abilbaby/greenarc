import heroTurf from "@/assets/hero-turf.jpg";
import galleryCricket from "@/assets/gallery-cricket.jpg";
import galleryMatch from "@/assets/gallery-match.jpg";
import galleryLounge from "@/assets/gallery-lounge.jpg";
import galleryEvent from "@/assets/gallery-event.jpg";
import galleryAerial from "@/assets/gallery-aerial.jpg";
import galleryCloseup from "@/assets/gallery-closeup.jpg";

export const CONTACT = {
  name: " GREENARC Sports Arena",
  address: "Near Malavana Church,Elenthikara, Puthenvelikkara, Ernakulam, Kerala 683594",
  phone: "+91 00000 00000",
  whatsapp: "910000000000",
  email: "play@turfflow.in",
  hours: "5:00 AM – 1:00 AM, all seven days",
  mapEmbed:
    "https://www.google.com/maps?q=Malavana,Ernakulam,Kerala&output=embed",
};

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: "Turf" | "Events" | "Facilities";
};

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    src: heroTurf,
    title: "Arena A — Floodlit 7-a-side",
    caption: "FIFA-grade 60mm monofilament turf under 1200 lux LED floodlights.",
    category: "Turf",
  },
  {
    id: "g2",
    src: galleryCricket,
    title: "Cricket Nets",
    caption: "Four bowling lanes with matting wickets and bowling machine access.",
    category: "Turf",
  },
  {
    id: "g3",
    src: galleryMatch,
    title: "Thursday Night League",
    caption: "Our open league runs 32 teams across three divisions every season.",
    category: "Events",
  },
  {
    id: "g4",
    src: galleryEvent,
    title: "Corporate Cup Finals",
    caption: "18 company teams, one trophy, and a very loud sideline.",
    category: "Events",
  },

  {
    id: "g6",
    src: galleryAerial,
    title: "Arena Overview",
    caption: "Two full-size arenas plus a practice pitch on a 1.4 acre campus.",
    category: "Facilities",
  },
  {
    id: "g7",
    src: galleryCloseup,
    title: "Surface Detail",
    caption: "Shock-pad underlay with silica infill — knee-friendly, every session.",
    category: "Turf",
  },
  {
    id: "g8",
    src: galleryAerial,
    title: "Night Sessions",
    caption: "Late slots until 1 AM for the after-work crowd.",
    category: "Turf",
  },
];

export const heroImage = heroTurf;

export type PricingTier = {
  id: string;
  name: string;
  window: string;
  price: number;
  unit: string;
  badge?: string;
  features: string[];
  highlight?: boolean;
};

export const PRICING: PricingTier[] = [
  {
    id: "morning",
    name: "Morning",
    window: "5:00 AM – 12:00 PM",
    price: 800,
    unit: "per hour",
    features: [
      "Full 7-a-side arena",
      "Bibs, balls and cones included",
      "Free filtered water refills",
      "Free parking for 12 vehicles",
    ],
  },
  {
    id: "evening",
    name: "Evening",
    window: "12:00 PM – 1:00 AM",
    price: 1000,
    unit: "per hour",
    badge: "Most booked",
    highlight: true,
    features: [
      "Full 7-a-side arena under floodlights",
      "Referee on request (₹300)",
      "Match scoreboard + timer",
      "Locker room access",
    ],
  },
  {
    id: "weekend",
    name: "Weekend",
    window: "Sat & Sun, all day",
    price: 1200,
    unit: "per hour",
    features: [
      "Priority arena allocation",
      "Complimentary energy drinks (10 pax)",
      "Photo/reel coverage add-on",
      "Tournament-ready line marking",
    ],
  },
];

export const ADDONS = [
  { name: "Cricket net lane", price: 600, unit: "per hour" },
  { name: "Referee / umpire", price: 300, unit: "per match" },
  { name: "Match photography", price: 1200, unit: "per session" },
  { name: "Tournament package (8 teams)", price: 24000, unit: "per day" },
];

export const FACILITIES = [
  {
    icon: "Zap",
    title: "1200 Lux Floodlights",
    body: "Glare-free LED towers calibrated for broadcast-quality night play and clean phone footage.",
  },
  {
    icon: "Shield",
    title: "FIFA-Grade Surface",
    body: "60mm monofilament turf over a shock-pad base — fast rolls, soft landings, fewer injuries.",
  },
  {
    icon: "Droplets",
    title: "Locker Rooms & Showers",
    body: "Two changing rooms with hot showers, lockers, and a kit-drying rack for regulars.",
  },
  {
    icon: "Coffee",
    title: "Players' Café",
    body: "Cold brew, electrolyte mixes and post-match grills, served till the last whistle.",
  },
  {
    icon: "Car",
    title: "Secure Parking",
    body: "48 covered slots with CCTV and an attendant on duty through every night slot.",
  },
  {
    icon: "Video",
    title: "Highlight Cameras",
    body: "Four-angle capture with auto-clipped goal highlights delivered to your team chat.",
  },
];

export const STATS = [
  { value: "NO.1 ", label: "Artificial turf" },
  { value: "2", label: "Full-size arenas" },
  { value: "4.9", label: "Average rating" },
  { value: "20h", label: "Open daily" },
];

export const REVIEWS = [
  {
    name: "Arjun Menon",
    role: "Captain, Malavana Strikers",
    quote:
      "We've played on eight turfs in the city. GREENARC is the only one where the surface still feels new after two seasons. Booking takes fifteen seconds.",
    rating: 5,
  },
  {
    name: "Sneha Raghavan",
    role: "HR Lead, Northwind Tech",
    quote:
      "They ran our 18-team corporate cup end to end — scheduling, referees, even the highlight reel. Our team still talks about it.",
    rating: 5,
  },
  {
    name: "Imran Qureshi",
    role: "Coach, Youth Cricket Academy",
    quote:
      "The nets are properly maintained and the bounce is consistent. My U-16 batch trains here four mornings a week.",
    rating: 5,
  },
  {
    name: "Divya Prakash",
    role: "Weekend regular",
    quote:
      "Hot showers, clean lockers, and a café that's actually open at 11 PM. Small things, but nobody else does them.",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "How far in advance can I book?",
    a: "Slots open 30 days ahead. Regular teams can lock a recurring weekly slot for a full season.",
  },
  {
    q: "What's the cancellation policy?",
    a: "Free cancellation up to 6 hours before your slot. Inside 6 hours we issue arena credit valid for 60 days.",
  },
  {
    q: "Do you provide equipment?",
    a: "Balls, bibs and cones come with every booking. Cricket kits and a bowling machine are available on the nets add-on.",
  },
  {
    q: "Is the turf playable in the rain?",
    a: "Yes. The surface drains at 180mm/hour, so play continues through most showers. Lightning stops are refunded in full.",
  },
];

/* ---------- Booking mock data ---------- */

export type Slot = {
  time: string;
  period: "Morning" | "Evening" | "Night";
  price: number;
  status: "available" | "booked" | "filling";
};

const BASE_SLOTS: Omit<Slot, "status">[] = [
  { time: "06:00 AM", period: "Morning", price: 800 },
  { time: "07:00 AM", period: "Morning", price: 800 },
  { time: "08:00 AM", period: "Morning", price: 800 },
  { time: "09:00 AM", period: "Morning", price: 800 },
  { time: "10:00 AM", period: "Morning", price: 800 },
  { time: "11:00 AM", period: "Morning", price: 800 },
  { time: "04:00 PM", period: "Evening", price: 1000 },
  { time: "05:00 PM", period: "Evening", price: 1000 },
  { time: "06:00 PM", period: "Evening", price: 1000 },
  { time: "07:00 PM", period: "Evening", price: 1000 },
  { time: "08:00 PM", period: "Evening", price: 1000 },
  { time: "09:00 PM", period: "Night", price: 1200 },
  { time: "10:00 PM", period: "Night", price: 1200 },
  { time: "11:00 PM", period: "Night", price: 1200 },
];

/** Deterministic pseudo-availability so SSR and client agree. */
export function getSlotsForDate(date: Date, isWeekend = false): Slot[] {
  const seed = date.getDate() * 7 + date.getMonth() * 31;
  return BASE_SLOTS.map((slot, i) => {
    const n = (seed + i * 13) % 10;
    const status: Slot["status"] = n < 3 ? "booked" : n < 5 ? "filling" : "available";
    return { ...slot, status, price: isWeekend ? Math.round(slot.price * 1.2) : slot.price };
  });
}

export const DURATIONS = [
  { hours: 1, label: "1 hour", note: "Quick run" },
  { hours: 1.5, label: "1.5 hours", note: "Standard match" },
  { hours: 2, label: "2 hours", note: "League format", popular: true },
  { hours: 3, label: "3 hours", note: "Tournament block" },
];

export const SPORTS = [
  { id: "football", label: "Football (7-a-side)" },
  { id: "cricket", label: "Cricket (nets)" },
  { id: "mixed", label: "Mixed / Practice" },
];

/* ---------- Admin mock data ---------- */

export const ADMIN_BOOKINGS = [
  { id: "TF-4821", customer: "Arjun Menon", phone: "+91 00000 00001", slot: "07:00 PM", duration: "2h", sport: "Football", amount: 3000, status: "Confirmed" },
  { id: "TF-4822", customer: "Northwind Tech", phone: "+91 00000 00002", slot: "08:00 PM", duration: "3h", sport: "Football", amount: 4500, status: "Confirmed" },
  { id: "TF-4823", customer: "Imran Qureshi", phone: "+91 00000 00003", slot: "06:00 AM", duration: "1.5h", sport: "Cricket", amount: 1350, status: "Confirmed" },
  { id: "TF-4824", customer: "Divya Prakash", phone: "+91 00000 00004", slot: "09:00 PM", duration: "1h", sport: "Football", amount: 1500, status: "Pending" },
  { id: "TF-4825", customer: "Koramangala FC", phone: "+91 00000 00005", slot: "10:00 PM", duration: "2h", sport: "Football", amount: 2400, status: "Confirmed" },
  { id: "TF-4826", customer: "Rahul Sethi", phone: "+91 00000 00006", slot: "05:00 PM", duration: "1h", sport: "Mixed", amount: 1500, status: "Cancelled" },
  { id: "TF-4827", customer: "Youth Cricket Academy", phone: "+91 00000 00007", slot: "08:00 AM", duration: "3h", sport: "Cricket", amount: 2700, status: "Confirmed" },
  { id: "TF-4828", customer: "Sneha Raghavan", phone: "+91 00000 00008", slot: "11:00 PM", duration: "1h", sport: "Football", amount: 1200, status: "Pending" },
];

export const REVENUE_SERIES = [
  { day: "Mon", revenue: 18400, bookings: 12 },
  { day: "Tue", revenue: 21200, bookings: 14 },
  { day: "Wed", revenue: 19800, bookings: 13 },
  { day: "Thu", revenue: 26500, bookings: 18 },
  { day: "Fri", revenue: 31200, bookings: 21 },
  { day: "Sat", revenue: 42800, bookings: 27 },
  { day: "Sun", revenue: 39600, bookings: 25 },
];

export const SPORT_SPLIT = [
  { name: "Football", value: 68 },
  { name: "Cricket", value: 24 },
  { name: "Mixed", value: 8 },
];

export const OCCUPANCY_SERIES = [
  { hour: "6a", pct: 62 },
  { hour: "8a", pct: 74 },
  { hour: "10a", pct: 41 },
  { hour: "12p", pct: 28 },
  { hour: "2p", pct: 35 },
  { hour: "4p", pct: 71 },
  { hour: "6p", pct: 92 },
  { hour: "8p", pct: 98 },
  { hour: "10p", pct: 84 },
  { hour: "12a", pct: 46 },
];

export const ADMIN_KPIS = [
  { label: "Revenue today", value: "₹42,800", delta: "+12.4%", trend: "up" as const },
  { label: "Bookings today", value: "27", delta: "+4", trend: "up" as const },
  { label: "Occupancy", value: "86%", delta: "+6.1%", trend: "up" as const },
  { label: "Cancellations", value: "2", delta: "-1", trend: "down" as const },
];

export const ADMIN_SLOTS = [
  { time: "06:00 AM", arena: "Arena A", open: true },
  { time: "07:00 AM", arena: "Arena A", open: true },
  { time: "08:00 AM", arena: "Arena B", open: true },
  { time: "12:00 PM", arena: "Arena A", open: false },
  { time: "04:00 PM", arena: "Arena A", open: true },
  { time: "06:00 PM", arena: "Arena A", open: true },
  { time: "08:00 PM", arena: "Arena B", open: true },
  { time: "11:00 PM", arena: "Arena B", open: false },
];
