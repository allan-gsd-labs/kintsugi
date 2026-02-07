import Image from 'next/image';

type MusicSectionProps = {
  bandcampEmbedUrl: string;
};

export function MusicSection({ bandcampEmbedUrl }: MusicSectionProps) {
  return (
    <section id="music" className="section-space">
      <h2>Music</h2>
      <p className="mt-4 text-text-muted">Latest release: Disappointed</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <div className="overflow-hidden rounded-md border border-border-subtle bg-bg-surface/40 p-4">
          <iframe
            title="Bandcamp player: Disappointed by Kintsugi"
            src={bandcampEmbedUrl}
            className="h-[442px] w-full max-w-[350px]"
            style={{ border: 0 }}
            seamless
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="relative overflow-hidden rounded-md border border-border-subtle">
            <Image
              src="/assets/images/echoes-cover-final.png"
              alt="Echoes cover artwork"
              width={900}
              height={900}
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-main/75 to-transparent" />
          </article>
          <article className="relative overflow-hidden rounded-md border border-border-subtle">
            <Image
              src="/assets/images/thorns-ep-cover.png"
              alt="Thorns EP artwork"
              width={900}
              height={900}
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-main/75 to-transparent" />
          </article>
        </div>
      </div>
    </section>
  );
}
