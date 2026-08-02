import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import { heroImage, STATS } from "@/data/mock";
import { NeonLink } from "@/components/site/NeonButton";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.09,
        delay: 0.15,
      });
      gsap.from(".hero-sub", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.6,
        stagger: 0.08,
      });

      const onScroll = () => {
        const y = window.scrollY;
        gsap.to(image.current, { y: y * 0.18, duration: 0.6, ease: "power2.out" });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative mx-auto max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-[2rem] border border-border">
        <div ref={image} className="absolute inset-0 -z-10 scale-110">
          <img
            src={heroImage}
            alt="Floodlit GREENARC football arena at night"
            width={1920}
            height={1088}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <div className="relative px-6 py-24 sm:px-12 sm:py-32 lg:py-40">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium tracking-wide"
          >
            <span className="size-1.5 rounded-full bg-neon live-dot" />
            6 slots left tonight
          </motion.span>

          <h1 className="mt-7 max-w-4xl font-display text-[13vw] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block overflow-hidden">
              <span className="hero-line block">Your game.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">
                Our <span className="neon-text">floodlights.</span>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Two FIFA-grade arenas and four cricket lanes in the heart of Malavana, Ernakulam. Book a slot in
            under a minute, walk in, and play until 1 AM.
          </p>

          <div className="hero-sub mt-9 flex flex-wrap items-center gap-3">
            <NeonLink to="/book" size="lg">
              Book your slot
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </NeonLink>
            <NeonLink to="/gallery" variant="glass" size="lg">
              <PlayCircle className="size-4" />
              See the arena
            </NeonLink>
          </div>

          <div className="hero-sub mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-neon text-neon" />
              ))}
            </div>
            4.9 from 1,280 players across Ernakulam
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-10 grid grid-cols-2 gap-3 px-2 sm:grid-cols-4 sm:px-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.6 }}
            className="glass-strong rounded-2xl px-5 py-4 text-center"
          >
            <div className="font-display text-2xl font-bold text-neon sm:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
