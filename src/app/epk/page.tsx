import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import site from '../../../content/site.json';
import gigs from '../../../content/gigs.json';

type Social = {
  label: string;
  url: string;
};

type SiteContent = {
  headline: string;
  description: string;
  heroCampaign?: {
    title: string;
    subtitle?: string;
    image?: string;
    primaryCtaLabel: string;
    primaryCtaUrl: string;
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
  emails: {
    booking: string;
    general: string;
    management?: string;
  };
  socials: Social[];
};

type Gig = {
  date: string;
  venue: string;
  city: string;
};

function formatDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export const metadata: Metadata = {
  title: 'EPK',
  description: 'Electronic press kit for Kintsugi: bio, release highlights, live history, and contact details.',
};

export default function EpkPage() {
  const content = site as SiteContent;
  const upcoming = (gigs.upcoming as Gig[]).slice(0, 3);

  return (
    <main className="k-page">
      <header className="k-site-header">
        <div className="k-wrap k-epk-header-row">
          <Link href="/" className="k-chip-link">
            Back to site
          </Link>
          <nav className="k-epk-nav" aria-label="EPK sections">
            <a href="#overview" className="k-nav-link">
              Overview
            </a>
            <a href="#assets" className="k-nav-link">
              Assets
            </a>
            <a href="#contacts" className="k-nav-link">
              Contacts
            </a>
          </nav>
        </div>
      </header>

      <section id="overview" className="k-wrap k-section k-section-first k-epk-grid">
        <article className="k-epk-side">
          <p className="k-overline">Electronic Press Kit</p>
          <h1 className="k-heading-xl">{content.headline}</h1>
          <p className="k-copy k-max-copy">{content.description}</p>

          <div className="k-fact-grid">
            {content.proof.highlights.map((highlight) => (
              <article key={highlight.label} className="k-fact-card">
                <p className="k-fact-value">{highlight.value}</p>
                <p className="k-fact-label">{highlight.label}</p>
              </article>
            ))}
          </div>

          <blockquote className="k-epk-quote">
            <p>"{content.proof.quote}"</p>
            <cite>{content.proof.source}</cite>
          </blockquote>
        </article>

        <aside className="k-epk-side">
          <p className="k-overline">Current campaign</p>
          <h2 className="k-heading-md">{content.heroCampaign?.title ?? content.release.title}</h2>
          <p className="k-copy">{content.heroCampaign?.subtitle ?? `${content.release.subtitle} | ${content.release.date}`}</p>

          <div className="k-chip-row">
            <a href={content.heroCampaign?.primaryCtaUrl ?? content.release.links[0]?.url} className="k-button k-button-solid">
              {content.heroCampaign?.primaryCtaLabel ?? 'Listen now'}
            </a>
            <a href="#assets" className="k-chip-link">
              Press assets
            </a>
          </div>

          <ul className="k-list">
            {upcoming.map((show) => (
              <li key={`${show.date}-${show.venue}`}>
                <span>{formatDate(show.date)}</span>
                <span>
                  {show.venue}, {show.city}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section id="assets" className="k-wrap k-section k-epk-grid">
        <div className="k-release-art-wrap">
          <Image
            src={content.release.artwork}
            alt={`${content.release.title} artwork`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="k-release-art"
          />
        </div>

        <article className="k-epk-side">
          <p className="k-overline">Release details</p>
          <h2 className="k-heading-xl">{content.release.title}</h2>
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

          <div className="k-chip-row">
            {content.release.links.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="k-platform-link">
                {link.label}
              </a>
            ))}
            <a href="/assets/main1-v2.jpg" download className="k-chip-link">
              Download press photo
            </a>
            <a href="/assets/epk-fading-echoes.jpg" download className="k-chip-link">
              Download artwork
            </a>
            <a href="/epk/one-sheet" target="_blank" rel="noreferrer" className="k-chip-link">
              Open one-sheet (PDF print)
            </a>
          </div>
        </article>
      </section>

      <section className="k-wrap k-section k-epk-toolkit">
        <article className="k-contact-card">
          <p className="k-overline">Press toolkit</p>
          <h2 className="k-heading-md">Ready-to-send assets</h2>
          <p className="k-copy">Open the one-sheet in a new tab and use browser print to save as PDF.</p>
          <div className="k-chip-row">
            <a href="/epk/one-sheet" target="_blank" rel="noreferrer" className="k-button k-button-solid">
              One-sheet
            </a>
            <a href="/assets/main1-v2.jpg" download className="k-chip-link">
              Press photo
            </a>
            <a href="/assets/white-transparent-v2.png" download className="k-chip-link">
              Logo PNG
            </a>
          </div>
        </article>
      </section>

      <section id="contacts" className="k-wrap k-section k-contact-grid">
        <article className="k-contact-card">
          <p className="k-overline">Booking / Press</p>
          <a href={`mailto:${content.emails.booking}`} className="k-mail-link">
            {content.emails.booking}
          </a>

          {content.emails.management ? (
            <>
              <p className="k-overline k-epk-contact-label">Management</p>
              <a href={`mailto:${content.emails.management}`} className="k-mail-link">
                {content.emails.management}
              </a>
            </>
          ) : null}

          <p className="k-overline k-epk-contact-label">General</p>
          <a href={`mailto:${content.emails.general}`} className="k-mail-link">
            {content.emails.general}
          </a>
        </article>

        <article className="k-contact-card">
          <p className="k-overline">Official channels</p>
          <div className="k-chip-row">
            {content.socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="k-chip-link">
                {social.label}
              </a>
            ))}
          </div>

          <div className="k-press-pack">
            <p className="k-overline">Press requests</p>
            <p className="k-copy">For high-res assets, one-sheet, and interview availability, use booking contact above.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
