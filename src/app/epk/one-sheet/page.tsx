import type { Metadata } from 'next';
import site from '../../../../content/site.json';

type SiteContent = {
  headline: string;
  description: string;
  release: {
    title: string;
    subtitle: string;
    date: string;
    description: string;
  };
  proof: {
    quote: string;
    source: string;
  };
  emails: {
    booking: string;
    general: string;
  };
};

export const metadata: Metadata = {
  title: 'EPK One-Sheet',
  description: 'Print-ready one-sheet for Kintsugi.',
};

export default function EpkOneSheetPage() {
  const content = site as SiteContent;

  return (
    <main className="k-one-sheet">
      <section className="k-one-sheet-card">
        <p className="k-overline">Kintsugi | One-sheet</p>
        <h1 className="k-heading-xl">{content.headline}</h1>
        <p className="k-copy">{content.description}</p>

        <div className="k-one-sheet-grid">
          <article>
            <p className="k-overline">Current release</p>
            <h2 className="k-heading-md">{content.release.title}</h2>
            <p className="k-copy">
              {content.release.subtitle} | {content.release.date}
            </p>
            <p className="k-copy">{content.release.description}</p>
          </article>
          <article>
            <p className="k-overline">Press quote</p>
            <p className="k-copy">"{content.proof.quote}"</p>
            <p className="k-overline">{content.proof.source}</p>
          </article>
        </div>

        <div className="k-one-sheet-footer">
          <p className="k-overline">Contact</p>
          <p className="k-copy">Booking: {content.emails.booking}</p>
          <p className="k-copy">General: {content.emails.general}</p>
          <p className="k-one-sheet-note">Use browser Print and select Save as PDF.</p>
        </div>
      </section>
    </main>
  );
}
