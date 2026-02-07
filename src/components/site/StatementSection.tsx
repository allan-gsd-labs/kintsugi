type StatementSectionProps = {
  text: string;
};

export function StatementSection({ text }: StatementSectionProps) {
  return (
    <section className="section-panel texture-soft section-space px-6 py-16 md:px-8 md:py-20">
      <p className="max-w-4xl text-[clamp(2.4rem,5.2vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.025em]">
        {text}
      </p>
    </section>
  );
}
