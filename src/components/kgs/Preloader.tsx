import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSingleton } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";

export function Preloader() {
  const [done, setDone] = useState(false);
  // Same logo the hero uses (Admin → Hero → "Logo mark"), so both stay in sync.
  const { data: h, isLoading: logoLoading } = useSingleton<any>("hero");
  const logoUrl = resolveAsset(h?.logo_url);

  // Rendered from the very first paint (server included) — gating this behind a
  // mounted flag let the page underneath flash before the overlay appeared.
  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
        >
          {/* Architectural grid lines — subtle */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-y-0 left-1/4 w-px bg-white" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-white" />
            <div className="absolute inset-y-0 left-3/4 w-px bg-white" />
            <div className="absolute inset-x-0 top-1/3 h-px bg-white" />
            <div className="absolute inset-x-0 top-2/3 h-px bg-white" />
          </div>

          {/* Logo mark + wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <div className="flex items-center gap-5 md:gap-7">
              {/* Logo mark — the CMS-uploaded logo (Admin → Hero → "Logo mark"),
                  falling back to the built-in badge when none is set. The slot
                  keeps its size while loading so the mark never pops the layout. */}
              {/* Square slot reserves the space so the lockup doesn't shift
                  when the CMS logo finishes loading. */}
              <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center md:h-[92px] md:w-[92px]">
                {logoLoading ? null : logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Kolkata Glazing Services"
                    loading="eager"
                    decoding="async"
                    // Height is pinned to the lockup so the mark lines up with the
                    // divider and the wordmark; width follows the logo's aspect.
                    className="h-[68px] w-auto object-contain md:h-[92px]"
                  />
                ) : (
                  <span
                    role="img"
                    aria-label="Kolkata Glazing Services"
                    className="grid h-[68px] w-[68px] place-items-center rounded-2xl bg-white text-ink md:h-[92px] md:w-[92px]"
                  >
                    <span className="font-display text-[34px] font-bold leading-none tracking-tight md:text-[46px]">
                      K
                    </span>
                  </span>
                )}
              </div>

              <span className="h-[68px] w-px shrink-0 bg-white/25 md:h-[92px]" />

              <h1 className="font-display text-[clamp(1.1rem,3.2vw,1.65rem)] font-semibold uppercase leading-[1.08] tracking-[0.12em] text-white">
                <span className="block">Kolkata</span>
                <span className="block">Glazing</span>
                <span className="block">Services</span>
              </h1>
            </div>

            {/* Progress line */}
            <div className="relative h-[2px] w-40 overflow-hidden rounded-full bg-white/10 md:w-52">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brass"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40"
            >
              Facade Engineering
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
