type MusicSectionProps = {
  bandcampEmbedUrl: string;
};

export function MusicSection({ bandcampEmbedUrl }: MusicSectionProps) {
  return (
    <section id="music" className="section-space">
      <h2>Music</h2>
      <p className="mt-4 text-text-muted">Latest release: Disappointed</p>
      <div className="mt-8 overflow-hidden rounded-md border border-border-subtle bg-bg-surface/40 p-4">
        <iframe
          title="Bandcamp player: Disappointed by Kintsugi"
          src={bandcampEmbedUrl}
          className="h-[442px] w-full max-w-[350px]"
          style={{ border: 0 }}
          seamless
        />
      </div>
    </section>
  );
}

