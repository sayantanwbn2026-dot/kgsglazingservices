import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/kgs/Nav";
import { Footer } from "@/components/kgs/Footer";
import { PageHero } from "@/components/kgs/PageHero";
import { PageCTA } from "@/components/kgs/PageCTA";
import { useSingleton, useList } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";
import loudon from "@/assets/proj-loudon.jpg";
import one10 from "@/assets/proj-one10.jpg";
import aurus from "@/assets/proj-aurus.jpg";
import vyom from "@/assets/proj-vyom.jpg";
import siddha from "@/assets/proj-siddha.jpg";
import ecospace from "@/assets/proj-ecospace.jpg";
import dominion from "@/assets/proj-dominion.jpg";
import park from "@/assets/proj-park.jpg";

type Project = {
  n: string;
  name: string;
  loc: string;
  sys: string;
  img: string;
  year: string;
  status: "Delivered" | "In Progress";
  scope: string;
  area: string;
  tag: "Commercial" | "Mixed-Use" | "Residential";
};

const FALLBACK: Project[] = [
  { n: "01", name: "7 Loudon Street",  loc: "Kolkata, IN", sys: "Structural Glazing · Curtain Wall", img: loudon,   year: "2022", status: "Delivered",   scope: "Design · Engineering · Install", area: "62,000 sqft", tag: "Commercial" },
  { n: "02", name: "One 10",           loc: "Kolkata, IN", sys: "Unitised Curtain Wall",           img: one10,    year: "2023", status: "Delivered",   scope: "Engineering · Fabrication · Install", area: "78,400 sqft", tag: "Commercial" },
  { n: "03", name: "PS Aurus",         loc: "Kolkata, IN", sys: "Curtain Wall · ACP",              img: aurus,    year: "2021", status: "Delivered",   scope: "Design · Engineering · Install", area: "44,200 sqft", tag: "Mixed-Use" },
  { n: "04", name: "PS Vyom",          loc: "Kolkata, IN", sys: "Premium Window Systems",          img: vyom,     year: "2024", status: "In Progress", scope: "Design · Engineering · Install", area: "92,000 sqft", tag: "Residential" },
  { n: "05", name: "Siddha Esplanade", loc: "Kolkata, IN", sys: "Structural Glazing · Skylights",  img: siddha,   year: "2020", status: "Delivered",   scope: "Engineering · Fabrication · Install", area: "38,500 sqft", tag: "Mixed-Use" },
  { n: "06", name: "Eco Space",        loc: "Rajarhat, IN",sys: "Curtain Wall System",             img: ecospace, year: "2019", status: "Delivered",   scope: "Engineering · Install", area: "120,000 sqft", tag: "Commercial" },
  { n: "07", name: "The Dominion",     loc: "Kolkata, IN", sys: "Unitised Glazing",                img: dominion, year: "2024", status: "In Progress", scope: "Design · Engineering · Install", area: "54,000 sqft", tag: "Commercial" },
  { n: "08", name: "69 Park Street",   loc: "Kolkata, IN", sys: "Frameless Glazing · ACP",         img: park,     year: "2023", status: "Delivered",   scope: "Design · Engineering · Install", area: "48,800 sqft", tag: "Mixed-Use" },
];

