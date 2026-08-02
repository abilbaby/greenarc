import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Client-only intro animation. Renders nothing during SSR to avoid mismatch. */
export function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("tf-intro") === "1") return;
    setMounted(true);
    sessionStorage.setItem("tf-intro", "1");
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-bold tracking-tight"
            >
              GREEN<span className="neon-text">ARC</span>
            </motion.div>
            <div className="h-[3px] w-56 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
                className="h-full rounded-full bg-neon"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Lighting up the arena
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
