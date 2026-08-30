import { Instagram, Linkedin } from "lucide-react";
import { useSingleton } from "@/lib/cms";

export function Footer() {
  const { data: f } = useSingleton<any>("footer");

  const brandLine1 = f?.brand_line1 || "Kolkata";
  const brandLine2Accent = f?.brand_line2_accent || "Glazing";
  const brandLine2Rest = f?.brand_line2_rest || "Services";

  // Social links come from the CMS (Admin → Footer); each icon only appears
  // once its link is filled in, so we never render a dead link.
  const socials = [
    { label: "Instagram", href: f?.instagram_url, Icon: Instagram },
    { label: "LinkedIn", href: f?.linkedin_url, Icon: Linkedin },
  ].filter((s) => typeof s.href === "string" && s.href.trim() !== "");

  // The consultation section (07) already carries every contact detail, so the
  // footer is just the wordmark that closes the page.
  return (
    <footer className="relative overflow-hidden border-t border-line bg-background pt-14 pb-12 md:pt-24 md:pb-16">
      <div className="container-kgs">
        <h2 className="display-section text-balance text-[clamp(2.1rem,7vw,6.25rem)] leading-[0.94] tracking-[-0.05em]">
          {brandLine1}
          <br />
          <span className="text-brass italic">{brandLine2Accent}</span> {brandLine2Rest}
          <span className="text-brass">.</span>
        </h2>

        {socials.length > 0 && (
          <div className="mt-10 flex items-center gap-3 md:mt-14">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`KGS on ${label}`}
                title={label}
                className="group grid h-11 w-11 place-items-center rounded-full border border-line text-ink-dim transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