const FILTERS = ["All", "Commercial", "Mixed-Use", "Residential", "In Progress"] as const;
type Filter = (typeof FILTERS)[number];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — KGS Facade Engineering" },
      { name: "description", content: "Selected works by Kolkata Glazing Services — landmark towers, mixed-use developments and luxury residences across India." },
      { property: "og:title", content: "Projects — KGS Facade Engineering" },
      { property: "og:description", content: "Selected facade engineering works delivered by KGS." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data: page, isLoading: pageLoading } = useSingleton<any>("projects_page");
  const { data: rows, isLoading: rowsLoading } = useList<any>("projects");
  const cms: Project[] = (rows ?? []).map((r: any) => ({
    n: r.number_label ?? "",
    name: r.name ?? "",
    loc: r.location ?? "",
    sys: r.system_description ?? "",
    img: resolveAsset(r.image_url),
    year: r.year ?? "",
    status: (r.status === "In Progress" ? "In Progress" : "Delivered") as Project["status"],
    scope: r.scope ?? "",
    area: r.area ?? "",
    tag: (["Commercial","Mixed-Use","Residential"].includes(r.tag) ? r.tag : "Commercial") as Project["tag"],
  }));
  const PROJECTS: Project[] = rowsLoading || cms.length ? cms : FALLBACK;
  const fullDescById = new Map((rows ?? []).map((r: any) => [r.name, r.full_description as string]));

  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  // Lock the page behind the modal and let Escape dismiss it. Without the key
  // handler the only way out on a phone was a button that sat off-screen.
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const filtered = useMemo(() => {
    if (filter === "All") return PROJECTS;
    if (filter === "In Progress") return PROJECTS.filter((p) => p.status === "In Progress");
    return PROJECTS.filter((p) => p.tag === filter);
  }, [filter, PROJECTS]);

  const crumb = page?.crumb ?? (pageLoading ? "Projects" : "Projects");
  const heroEyebrow = page?.hero_eyebrow ?? (pageLoading ? "03 — Portfolio" : "03 — Portfolio");
  const heroTitle = page?.hero_title ?? (pageLoading ? "A portfolio of" : "A portfolio of");
  const heroHighlight = page?.hero_highlight ?? (pageLoading ? "precision-engineered envelopes." : "precision-engineered envelopes.");
  const heroSubtitle = page?.hero_subtitle ?? (pageLoading ? "From frameless residential glazing to landmark unitised curtain walls — every project documents a single chain of accountability from concept to handover." : "From frameless residential glazing to landmark unitised curtain walls — every project documents a single chain of accountability from concept to handover.");
  
  const stat1Value = page?.stat1_value ?? (pageLoading ? "100+" : "100+");
  const stat1Label = page?.stat1_label ?? (pageLoading ? "Projects delivered" : "Projects delivered");
  const stat2Value = page?.stat2_value ?? (pageLoading ? "8M+ sqft" : "8M+ sqft");
  const stat2Label = page?.stat2_label ?? (pageLoading ? "Facade area engineered" : "Facade area engineered");
  const stat3Value = page?.stat3_value ?? (pageLoading ? "25+" : "25+");
  const stat3Label = page?.stat3_label ?? (pageLoading ? "Years in practice" : "Years in practice");
  const stat4Value = page?.stat4_value ?? (pageLoading ? "12" : "12");
  const stat4Label = page?.stat4_label ?? (pageLoading ? "Indian cities" : "Indian cities");

  return (
    <main className="bg-background text-ink min-h-screen">
      <Nav />
      <PageHero
        image={aurus}
        crumb={crumb}
        eyebrow={heroEyebrow}
        title={heroTitle}
        highlight={heroHighlight}
        subtitle={heroSubtitle}
      />

      {/* Stats strip */}
      <section className="bg-background pt-14 md:pt-20 pb-10 md:pb-16">
        <div className="container-kgs">
          <div className="grid grid-cols-2 md:grid-cols-4 border border-line rounded-2xl bg-surface/70 backdrop-blur-sm divide-x divide-line overflow-hidden">
            {[
              { v: stat1Value, l: stat1Label },
              { v: stat2Value, l: stat2Label },
              { v: stat3Value,  l: stat3Label },
              { v: stat4Value,   l: stat4Label },
            ].map((s) => (
              <div key={s.l} className="px-5 py-6 text-center">
                <div className="font-display text-[26px] md:text-[32px] font-semibold tracking-tight text-ink">{s.v}</div>
                <div className="mt-1 text-[12px] md:text-[13px] text-ink-mute font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-background py-8 md:py-12">
        <div className="container-kgs flex flex-wrap items-center gap-2 relative">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative rounded-full px-4 py-2 font-display text-[12.5px] font-medium tracking-tight transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-brass"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-background" : "text-ink-dim hover:text-ink"}`}>
                  {f}
                </span>
              </button>
            );
          })}
          <div className="ml-auto font-display text-[11px] tracking-[0.3em] uppercase text-ink-mute">
            {filtered.length} / {PROJECTS.length} shown
          </div>
        </div>
      </section>

      {/* Uniform Grid */}
      <section className="bg-background pb-32">
        <div className="container-kgs">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="col-span-full py-20 text-center font-mono text-[11px] tracking-[0.3em] uppercase text-ink-mute"
                >
                  No projects in this category yet.
                </motion.div>
              ) : (
                filtered.map((p, i) => (
                  <motion.button
                    key={p.name}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setActive(p)}
                    className="group relative overflow-hidden rounded-[var(--radius)] bg-surface border border-line text-left aspect-[4/5]"
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover bg-surface grayscale-[20%] transition-all duration-[1400ms] ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

                    <div className="absolute inset-x-0 top-0 p-5 md:p-6 flex justify-between font-display text-[10px] tracking-[0.3em] uppercase text-white/80">
                      <span>{p.n}</span>
                      <span>{p.year}</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                      <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass-soft/90">
                        {p.loc} · {p.status}
                      </div>
                      <div className="mt-2 display-sub text-white text-xl md:text-2xl">
                        {p.name}
                      </div>
                      <div className="mt-2 font-display text-[11px] tracking-[0.2em] uppercase text-white/60">
                        {p.sys}
                      </div>
                      <div className="mt-4 h-px w-10 bg-brass transition-all duration-500 group-hover:w-24" />
                    </div>
                  </motion.button>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-md flex items-end justify-center md:items-center md:p-10"
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              // A bottom sheet on phones, a centered dialog from md up. Capped
              // height + an inner scroll area keeps long content reachable.
              className="relative flex w-full max-h-[92dvh] flex-col overflow-hidden rounded-t-2xl border border-line bg-background shadow-[0_30px_80px_-20px_rgba(15,23,42,0.4)] md:max-h-[88vh] md:max-w-5xl md:rounded-[var(--radius)]"
            >
              {/* Always reachable — it stays put while the content scrolls. */}
              <button
                onClick={() => setActive(null)}
                aria-label="Close project details"
                className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-ink/55 text-white backdrop-blur-md transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-4 md:top-4"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>

              {/* Grab handle — signals the sheet on touch devices. */}
              <div className="pointer-events-none absolute inset-x-0 top-2 z-20 flex justify-center md:hidden">
                <span className="h-1 w-10 rounded-full bg-white/60" />
              </div>

              <div className="grid grid-cols-1 overflow-y-auto overscroll-contain md:grid-cols-2">
              <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[520px] bg-surface">
                <img src={active.img} alt={active.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover bg-surface" />
              </div>
              <div className="flex flex-col p-7 pb-[max(1.75rem,env(safe-area-inset-bottom))] md:p-12">
                <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass">
                  {active.n} · {active.tag}
                </div>
                <h3 id="project-modal-title" className="mt-4 display-sub text-2xl md:text-[2.1rem] leading-[1.05]">
                  {active.name}
                </h3>
                <p className="mt-4 body-lead">
                  {fullDescById.get(active.name) || `${active.sys} — ${page?.modal_blurb ?? "engineered, fabricated and installed by KGS. Delivered with full BIM coordination, mockup-verified system selection and ±0.5mm fabrication tolerances."}`}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  {[
                    { k: "Year", v: active.year },
                    { k: "Status", v: active.status },
                    { k: "Area", v: active.area },
                    { k: "Scope", v: active.scope },
                  ].map((m) => (
                    <div key={m.k} className="border-t border-line pt-3">
                      <div className="font-display text-[10px] tracking-[0.3em] uppercase text-ink/40">{m.k}</div>
                      <div className="mt-2 font-display text-sm text-ink-dim">{m.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col-reverse items-stretch gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between md:pt-10">
                  <button
                    onClick={() => setActive(null)}
                    className="min-h-[44px] font-display text-[11px] tracking-[0.3em] uppercase text-ink-dim transition-colors hover:text-ink"
                  >
                    ← Close
                  </button>
                  <Link
                    to="/"
                    hash="contact"
                    className="btn-primary justify-center !py-3 !px-4 !text-[13px] sm:!py-2.5"
                  >
                    Discuss a similar project
                  </Link>
                </div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageCTA
        title={page?.cta_title ?? (pageLoading ? "Have a tower, campus, or residence in design?" : "Have a tower, campus, or residence in design?")}
        copy={page?.cta_copy ?? (pageLoading ? "Send the brief — our engineering team will return with a feasibility note, system options and indicative tolerances within two working days." : "Send the brief — our engineering team will return with a feasibility note, system options and indicative tolerances within two working days.")}
      />
      <Footer />
    </main>
  );
}