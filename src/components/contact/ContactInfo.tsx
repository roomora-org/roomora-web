const contactDetails = [
  {
    icon: "☎",
    title: "Phone Number",
    value: "+970 123 4567",
  },
  {
    icon: "✉",
    title: "Email Address",
    value: "info@staypilot.com",
  },
  {
    icon: "◷",
    title: "Working Hours",
    value: "Sunday – Thursday, 9 AM – 5 PM",
  },
  {
    icon: "⌖",
    title: "Location",
    value: "Palestine",
  },
];

export function ContactInfo() {
  return (
    <section className="mx-auto grid max-w-3xl grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2">
      {contactDetails.map((item) => (
        <article
          key={item.title}
          className="flex min-h-28 items-center justify-center gap-3 rounded-2xl border border-[#e2c4a3] bg-[#fdfaf6] p-5 shadow-sm transition-all duration-200 hover:border-[#c0875a] hover:shadow-md"
        >
          <div className="flex-1 text-center">
            <h2 className="font-semibold text-[#6b402b]">
              {item.title}
            </h2>

            <p className="mt-2 text-sm text-[#855235]">
              {item.value}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e2c4a3] bg-[#f9f0e6] text-lg text-[#a66b42]">
            {item.icon}
          </span>
        </article>
      ))}
    </section>
  );
}