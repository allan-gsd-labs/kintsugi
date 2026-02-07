import Image from 'next/image';

type StatementSectionProps = {
  text: string;
};

export function StatementSection({ text }: StatementSectionProps) {
  return (
    <section className="section-space">
      <div className="relative overflow-hidden rounded-lg border border-border-subtle bg-bg-surface/40 p-8 md:p-12">
        <Image
          src="/assets/images/echoes-background.png"
          alt=""
          width={1400}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-main/90 to-bg-main/70" />
        <p className="relative z-10 max-w-3xl text-3xl font-medium leading-tight md:text-5xl">
          {text}
        </p>
      </div>
    </section>
  );
}
