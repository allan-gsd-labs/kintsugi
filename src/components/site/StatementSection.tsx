type StatementSectionProps = {
  text: string;
};

export function StatementSection({ text }: StatementSectionProps) {
  return (
    <section className="section-space py-20 md:py-28">
      <p className="max-w-4xl text-3xl font-medium leading-tight md:text-5xl">
        {text}
      </p>
    </section>
  );
}
