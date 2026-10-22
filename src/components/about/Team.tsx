
import { Github, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Team Member 1",
    role: "Project Manager",
    description: "Guides the project and coordinates the team.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Team Member 2",
    role: "UI/UX Designer",
    description: "Designs clear and user-friendly experiences.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Team Member 3",
    role: "Frontend Developer",
    description: "Builds responsive and interactive interfaces.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Team Member 4",
    role: "Backend Developer",
    description: "Develops the application logic and services.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Team Member 5",
    role: "Database Developer",
    description: "Organizes and manages application data.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=80",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Team Member 6",
    role: "QA Tester",
    description: "Tests features to help ensure quality and reliability.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=80",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
];

export function Team() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Meet the Team
        </p>

        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          The People Behind Roomora
        </h2>

        <p className="mt-5 leading-7 text-muted-foreground">
          Our team works together to make hotel management simpler,
          smarter, and more efficient.
        </p>
      </div>

      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="group overflow-hidden rounded-2xl border border-orange-200 bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-400 hover:shadow-xl"
          >
            <div className="overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-foreground">
                {member.name}
              </h3>

              <p className="mt-2 text-sm font-semibold text-primary">
                {member.role}
              </p>

              <p className="mt-4 min-h-12 text-sm leading-6 text-muted-foreground">
                {member.description}
              </p>

              <div className="mt-5 flex justify-center gap-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} GitHub`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 text-foreground transition-all duration-300 hover:scale-110 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  <Github size={19} />
                </a>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 text-foreground transition-all duration-300 hover:scale-110 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  <Linkedin size={19} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
