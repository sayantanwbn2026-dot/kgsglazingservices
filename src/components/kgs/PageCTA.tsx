import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useSingleton } from "@/lib/cms";

export function PageCTA({
  eyebrow = "Next Step",
  title = "Start a conversation.",
  copy = "Ready to discuss your project requirements? Our engineering team is available for a technical review.",
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  // Editable in the CMS: Admin → Contact — Consultation → Email.
  const { data: c } = useSingleton<any>("contact");
  const email = c?.email || "support@kolkataglazing.com";

  return (
    <section className="relative bg-surface-2 py-28 md:py-40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 60% at 50% 100%, color-mix(in oklab, var(--brass) 14%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative container-kgs text-center max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 display-section text-balance"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-7 body-lead mx-auto"
        >
          {copy}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/" hash="contact" className="btn-primary">
            Book a consult
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a href={`mailto:${email}`} className="btn-ghost">
            {email}
          </a>
        </motion.div>
      </div>
    </section>
  );
}