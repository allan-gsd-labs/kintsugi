import Image from 'next/image';
import { EmailSignupForm } from '@/components/site/EmailSignupForm';

type HeroSectionProps = {
  headline: string;
  subhead: string;
  showSignup: boolean;
};

export function HeroSection({ headline, subhead, showSignup }: HeroSectionProps) {
  return (
    <section id="home" className="section-space pt-8">
      <div className="relative min-h-[560px] overflow-hidden rounded-lg border border-border-subtle bg-bg-surface/30 p-6 md:min-h-[640px] md:p-12">
        <Image
          src="/assets/images/hero-main-1.jpg"
          alt="Kintsugi band atmospheric portrait"
          fill
          priority
          className="object-cover object-center opacity-32"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main/40 via-bg-main/60 to-bg-main/95" />
        <div className="relative z-10 flex min-h-[520px] flex-col justify-end md:min-h-[560px]">
          <Image
            src="/assets/images/logo-white-transparent.png"
            alt="Kintsugi logo"
            width={260}
            height={80}
            className="h-auto w-40 md:w-52"
            priority
          />
          <p className="mt-10 text-xs uppercase tracking-[0.24em] text-text-muted">
            Glasgow, UK
          </p>
          <h1 className="mt-4 max-w-2xl">{headline}</h1>
          <p className="mt-5 max-w-xl text-lg text-text-muted">{subhead}</p>
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
