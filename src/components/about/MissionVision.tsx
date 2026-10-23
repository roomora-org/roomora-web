export function MissionVision() {
  return (
    <section className="container-custom grid gap-6 sm:gap-8 pb-16 md:grid-cols-2">
      <article className="rounded-2xl border border-line bg-surface-card p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-fg-strong">
          Our Mission
        </h2>
        <p className="mt-4 leading-7 text-fg-muted">
          To simplify hotel operations through organized tools that help
          teams save time and deliver better guest experiences.
        </p>
      </article>
      <article className="rounded-2xl border border-line bg-surface-card p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-fg-strong">
          Our Vision
        </h2>
        <p className="mt-4 leading-7 text-fg-muted">
          To make smart, efficient hotel management accessible to hotels
          of different sizes.
        </p>
      </article>
    </section>
  );
}