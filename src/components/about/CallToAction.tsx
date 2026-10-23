
import { Link } from "react-router-dom";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-12">
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to Simplify Your Hotel Operations?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 opacity-90">
          Discover how Roomora can help your team manage rooms,
          reservations, and daily tasks more efficiently.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-background px-6 py-3 font-semibold text-foreground transition-opacity hover:opacity-90"
        >
          Explore Roomora
        </Link>
      </div>
    </section>
  );
}
