import Image from 'next/image';
import { EmailSignupForm } from '@/components/site/EmailSignupForm';

type HeroSectionProps = {
  headline: string;
  subhead: string;
  showSignup: boolean;
};

export function HeroSection({ headline, subhead, showSignup }: HeroSectionProps) {
  return (
    <section id="home" className="section-space pt-10">
      <div className="relative min-h-[540px] overflow-hidden rounded-lg border border-border-subtle bg-bg-surface/40 p-6 md:min-h-[620px] md:p-10">
        <Image
          src="/assets/images/hero-main-1.jpg"
          alt="Kintsugi band atmospheric portrait"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main/60 via-bg-main/55 to-bg-main/95" />
        <div className="relative z-10">
          <Image
            src="/assets/images/logo-white-transparent.png"
            alt="Kintsugi logo"
            width={260}
            height={80}
            className="h-auto w-44 md:w-56"
            priority
          />
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-text-muted">
            Glasgow, UK
          </p>
          <h1 className="mt-4 max-w-3xl">{headline}</h1>
          <p className="mt-6 max-w-2xl text-lg text-text-muted">{subhead}</p>
          {showSignup ? (
            <EmailSignupForm
              placeholder="you@example.com"
              submitText="Subscribe"
              source="hero"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
