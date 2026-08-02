import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Facilities } from "@/components/home/Facilities";
import { PricingSection } from "@/components/home/PricingSection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Reviews } from "@/components/home/Reviews";
import { ContactCTA } from "@/components/home/ContactCTA";

const title = "GREENARC — Floodlit Football & Cricket Turf, Malavana, Ernakulam";
const description =
  "Book FIFA-grade football and cricket turf slots in Malavana, Ernakulam. Floodlights till 1 AM, locker rooms, café and instant online booking.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Facilities />
      <PricingSection />
      <GalleryPreview />
      <Reviews />
      <ContactCTA />
    </SiteLayout>
  );
}
