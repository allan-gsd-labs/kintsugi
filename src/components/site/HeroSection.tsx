import { EmailSignupForm } from '@/components/site/EmailSignupForm';

type HeroSectionProps = {
  headline: string;
  subhead: string;
  showSignup: boolean;
};

export function HeroSection({ headline, subhead, showSignup }: HeroSectionProps) {
  return (
    <section id="home" className="section-space">
      <p className="mb-6 text-xs uppercase tracking-[0.2em] text-text-muted">
        Kintsugi
      </p>
      <h1 className="max-w-3xl">{headline}</h1>
      <p className="mt-6 max-w-2xl text-lg text-text-muted">{subhead}</p>
      {showSignup ? (
        <EmailSignupForm placeholder="you@example.com" submitText="Subscribe" />
      ) : null}
    </section>
  );
}

