type StatementSectionProps = {
  text: string;
};

export function StatementSection({ text }: StatementSectionProps) {
  return (
    <section className="section-space">
      <p className="max-w-3xl text-3xl font-medium leading-tight md:text-5xl">
        {text}
      </p>
    </section>
  );
}

