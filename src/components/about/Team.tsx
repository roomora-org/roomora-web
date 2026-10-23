import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Team() {
  return (
    <section className="container-custom py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Meet the Team
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl text-fg-strong">
          The People Behind Roomora
        </h2>
        <p className="mt-5 leading-7 text-fg-muted">
          Our team works together to make hotel management simpler,
          smarter, and more efficient.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {teamMembers.map((member) => (
          <motion.article
            key={member.name}
            variants={itemVariants}
            className="group flex flex-col items-center text-center rounded-2xl border border-line bg-surface-card p-6 sm:p-8 shadow-sm hover:-translate-y-2 hover:border-accent-400 hover:shadow-xl transition-all duration-300"
          >
            {/* Circular Image */}
            <div className="relative mb-5">
              <div className="absolute inset-0 rounded-full bg-accent-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover ring-4 ring-surface-card shadow-lg group-hover:ring-accent-400 transition-all duration-300"
              />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-fg-strong">
              {member.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-brand">
              {member.role}
            </p>
            <p className="mt-3 text-sm leading-6 text-fg-muted max-w-xs">
              {member.description}
            </p>

            {/* Social Buttons */}
            <div className="mt-5 flex gap-3">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} GitHub`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-chip text-fg-muted hover:bg-primary-900 hover:text-primary-50 hover:scale-110 transition-all duration-300"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-chip text-fg-muted hover:bg-[#0A66C2] hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}