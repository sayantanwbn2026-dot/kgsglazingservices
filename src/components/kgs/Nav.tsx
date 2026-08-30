import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";

const links = [
  { label: "Projects", to: "/projects" },
  { label: "Process", to: "/process" },
  { label: "Expertise", to: "/expertise" },
  { label: "Clients", to: "/clients" },
  { label: "About", to: "/about" },
];

/**
 * `alwaysSolid` is for pages whose header is light at the top (e.g. a client
 * profile). Every page with a dark photographic hero leaves it off so the bar
 * floats over the image until the user scrolls.
 */
export function Nav({ alwaysSolid = false }: { alwaysSolid?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const solid = scrolled || alwaysSolid;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "fixed inset-x-0 top-0 z-[60] transition-all duration-300",
        solid
          ? "bg-background/95 backdrop-blur-xl border-b border-line/70 pt-0"
          : // A touch of air above the bar over the hero photo — enough to feel
            // unclamped, not so much that it floats away from the top edge.
            "bg-transparent border-b border-transparent pt-1.5 md:pt-2.5",
      ].join(" ")}
    >
      <div className="container-kgs flex h-16 md:h-[68px] items-center justify-between">
        {/* Brand */}
        <Link to="/" className="group flex items-center">
          <span
            className={[
              "font-display text-[14px] font-semibold tracking-tight transition-colors duration-300",
              solid ? "text-ink group-hover:text-brass" : "text-white group-hover:text-brass-soft",
            ].join(" ")}
          >
            <span className="hidden sm:inline">Kolkata Glazing Services</span>
            <span className="sm:hidden">KGS</span>
          </span>
        </Link>

        {/* Center links */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
          {links.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={[
                  "group relative px-4 py-2 font-display text-[13.5px] font-medium tracking-tight transition-colors",
                  active
                    ? solid
                      ? "text-ink"
                      : "text-white"
                    : solid
                      ? "text-ink-dim hover:text-ink"
                      : "text-white/70 hover:text-white",
                ].join(" ")}
              >
                <span className="relative">
                  {l.label}
                  <span
                    className={[
                      "absolute -bottom-1 left-0 h-[1.5px] bg-brass transition-all duration-300 ease-out",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    ].join(" ")}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className={[
              "hidden md:inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-[13px] font-medium transition-all duration-300",
              solid
                ? "bg-ink text-white hover:bg-brass shadow-sm"
                : "bg-white text-ink hover:bg-brass hover:text-white shadow-sm",
            ].join(" ")}
          >
            Book a consult
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Mobile burger */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className={[
              "lg:hidden grid place-items-center h-10 w-10 rounded-full transition-colors",
              solid ? "hover:bg-surface-2 text-ink" : "hover:bg-white/10 text-white",
            ].join(" ")}
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-[1.5px] w-5 bg-current transition-transform ${open ? "translate-y-[7.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-current transition-transform ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-full mt-2 left-4 right-4 z-[55] rounded-2xl bg-background/95 backdrop-blur-xl border border-line p-4 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3.5 min-h-[44px] font-display text-[15px] font-medium text-ink hover:bg-surface-2 transition-colors flex items-center"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-4 btn-primary w-full justify-center min-h-[44px]"
            >
              Book a consult
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
