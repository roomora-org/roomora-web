
export function ContactForm() {
  const inputStyle = {
    "--tw-ring-color": "#f0dec8",
    accentColor: "#a66b42",
  } as React.CSSProperties;

  const inputClassName =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-200 focus:outline-none";

  return (
    <section className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Contact Us
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          We’re here to answer your questions. Feel free to reach out!
        </p>
      </div>

      <form
        className="rounded-3xl border border-border bg-background p-6 shadow-sm md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          alert("Thank you! Your message has been received.");
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium"
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              required
              style={inputStyle}
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
              style={inputStyle}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium"
          >
            Subject
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="What is your message about?"
            required
            style={inputStyle}
            className={inputClassName}
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium"
          >
            Your Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Write your message here..."
            required
            style={inputStyle}
            className={`${inputClassName} resize-y`}
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="rounded-lg bg-primary-700 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
}
