type Gig = {
  id: string;
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  notes?: string;
};

type GigsSectionProps = {
  nextShow: Gig | null;
  pastShows: Gig[];
};

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00`));

export function GigsSection({ nextShow, pastShows }: GigsSectionProps) {
  return (
    <section
      id="gigs"
      className="section-panel texture-soft section-space px-6 py-8 md:px-8 md:py-10"
    >
      <p className="section-eyebrow">Live</p>
      <h2 className="section-heading">Gigs</h2>
      <div className="panel-divider" />
      <div className="mt-8 rounded-md border border-border-subtle bg-bg-surface/40 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
          Next Show
        </p>
        {nextShow ? (
          <div className="mt-4 space-y-2">
            <p className="text-xl font-medium">{nextShow.venue}</p>
            <p className="text-text-muted">
              {nextShow.city} - {formatDate(nextShow.date)}
            </p>
            {nextShow.ticketUrl ? (
              <a href={nextShow.ticketUrl} className="btn-primary mt-3">
                Get tickets
              </a>
            ) : null}
            {nextShow.notes ? (
              <p className="text-sm text-text-muted">{nextShow.notes}</p>
            ) : null}
          </div>
        ) : (
          <p className="mt-4 text-text-muted">No upcoming shows announced.</p>
        )}
      </div>
      <details className="mt-6 rounded-md border border-border-subtle bg-bg-surface/20 p-6">
        <summary className="cursor-pointer text-sm uppercase tracking-[0.18em] text-text-muted">
          Past Shows
        </summary>
        <ul className="mt-4 space-y-3">
          {pastShows.map((show) => (
            <li key={show.id} className="text-sm text-text-muted">
              {formatDate(show.date)} - {show.venue}, {show.city}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
