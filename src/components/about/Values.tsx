const values = [
  {
    title: "Simplicity",
    description: "We make hotel operations easier to understand and manage.",
  },
  {
    title: "Efficiency",
    description: "We help hotel teams save time and organize their daily work.",
  },
  {
    title: "Innovation",
    description: "We embrace smart technology to improve hotel management.",
  },
  {
    title: "Teamwork",
    description:
      "We believe better results come from connected teams working together.",
  },
];

export function Values() {
  return (
    <section className="container-custom py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Our Values
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl text-fg-strong">
          What Guides Us
        </h2>
        <p className="mt-5 leading-7 text-fg-muted">
          The principles behind the way we build Roomora and support hotel teams.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <article
            key={value.title}
            className="rounded-2xl border border-line bg-surface-card p-6 hover:border-accent-400 transition-all"
          >
            <h3 className="text-lg font-semibold text-fg-strong">
              {value.title}
            </h3>
            <p className="mt-3 leading-7 text-fg-muted text-sm">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}