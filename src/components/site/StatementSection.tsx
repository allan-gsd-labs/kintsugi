type StatementSectionProps = {
  text: string;
};

export function StatementSection({ text }: StatementSectionProps) {
  return (
    <section className="section-panel section-space px-6 py-16 md:px-8 md:py-20">
      <p className="max-w-4xl text-3xl font-medium leading-tight md:text-5xl">
        {text}
      </p>
    </section>
  );
}
