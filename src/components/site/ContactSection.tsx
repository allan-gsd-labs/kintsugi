type ContactSectionProps = {
  bookingEmail: string;
  generalEmail: string;
  socialLinks: Array<{ label: string; url: string }>;
};

export function ContactSection({
  bookingEmail,
  generalEmail,
  socialLinks,
}: ContactSectionProps) {
  return (
    <section id="contact" className="section-panel texture-soft section-space px-6 py-8 md:px-8 md:py-10">
      <p className="section-eyebrow">Reach</p>
      <h2 className="section-heading">Contact</h2>
      <div className="panel-divider" />
      <div className="mt-8 space-y-3 text-text-muted">
        <p>
          Booking:{' '}
          <a
            href={`mailto:${bookingEmail}`}
            className="transition-colors duration-150 hover:text-accent-red"
          >
            {bookingEmail}
          </a>
        </p>
        <p>
          General:{' '}
          <a
            href={`mailto:${generalEmail}`}
            className="transition-colors duration-150 hover:text-accent-red"
          >
            {generalEmail}
          </a>
        </p>
      </div>
      <ul className="mt-6 flex flex-wrap gap-4">
        {socialLinks.map((social) => (
          <li key={social.label}>
            <a
              href={social.url}
              className="text-sm uppercase tracking-[0.18em] text-text-muted transition-colors duration-150 hover:text-accent-red"
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
