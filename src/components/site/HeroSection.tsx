import Image from 'next/image';
import { EmailSignupForm } from '@/components/site/EmailSignupForm';

type HeroSectionProps = {
  headline: string;
  subhead: string;
  showSignup: boolean;
};

export function HeroSection({ headline, subhead, showSignup }: HeroSectionProps) {
  return (
    <section id="home" className="section-space pt-4">
      <div className="section-panel texture-strong relative min-h-[560px] p-6 md:min-h-[640px] md:p-12">
        <Image
          src="/assets/images/hero-main-1.jpg"
          alt="Kintsugi band atmospheric portrait"
          fill
          priority
          className="object-cover object-center opacity-28"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-main/35 via-bg-main/65 to-bg-main/95" />
        <div className="relative z-10 flex min-h-[520px] flex-col justify-end md:min-h-[560px]">
          <Image
            src="/assets/images/logo-white-transparent.png"
            alt="Kintsugi logo"
            width={260}
            height={80}
            className="h-auto w-40 md:w-52"
            priority
          />
          <p className="section-eyebrow mt-10">
            Glasgow, UK
          </p>
          <h1 className="mt-4 max-w-3xl text-[clamp(3.2rem,11vw,8.5rem)] uppercase leading-[0.88] tracking-[-0.03em]">
            {headline}
          </h1>
          <p className="mt-5 max-w-xl text-xl text-[#d7d7d7]">{subhead}</p>
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
