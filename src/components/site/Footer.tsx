import { EmailSignupForm } from '@/components/site/EmailSignupForm';

type FooterProps = {
  showSignup: boolean;
  socialLinks: Array<{ label: string; url: string }>;
};

export function Footer({ showSignup, socialLinks }: FooterProps) {
  return (
    <footer className="section-panel texture-soft section-space border-t border-border-subtle px-6 py-8 md:px-8 md:py-10">
      <p className="section-eyebrow">Mailing List</p>
      <h3 className="text-2xl">Stay in the loop</h3>
      <div className="panel-divider" />
      {showSignup ? (
        <EmailSignupForm
          placeholder="you@example.com"
          submitText="Subscribe"
          source="footer"
        />
      ) : null}
      <ul className="mt-8 flex flex-wrap gap-4">
        {socialLinks.map((social) => (
          <li key={social.label}>
            <a
              href={social.url}
              className="text-xs uppercase tracking-[0.2em] text-text-muted transition-colors duration-150 hover:text-accent-red"
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-text-muted">
        Copyright {new Date().getFullYear()} Kintsugi. All rights reserved.
      </p>
    </footer>
  );
}
