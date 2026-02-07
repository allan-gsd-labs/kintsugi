import Image from 'next/image';

type MusicSectionProps = {
  bandcampEmbedUrl: string;
};

export function MusicSection({ bandcampEmbedUrl }: MusicSectionProps) {
  return (
    <section id="music" className="section-panel section-space px-6 py-8 md:px-8 md:py-10">
      <h2 className="max-w-2xl">Music</h2>
      <p className="mt-4 max-w-xl text-text-muted">
        Latest single: Disappointed.
      </p>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-md border border-border-subtle bg-bg-surface/40 p-4">
          <iframe
            title="Bandcamp player: Disappointed by Kintsugi"
            src={bandcampEmbedUrl}
            className="h-[442px] w-full max-w-[350px]"
            style={{ border: 0 }}
            seamless
          />
        </div>
        <div className="space-y-6">
          <article className="relative overflow-hidden rounded-md border border-border-subtle">
            <Image
              src="/assets/images/echoes-cover-final.png"
              alt="Echoes cover artwork"
              width={900}
              height={900}
              className="h-[300px] w-full object-cover object-center opacity-65"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-main/75 to-transparent" />
          </article>
          <p className="max-w-xl text-text-muted">
            Atmospheric tension, restrained dynamics, and impact-first writing.
            Built for loud rooms and low light.
          </p>
        </div>
      </div>
    </section>
  );
}
