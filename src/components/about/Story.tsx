

export function Story() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            About Roomora
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Our Story
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Roomora was created to make hotel management simpler and more
            organized. We bring essential hotel operations together in one
            place, helping teams manage rooms, reservations, and daily tasks
            more efficiently.
          </p>

          <p className="mt-4 leading-7 text-muted-foreground">
            Our goal is to help hotel teams spend less time managing
            operations and more time creating better guest experiences.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
            alt="Modern hotel with a swimming pool"
            className="h-72 w-full object-cover md:h-96"
          />
        </div>
      </div>
    </section>
  );
}

