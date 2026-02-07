'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import site from '../../content/site.json';
import gigs from '../../content/gigs.json';
import merch from '../../content/merch.json';

type Anchor = {
  id: string;
  href: `#${string}`;
  label: string;
};

type Social = {
  label: string;
  url: string;
};

type SiteContent = {
  headline: string;
  description: string;
  heroCampaign?: {
    isActive: boolean;
    label: string;
    title: string;
    subtitle?: string;
    image?: string;
    primaryCtaLabel: string;
    primaryCtaUrl: string;
    secondaryCtaLabel?: string;
    secondaryCtaUrl?: string;
  };
  mailingList: {
    headline: string;
    subhead: string;
    placeholder: string;
    submitText: string;
  };
  bandcamp: {
    embedUrl: string;
  };
  release: {
    title: string;
    subtitle: string;
    date: string;
    description: string;
    details: Array<{ label: string; value: string }>;
    artwork: string;
    links: Array<{ label: string; url: string }>;
  };
  proof: {
    quote: string;
    source: string;
    highlights: Array<{ label: string; value: string }>;
  };
  pressStrip?: string[];
  emails: {
    booking: string;
    general: string;
    management?: string;
  };
  socials: Social[];
  footer: {
    copyright: string;
  };
};

type Gig = {
  date: string;
  venue: string;
  city: string;
  address: string;
  status?: string;
  ticketsUrl?: string;
};

type Product = {
  slug: string;
  title: string;
  priceGBP: number;
  image: string;
  description?: string;
  productUrl?: string;
  stripePriceId: string | null;
  sizes?: string[];
};

const anchors: Anchor[] = [
  { id: 'home', href: '#home', label: 'Home' },
  { id: 'music', href: '#music', label: 'Music' },
  { id: 'gigs', href: '#gigs', label: 'Gigs' },
  { id: 'merch', href: '#merch', label: 'Merch' },
  { id: 'contact', href: '#contact', label: 'Contact' },
];

function formatDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatPriceFromPence(pence: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(pence / 100);
}

