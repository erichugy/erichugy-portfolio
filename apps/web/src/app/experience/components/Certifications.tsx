import { SHOW_DATES } from "@/config/feature-flags";
import { CERTIFICATIONS } from "@/data/about";

export default function Certifications() {
  return (
    <section className="px-6 py-20 md:py-28 bg-page">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-sm text-muted tracking-wide mb-3">
          {"// certifications"}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-10">
          Certifications
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="card-glow bg-card rounded-xl border border-border p-5 shadow-[0_2px_8px_rgba(12,27,33,0.06)]"
            >
              <h3 className="text-sm font-semibold text-heading mb-1">
                {cert.name}
              </h3>
              <p className="text-xs text-muted font-mono">
                {cert.issuer}
                {SHOW_DATES && <span> &middot; {cert.date}</span>}
              </p>
              {cert.credentialId && (
                <p className="text-xs text-muted mt-1">
                  ID: {cert.credentialId}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
