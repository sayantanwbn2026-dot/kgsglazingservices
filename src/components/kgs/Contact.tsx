import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSingleton } from "@/lib/cms";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const steps = [
  { key: "name", label: "Your name", placeholder: "Full name", type: "text" },
  { key: "org", label: "Organization", placeholder: "Architectural practice or developer", type: "text" },
  { key: "email", label: "Email address", placeholder: "you@company.com", type: "email" },
  { key: "phone", label: "Phone (optional)", placeholder: "+91 ", type: "tel" },
  { key: "project", label: "Project type", placeholder: "Commercial · Residential · Mixed-use", type: "text" },
  { key: "location", label: "Project location", placeholder: "City, State", type: "text" },
  { key: "budget", label: "Budget range", placeholder: "₹ Indicative range", type: "text" },
  { key: "message", label: "Project brief", placeholder: "Scope, timelines, materials of interest…", type: "textarea" },
] as const;

type Field = (typeof steps)[number]["key"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { data: c, isLoading } = useSingleton<any>("contact");
  const [i, setI] = useState(0);
  const [data, setData] = useState<Record<Field, string>>({
    name: "", org: "", email: "", phone: "", project: "", location: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const step = steps[i];
  const last = i === steps.length - 1;

  const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const setFieldRef = (el: HTMLInputElement | HTMLTextAreaElement | null) => { fieldRef.current = el; };
  const stepChanged = useRef(false);
  useEffect(() => {
    // Focus the field only when the user moves between steps — never on the
    // initial mount, which would otherwise scroll the page down to the form on load.
    if (!stepChanged.current) { stepChanged.current = true; return; }
    fieldRef.current?.focus({ preventScroll: true });
  }, [i]);

  const next = async () => {
    // Require a valid email so every enquiry is actually reachable.
    if (step.key === "email" && !EMAIL_RE.test(data.email.trim())) {
      setError("Please enter a valid email so we can reach you.");
      return;
    }
    setError("");
    if (last) {
      if (submitting) return;
      setSubmitting(true);
      const { error: insertError } = await supabase.from("enquiries" as any).insert({
        name: data.name.slice(0, 200),
        org: data.org.slice(0, 200),
        email: data.email.slice(0, 200),
        phone: data.phone.slice(0, 50),
        project: data.project.slice(0, 200),
        location: data.location.slice(0, 200),
        budget: data.budget.slice(0, 200),
        message: data.message.slice(0, 5000),
      });
      setSubmitting(false);
      if (insertError) { toast.error("Couldn't send — please try again."); return; }
      setSubmitted(true);
      // Email delivery to support@kolkataglazing.com is handled by a Postgres
      // trigger on the `enquiries` table (server-side), so nothing to do here.
      return;
    }
    setI((n) => n + 1);
  };
  const back = () => { setError(""); setI((n) => Math.max(0, n - 1)); };
  
  const eyebrow = c?.eyebrow || (isLoading ? "07 — Consultation" : "07 — Consultation");
  const heading = c?.heading || (isLoading ? "Start your project discussion." : "Start your project discussion.");
  const description = c?.description || (isLoading ? "Share a brief outline of your project. A KGS engineering lead will respond within two working days to schedule a consultation." : "Share a brief outline of your project. A KGS engineering lead will respond within two working days to schedule a consultation.");

  return (
    <section id="contact" className="relative bg-background py-14 md:py-28">
      <div className="container-kgs grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-6 display-section text-balance">
            {heading}
          </h2>
          <p className="mt-8 max-w-md body-lead">
            {description}
          </p>

          <div className="mt-12 space-y-5 max-w-md">
            {[
              { k: "Email", v: c?.email || "support@kolkataglazing.com" },
              { k: "Phone", v: c?.phone || (isLoading ? "+91 33 4000 0000" : "+91 33 4000 0000") },
              { k: "Office", v: c?.office_address || (isLoading ? "Salt Lake Sector V, Kolkata 700091" : "Salt Lake Sector V, Kolkata 700091") },
              { k: "Factory", v: c?.factory_address || (isLoading ? "Howrah Industrial Estate, WB" : "Howrah Industrial Estate, WB") },
            ].map((m) => (
              <div key={m.k} className="grid grid-cols-3 gap-4 border-t border-line pt-4">
                <div className="font-display text-[10px] tracking-[0.3em] uppercase text-ink/40">{m.k}</div>
                <div className="col-span-2 font-display text-sm text-ink-dim">{m.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-line bg-surface p-7 md:p-14 min-h-[400px] md:min-h-[520px] flex flex-col">
            {/* Progress */}
            <div className="flex items-center justify-between mb-12">
              <div className="font-display text-[10px] tracking-[0.3em] uppercase text-ink/40">
                {submitted ? "Confirmed" : `Step ${i + 1} / ${steps.length}`}
              </div>
              <div className="flex gap-2">
                {steps.map((_, k) => (
                  <span
                    key={k}
                    className={`h-px w-8 transition-colors duration-500 ${
                      submitted || k <= i ? "bg-brass" : "bg-line"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 flex flex-col justify-center"
                  >
                    <span className="font-display text-[10px] tracking-[0.3em] uppercase text-brass">
                      Thank you, {data.name || "—"}
                    </span>
                    <h3 className="mt-6 display-sub text-2xl md:text-[2.1rem]">
                      Your brief has been received.
                    </h3>
                    <p className="mt-6 max-w-md body-lead">
                      A KGS engineering lead will be in touch within two working days to schedule your consultation.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 flex flex-col justify-center"
                  >
                    <label className="font-display text-[10px] tracking-[0.3em] uppercase text-brass">
                      {step.label}
                    </label>
                    {step.type === "textarea" ? (
                      <textarea
                        ref={setFieldRef}
                        value={data[step.key]}
                        onChange={(e) => setData({ ...data, [step.key]: e.target.value })}
                        rows={4}
                        placeholder={step.placeholder}
                        className="mt-6 w-full bg-transparent border-b border-line focus:border-brass outline-none display-sub text-lg md:text-[1.55rem] text-ink placeholder:text-ink/25 py-4 resize-none transition-colors"
                      />
                    ) : (
                      <input
                        ref={setFieldRef}
                        type={step.type}
                        value={data[step.key]}
                        onChange={(e) => { setError(""); setData({ ...data, [step.key]: e.target.value }); }}
                        placeholder={step.placeholder}
                        onKeyDown={(e) => e.key === "Enter" && next()}
                        className="mt-6 w-full bg-transparent border-b border-line focus:border-brass outline-none display-sub text-xl md:text-[1.8rem] text-ink placeholder:text-ink/25 py-4 transition-colors"
                      />
                    )}
                    {error && (
                      <p className="mt-3 font-display text-[12px] tracking-wide text-red-500">
                        {error}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!submitted && (
              // On mobile the long submit label collided with Back on one row.
              // Stack them (primary CTA full-width on top, Back beneath) and
              // restore a single row from sm up.
              <div className="mt-10 md:mt-12 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={back}
                  disabled={i === 0}
                  className="self-start flex items-center min-h-[44px] font-display text-[11px] tracking-[0.3em] uppercase text-ink-dim hover:text-ink disabled:opacity-30 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={next}
                  disabled={submitting}
                  className="group w-full sm:w-auto justify-center sm:justify-start inline-flex items-center gap-3 bg-ink text-background px-7 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-brass transition-colors duration-500"
                >
                  {last ? (submitting ? "Sending…" : "Start Your Project Discussion") : "Continue"}
                  <span className="inline-block h-px w-5 bg-current transition-all duration-500 group-hover:w-10" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}