function getUpcomingShows(upcoming: Gig[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [...upcoming]
    .filter((show) => new Date(`${show.date}T00:00:00`) >= today)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

function useActiveAnchor() {
  const [activeAnchor, setActiveAnchor] = useState('home');

  useEffect(() => {
    const sections = anchors
      .map((anchor) => document.getElementById(anchor.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveAnchor(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.45, 0.72], rootMargin: '-20% 0px -52% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeAnchor;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      if (max <= 0) {
        setProgress(0);
        return;
      }

      setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)));
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

function useRevealOnScroll() {
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!revealNodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function EmailSignupForm({
  idPrefix,
  placeholder,
  submitText,
  layout = 'inline',
}: {
  idPrefix: string;
  placeholder: string;
  submitText: string;
  layout?: 'inline' | 'stacked';
}) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/mailing-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setFeedback({ type: 'error', text: payload.error ?? 'Unable to subscribe right now.' });
      } else {
        setFeedback({ type: 'success', text: payload.message ?? 'Subscribed. Welcome in.' });
        setEmail('');
        setCompany('');
      }
    } catch {
      setFeedback({ type: 'error', text: 'Network error. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={`k-signup ${layout === 'stacked' ? 'k-signup-stacked' : ''}`} noValidate>
      <label htmlFor={`${idPrefix}-email`} className="sr-only">
        Email address
      </label>
      {layout === 'stacked' ? (
        <div className="k-signup-stack">
          <input
            id={`${idPrefix}-email`}
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            autoComplete="email"
            inputMode="email"
            placeholder={placeholder}
            className="k-input k-input-main"
          />
          <div className="k-signup-actions">
            <button type="submit" disabled={isSubmitting} className="k-button k-button-solid">
              {isSubmitting ? 'Joining...' : submitText}
            </button>
          </div>
        </div>
      ) : (
        <div className="k-signup-row">
          <input
            id={`${idPrefix}-email`}
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            autoComplete="email"
            inputMode="email"
            placeholder={placeholder}
            className="k-input k-input-main"
          />
          <button type="submit" disabled={isSubmitting} className="k-button k-button-solid">
            {isSubmitting ? 'Joining...' : submitText}
          </button>
        </div>
      )}

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${idPrefix}-company`}>Company</label>
        <input
          id={`${idPrefix}-company`}
          value={company}
          onChange={(event) => setCompany(event.currentTarget.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <p
        className={`k-form-feedback ${feedback?.type === 'error' ? 'text-kaccent' : 'text-kmuted'}`}
        role="status"
        aria-live="polite"
      >
        {feedback?.text}
      </p>
    </form>
  );
}

function SiteHeader({ activeAnchor, progress }: { activeAnchor: string; progress: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [activeAnchor]);

  return (
    <header className="k-site-header">
      <div className="k-wrap">
        <div className="k-site-header-row">
          <button
            type="button"
            className="k-mobile-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            Menu
          </button>

          <nav aria-label="Primary navigation" className="k-desktop-nav">
            <ul>
              {anchors.map((item) => {
                const isActive = activeAnchor === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`k-nav-link ${isActive ? 'k-nav-link-active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a href="/epk" className="k-nav-link">
                  EPK
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div id="mobile-nav" className={`k-mobile-nav ${mobileOpen ? 'k-mobile-nav-open' : ''}`}>
        <nav aria-label="Mobile navigation">
          <ul>
            {anchors.map((item) => {
              const isActive = activeAnchor === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`k-mobile-link ${isActive ? 'k-mobile-link-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a href="/epk" className="k-mobile-link">
                EPK
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="k-scroll-progress" aria-hidden>
        <span style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}

function SectionHeading({
  overline,
  title,
  copy,
  wave = false,
}: {
  overline: string;
  title: string;
  copy?: string;
  wave?: boolean;
}) {
  return (
    <div className="k-section-head">
      <p className="k-overline k-reveal k-reveal-d0" data-reveal>
        {overline}
      </p>
      <span className="k-section-divider k-reveal k-reveal-d1" data-reveal aria-hidden />
      <h2 className="k-heading-xl k-reveal k-reveal-d2" data-reveal>
        {title}
      </h2>
      {copy ? (
        <p className="k-copy k-max-copy k-reveal k-reveal-d3" data-reveal>
          {copy}
        </p>
      ) : null}
      {wave ? (
        <div className="k-waveform k-reveal k-reveal-d4" data-reveal aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : null}
    </div>
  );
}

function HeroSection({ content }: { content: SiteContent }) {
  const hasCampaign = Boolean(content.heroCampaign?.isActive);

  return (
    <section id="home" className="k-hero">
      <Image src="/assets/main1-v2.jpg" alt="Kintsugi band portrait" fill priority sizes="100vw" className="k-hero-media" />
      <div className="k-hero-shade" />
      <div className="k-hero-texture" />

      <div className="k-wrap k-hero-inner">
        <p className="k-overline k-reveal k-reveal-d0" data-reveal>
          Glasgow, Scotland
        </p>
        <div className="k-hero-logo-wrap k-reveal k-reveal-d1" data-reveal>
          <Image
            src="/assets/white-transparent-v2.png"
            alt="Kintsugi"
            width={860}
            height={220}
            priority
            className="k-hero-logo"
          />
        </div>
        <h1 className="sr-only">{content.headline}</h1>
        <p className="k-hero-description k-reveal k-reveal-d2" data-reveal>
          {content.description}
        </p>

        <div className={`k-hero-rail k-reveal k-reveal-d3 ${hasCampaign ? '' : 'k-hero-rail-signup-only'}`} data-reveal>
          {content.heroCampaign?.isActive ? (
            <article className="k-hero-campaign k-hero-tile k-card-elevate" aria-label="Featured campaign">
              <div className="k-hero-tile-head">
                <p className="k-overline">{content.heroCampaign.label}</p>
              </div>
              <div className="k-hero-tile-body">
                <div className="k-hero-campaign-main">
                  {content.heroCampaign.image ? (
                    <div className="k-hero-campaign-thumb">
                      <Image
                        src={content.heroCampaign.image}
                        alt={`${content.heroCampaign.title} artwork`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="k-hero-campaign-body">
                    <h2 className="k-hero-campaign-title">{content.heroCampaign.title}</h2>
                    {content.heroCampaign.subtitle ? (
                      <p className="k-hero-campaign-subtitle">{content.heroCampaign.subtitle}</p>
                    ) : null}
                    <div className="k-hero-campaign-cta">
                      <a
                        href={content.heroCampaign.primaryCtaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="k-button k-button-solid"
                      >
                        {content.heroCampaign.primaryCtaLabel}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          <article className="k-hero-signup k-hero-tile k-card-elevate">
            <div className="k-hero-tile-head">
              <p className="k-signup-title">
                {content.mailingList.headline} {content.mailingList.subhead}
              </p>
            </div>
            <div className="k-hero-tile-body">
              <EmailSignupForm
                idPrefix="hero"
                placeholder={content.mailingList.placeholder}
                submitText={content.mailingList.submitText}
                layout="stacked"
              />
            </div>
          </article>
        </div>

        {content.pressStrip?.length ? (
          <div className="k-hero-press k-reveal k-reveal-d4" data-reveal>
            <p className="k-overline">As heard on</p>
            <div className="k-hero-press-row" aria-label="Press highlights">
              {content.pressStrip.map((item) => (
                <span key={item} className="k-hero-press-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function MusicSection({ content }: { content: SiteContent }) {
  return (
    <section id="music" className="k-wrap k-section k-section-first k-release-grid k-section-atmo k-section-atmo-release">
      <div className="k-release-art-wrap k-card-elevate k-reveal k-reveal-d0" data-reveal>
        <Image
          src={content.release.artwork}
          alt={`${content.release.title} artwork`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="k-release-art"
        />
      </div>

      <div className="k-release-content k-card-elevate k-reveal k-reveal-d1" data-reveal>
        <SectionHeading overline="Latest release" title={content.release.title} wave />
        <p className="k-release-meta">
          {content.release.subtitle} | {content.release.date}
        </p>
        <p className="k-copy">{content.release.description}</p>
        <div className="k-release-details">
          {content.release.details.map((detail) => (
            <p key={detail.label}>
              <span>{detail.label}</span>
              <strong>{detail.value}</strong>
            </p>
          ))}
        </div>

        <div className="k-platform-links">
          {content.release.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="k-platform-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="k-embed-wrap">
          <iframe title="Bandcamp player" src={content.bandcamp.embedUrl} className="k-bandcamp" seamless />
        </div>
      </div>
    </section>
  );
}

function SocialProofSection({ content }: { content: SiteContent['proof'] }) {
  return (
    <section className="k-wrap k-section k-proof k-section-atmo k-section-atmo-proof">
      <SectionHeading overline="Proof" title="Momentum" />
      <blockquote className="k-card-elevate k-reveal k-reveal-d0" data-reveal>
        <p>"{content.quote}"</p>
        <cite>{content.source}</cite>
      </blockquote>
      <div className="k-proof-grid">
        {content.highlights.map((highlight, index) => (
          <article
            key={highlight.label}
            className="k-card-elevate k-reveal"
            data-reveal
            style={{ transitionDelay: `${80 + index * 80}ms` }}
          >
            <p>{highlight.value}</p>
            <span>{highlight.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function GigsSection({ upcomingShows, pastShows }: { upcomingShows: Gig[]; pastShows: Gig[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="gigs" className="k-wrap k-section k-section-atmo k-section-atmo-live">
      <SectionHeading
        overline="Live"
        title="Upcoming"
        copy="Tour windows and one-off nights are announced first to the list."
        wave
      />

      {upcomingShows.length > 0 ? (
        <div className="k-gigs-upcoming-grid">
          {upcomingShows.map((show, index) => (
            <article
              key={`${show.date}-${show.venue}`}
              className={`k-show-card k-card-elevate k-reveal ${index < 3 ? 'k-show-card-featured' : ''}`}
              data-reveal
              style={{ transitionDelay: `${160 + index * 80}ms` }}
            >
              {show.status ? (
                <p className={`k-show-status ${show.status.toLowerCase().replace(/\s+/g, '-')}`}>{show.status}</p>
              ) : null}
              <p className="k-show-venue">{show.venue}</p>
              <p className="k-show-city">{show.city}</p>
              <p className="k-show-date">{formatDate(show.date)}</p>
              <a href={show.ticketsUrl ?? '#'} className="k-button k-button-solid k-ticket-button">
                Get tickets
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className="k-copy">No upcoming dates are live yet.</p>
      )}

      <div className="k-past-shows-wrap">
        <button
          type="button"
          className="k-archive-toggle"
          aria-expanded={expanded}
          aria-controls="past-shows"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Hide past shows' : 'Show past shows'}
        </button>

        <ul id="past-shows" className={`k-past-shows ${expanded ? 'k-past-shows-open' : ''}`}>
          {pastShows.map((show) => (
            <li key={`${show.date}-${show.venue}`}>
              <span>{formatDate(show.date)}</span>
              <span>{show.venue}</span>
              <span>{show.city}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onCheckout,
  isPending,
  revealDelay,
}: {
  product: Product;
  onCheckout: (product: Product) => Promise<void>;
  isPending: boolean;
  revealDelay?: number;
}) {
  const unavailable = !product.stripePriceId;

  return (
    <article className="k-product k-card-elevate k-reveal" data-reveal style={{ transitionDelay: `${revealDelay ?? 0}ms` }}>
      <div className="k-product-image-wrap">
        {unavailable ? <span className="k-unavailable-badge">Unavailable</span> : null}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 22vw, 100vw"
          className="k-product-image"
        />
      </div>

      <div className="k-product-body">
        <h3 className="k-heading-md">{product.title}</h3>
        <p className="k-price">{formatPriceFromPence(product.priceGBP)}</p>
        {product.description ? <p className="k-product-description">{product.description}</p> : null}

        {product.sizes?.length ? <p className="k-size-line">Sizes: {product.sizes.join(', ')}</p> : null}

        <div className="k-product-actions">
          {product.productUrl ? (
            <a href={product.productUrl} target="_blank" rel="noreferrer" className="k-platform-link">
              View on Bandcamp
            </a>
          ) : null}

          <button
            type="button"
            disabled={unavailable || isPending}
            onClick={() => void onCheckout(product)}
            className="k-button k-button-solid"
          >
            {unavailable ? 'Unavailable' : isPending ? 'Opening...' : 'Checkout'}
          </button>
        </div>
      </div>
    </article>
  );
}

function MerchSection({ products }: { products: Product[] }) {
  const [status, setStatus] = useState<string | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);
  const [pendingProduct, setPendingProduct] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStatus(params.get('status'));
  }, []);

  async function handleCheckout(product: Product) {
    if (!product.stripePriceId) return;

    setPendingProduct(product.slug);
    setCheckoutStatus(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: product.slug, stripePriceId: product.stripePriceId }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setCheckoutStatus(payload.error ?? 'Checkout is not available in v1.');
      } else {
        setCheckoutStatus('Checkout initialized.');
      }
    } catch {
      setCheckoutStatus('Network error. Try again.');
    } finally {
      setPendingProduct(null);
    }
  }

  return (
    <section id="merch" className="k-wrap k-section k-section-atmo k-section-atmo-store">
      <SectionHeading overline="Store" title="Merch" />

      {status ? (
        <p className="k-banner" role="status" aria-live="polite">
          {status === 'success' ? 'Checkout completed.' : 'Checkout cancelled.'}
        </p>
      ) : null}

      {checkoutStatus ? (
        <p className="k-banner" role="status" aria-live="polite">
          {checkoutStatus}
        </p>
      ) : null}

      <div className="k-merch-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            onCheckout={handleCheckout}
            isPending={pendingProduct === product.slug}
            revealDelay={160 + index * 80}
          />
        ))}
      </div>
    </section>
  );
}

function ContactSection({ emails, socials }: { emails: SiteContent['emails']; socials: Social[] }) {
  return (
    <section id="contact" className="k-wrap k-section k-contact-grid k-section-atmo k-section-atmo-contact">
      <div>
        <SectionHeading
          overline="Contact"
          title="Bookings and inquiries"
          copy="For tours, features, sync, and collaborations use the addresses below."
        />
      </div>

      <div className="k-contact-card k-card-elevate k-reveal k-reveal-d3" data-reveal>
        <div>
          <p className="k-overline">Booking / Press</p>
          <a href={`mailto:${emails.booking}`} className="k-mail-link">
            {emails.booking}
          </a>
        </div>

        {emails.management ? (
          <div>
            <p className="k-overline">Management</p>
            <a href={`mailto:${emails.management}`} className="k-mail-link">
              {emails.management}
            </a>
          </div>
        ) : null}

        <div>
          <p className="k-overline">General</p>
          <a href={`mailto:${emails.general}`} className="k-mail-link">
            {emails.general}
          </a>
        </div>

        <div className="k-social-row" aria-label="Social links">
          {socials.map((social) => (
            <a key={social.label} href={social.url} className="k-social-icon" target="_blank" rel="noreferrer" aria-label={social.label}>
              <span>{social.label.slice(0, 2).toUpperCase()}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="k-wrap k-footer">
      <div>
        <p className="k-overline">Mailing list</p>
        <h3 className="k-heading-md">Never miss a drop or ticket window</h3>
        <EmailSignupForm
          idPrefix="footer"
          placeholder={content.mailingList.placeholder}
          submitText={content.mailingList.submitText}
        />
      </div>
      <div>
        <a href="/epk" className="k-chip-link">
          Press / EPK
        </a>
        <p className="k-footer-copy">{content.footer.copyright}</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const siteContent = site as SiteContent;
  const upcomingShows = useMemo(() => gigs.upcoming as Gig[], []);
  const pastShows = useMemo(() => gigs.past as Gig[], []);
  const merchProducts = useMemo(() => merch.featured as Product[], []);
  const sortedUpcomingShows = useMemo(() => getUpcomingShows(upcomingShows), [upcomingShows]);
  const activeAnchor = useActiveAnchor();
  const progress = useScrollProgress();
  useRevealOnScroll();

  return (
    <main className="k-page">
      <SiteHeader activeAnchor={activeAnchor} progress={progress} />
      <HeroSection content={siteContent} />
      <MusicSection content={siteContent} />
      <GigsSection upcomingShows={sortedUpcomingShows} pastShows={pastShows} />
      <SocialProofSection content={siteContent.proof} />
      <MerchSection products={merchProducts} />
      <ContactSection emails={siteContent.emails} socials={siteContent.socials} />
      <Footer content={siteContent} />
    </main>
  );
}
