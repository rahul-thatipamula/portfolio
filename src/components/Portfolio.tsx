import { useEffect, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Globe,
  ArrowUpRight,
  Download,
} from "lucide-react";
import profileImage from "@/assets/profile-image.png";

/* ────────────────────────────────────────────
   Data
──────────────────────────────────────────── */

const education = [
  {
    id: 1,
    school: "Sreenidhi Institute of Science and Technology",
    location: "Hyderabad, India",
    degree: "B.Tech, Computer Science and Engineering — Cybersecurity",
    period: "2022 — 2026",
    gpa: "8.81 / 10.00",
  },
  {
    id: 2,
    school: "Alphores Junior College",
    location: "Karimnagar, India",
    degree: "Intermediate, MPC",
    period: "2020 — 2022",
    gpa: "97.3%",
  },
];

const experiences = [
  {
    id: 1,
    position: "Systems Engineer Intern — Big Data",
    company: "Infosys",
    location: "Mysore, India",
    period: "Jan 2026 — May 2026",
    companyUrl: "https://www.infosys.com",
    current: false,
    details: [
      "Completed structured Big Data training at Infosys Global Education Centre, Mysore, working hands-on with Python and PySpark for large-scale distributed data processing",
      "Trained in Unix shell scripting, Power BI for data visualization and dashboarding, and MongoDB for NoSQL data storage and querying in enterprise data workflows",
    ],
  },
  {
    id: 2,
    position: "Mobile Application Developer Intern & Team Lead",
    company: "Rablo",
    location: "Lucknow, India (Remote)",
    period: "Oct 2024 — Jan 2025",
    companyUrl: "https://www.rablo.in",
    current: false,
    details: [
      "Developed two production-ready Flutter mobile applications and integrated RESTful APIs, enabling efficient and reliable frontend-backend communication",
      "Led a team of developers, coordinated task distribution, and ensured 100% on-time delivery of both projects within deadlines",
      "Recruited and mentored three junior developers, accelerating onboarding and improving overall team productivity",
    ],
  },
];

const projects = [
  {
    id: 1,
    title: "CAX",
    subtitle: "Unified Student Engagement Platform",
    tech: ["Flutter", "React", "Node.js", "Azure", "MongoDB"],
    period: "Aug 2024 — Present",
    status: "active",
    playstore: "https://play.google.com/store/apps/details?id=com.axiviontech.cax",
    bullets: [
      "Scalable cross-platform student platform enabling club, community, and society management, college event management, and peer-to-peer product exchange",
      "Developing RESTful APIs using Node.js, deployed on Microsoft Azure with MongoDB, implementing JWT-based authentication and role-based access control for secure multi-user management",
    ],
  },
  {
    id: 2,
    title: "Vortex Pay",
    subtitle: "Digital Wallet",
    tech: ["Spring Boot", "ReactJS", "PostgreSQL", "JWT", "WebSocket"],
    period: "Apr 2025 — May 2025",
    status: "completed",
    bullets: [
      "Full-stack digital wallet with UPI-style transfers, QR payments, and real-time notifications using Spring Boot, React (Vite), and PostgreSQL with ACID-compliant transactions",
      "Implemented pessimistic locking with ordered lock acquisition and retry mechanisms to handle concurrent transfers, ensuring zero data corruption under high concurrency",
    ],
  },
  {
    id: 3,
    title: "Student Bio Data",
    subtitle: "Record Management System",
    tech: ["Java", "Java Swing", "JDBC", "Oracle Database"],
    period: "Jun 2024 — Jul 2024",
    status: "completed",
    bullets: [
      "Desktop CRUD application built with Java Swing and JDBC connected to Oracle Database, replacing manual paperwork with digitized student record management",
      "Supports add, update, search, and delete operations with comprehensive data validation and secure database connectivity",
    ],
  },
];

const skills = {
  "Programming Languages": ["Java", "Dart", "JavaScript", "Python", "C"],
  Frontend: ["HTML", "CSS", "ReactJS", "Flutter"],
  "Backend & Databases": [
    "Node.js",
    "Express.js",
    "Spring Boot",
    "MongoDB",
    "SQL",
    "Oracle",
    "RESTful API Design",
  ],
  "Tools & Concepts": [
    "Git",
    "Linux",
    "Unix",
    "Postman",
    "PySpark",
    "Power BI",
    "Cybersecurity Fundamentals",
  ],
};

const certifications = [
  {
    title: "Hackathon Winner",
    detail:
      "Secured 1st place for best UI design at a university-level Flutter development workshop",
  },
  {
    title: "App Publication",
    detail:
      "Published CAX on Google Play Store with 100+ active users across student communities",
  },
  {
    title: "Udemy Certifications",
    detail:
      "Flutter & Dart — The Complete Development Bootcamp | MySQL — The Complete Developer's Guide",
  },
  {
    title: "HackerRank Certified",
    detail: "Java (Basic) — core Java programming and problem solving",
  },
  {
    title: "LinkedIn Learning",
    detail: "HTML & CSS Foundations | JavaScript Essential Training",
  },
];

const navSections = ["Education", "Experience", "Projects", "Skills"];

/* ────────────────────────────────────────────
   Section header
──────────────────────────────────────────── */

const SectionHeader = ({
  index,
  label,
  title,
  titleAccent,
}: {
  index: string;
  label: string;
  title: string;
  titleAccent?: string;
}) => (
  <div className="fade-up mb-16">
    <div className="flex items-center gap-4 mb-5">
      <span className="font-mono-label text-[12px] text-amber-400/90 tracking-[0.2em]">
        {index}
      </span>
      <div className="h-px w-12 bg-gradient-to-r from-amber-400/50 to-transparent" />
      <span className="font-mono-label text-[12px] uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </span>
    </div>
    <h2 className="section-title text-4xl md:text-5xl font-bold text-zinc-100">
      {title}{" "}
      {titleAccent && (
        <span className="font-serif-display italic font-normal text-amber-300/90">
          {titleAccent}
        </span>
      )}
    </h2>
  </div>
);

/* ────────────────────────────────────────────
   Portfolio
──────────────────────────────────────────── */

const Portfolio = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      observerRef.current?.observe(el);
    });
  }, []);

  useEffect(() => {
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  return (
    <div className="grain relative min-h-screen bg-[#0a0a0d] text-zinc-300 overflow-x-hidden">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0d]/75 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-mono-label text-[14px] font-medium text-zinc-100 tracking-tight"
          >
            rahul<span className="text-amber-400">.</span>t
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navSections.map((s, i) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="group flex items-baseline gap-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-100 transition-colors duration-300"
              >
                <span className="font-mono-label text-[10px] text-amber-400/60 group-hover:text-amber-400 transition-colors">
                  0{i + 1}
                </span>
                {s}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 text-zinc-900 text-[13px] font-semibold hover:bg-amber-300 transition-colors duration-300"
          >
            Contact
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="hero-glow relative min-h-screen flex items-center px-6 md:px-8 pt-16">
        <div className="max-w-[1120px] mx-auto w-full grid lg:grid-cols-[1fr_auto] items-center gap-14 py-20">
          <div>
           
            <p className="fade-up fade-up-delay-1 font-mono-label text-[13px] text-zinc-500 tracking-[0.2em] uppercase mb-6">
              Full-Stack Developer · Cybersecurity
            </p>

            <h1 className="fade-up fade-up-delay-1 hero-title text-[3.4rem] md:text-[5rem] lg:text-[5.6rem] font-bold text-zinc-50 mb-8">
              Rahul
              <br />
              <span className="font-serif-display italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">
                Thatipamula
              </span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-[16px] md:text-lg text-zinc-400 max-w-xl leading-relaxed mb-10">
              B.Tech CSE at SNIST with a Cybersecurity specialization.
              Completed a Systems Engineer Internship at{" "}
              <span className="text-zinc-200 font-medium">Infosys</span> (Big
              Data). Previously Flutter Developer Intern &amp; Team Lead at{" "}
              <span className="text-zinc-200 font-medium">Rablo</span> — I
              build secure, scalable software end to end.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-wrap items-center gap-3 mb-10">
              <a
                href="mailto:rahulthatipamula6@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-300 text-zinc-900 text-[14px] font-semibold hover:bg-amber-200 hover:shadow-[0_0_32px_-6px_rgba(251,191,36,0.5)] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-zinc-300 text-[14px] font-semibold hover:border-white/25 hover:text-zinc-100 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Résumé
              </a>
              <div className="flex items-center gap-1 ml-1">
                {[
                  {
                    href: "https://linkedin.com/in/rahul-thatipamula",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://github.com/rahul-thatipamula",
                    icon: Github,
                    label: "GitHub",
                  },
                  {
                    href: "https://hackerrank.com/rahulthatipamula",
                    icon: Globe,
                    label: "HackerRank",
                  },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-zinc-500 hover:text-amber-300 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <link.icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="fade-up fade-up-delay-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-label text-[12px] text-zinc-600">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Hyderabad, India
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> +91 9392692880
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> rahulthatipamula6@gmail.com
              </span>
            </div>
          </div>

          {/* Portrait */}
          <div className="fade-up fade-up-delay-2 hidden lg:block">
            <div className="profile-ring p-[2px] rounded-[2rem] rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src={profileImage}
                alt="Rahul Thatipamula"
                className="w-[300px] h-[360px] object-cover rounded-[calc(2rem-2px)] saturate-[0.9] contrast-[1.05]"
              />
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
        </div>
      </section>

      {/* ─── Education ─── */}
      <section id="education" className="relative py-28 px-6 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader
            index="01"
            label="Education"
            title="Academic"
            titleAccent="background"
          />

          <div className="grid md:grid-cols-2 gap-5">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`fade-up fade-up-delay-${index + 1} card-surface h-full p-8 rounded-3xl`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-zinc-100 leading-snug">
                    {edu.school}
                  </h3>
                  <span className="font-mono-label shrink-0 text-[12px] font-medium text-amber-300 bg-amber-400/10 border border-amber-400/15 px-3 py-1 rounded-lg">
                    {edu.gpa}
                  </span>
                </div>
                <p className="text-[15px] text-zinc-400 mb-6 leading-relaxed">
                  {edu.degree}
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-white/[0.06] font-mono-label text-[12px] text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </span>
                  <span>{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Experience ─── */}
      <section id="experience" className="relative py-28 px-6 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader
            index="02"
            label="Experience"
            title="Where I've"
            titleAccent="worked"
          />

          <div className="relative pl-8 md:pl-12">
            {/* timeline spine */}
            <div className="absolute left-[5px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-400/40 via-white/10 to-transparent" />

            <div className="space-y-14">
              {experiences.map((exp, index) => (
                <div key={exp.id} className={`fade-up fade-up-delay-${index + 1} relative`}>
                  {/* dot */}
                  <span
                    className={`timeline-dot absolute -left-8 md:-left-12 top-2 w-[11px] h-[11px] rounded-full ${
                      exp.current ? "bg-amber-400" : "bg-zinc-600"
                    }`}
                  />

                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-100 mb-1.5">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-3">
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-sweep inline-flex items-center gap-1 text-amber-300 font-semibold text-[15px]"
                        >
                          {exp.company}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        {exp.current && (
                          <span className="font-mono-label text-[10px] uppercase tracking-[0.15em] text-emerald-300 bg-emerald-400/10 border border-emerald-400/15 px-2.5 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="font-mono-label text-[12px] text-zinc-500 flex flex-col md:items-end gap-1 shrink-0">
                      <span>{exp.period}</span>
                      <span className="flex items-center gap-1.5 text-zinc-600">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 max-w-3xl">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3.5 leading-relaxed">
                        <span className="mt-[11px] w-1 h-1 rounded-full bg-amber-400/60 shrink-0" />
                        <span className="text-[15px] text-zinc-400">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section id="projects" className="relative py-28 px-6 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader
            index="03"
            label="Projects"
            title="Selected"
            titleAccent="work"
          />

          <div className="space-y-5">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`fade-up fade-up-delay-${index + 1} card-surface group p-8 md:p-10 rounded-3xl`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-bold text-zinc-100">
                        {project.title}
                      </h3>
                      {project.status === "active" && (
                        <span className="font-mono-label text-[10px] uppercase tracking-[0.15em] text-emerald-300 bg-emerald-400/10 border border-emerald-400/15 px-2.5 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="font-serif-display italic text-lg text-zinc-500">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono-label text-[12px] text-zinc-500">
                      {project.period}
                    </span>
                    {project.playstore && (
                      <a
                        href={project.playstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-sweep inline-flex items-center gap-1.5 text-[13px] text-amber-300 font-semibold"
                      >
                        Play Store
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-7 max-w-3xl">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3.5 leading-relaxed">
                      <span className="mt-[11px] w-1 h-1 rounded-full bg-amber-400/60 shrink-0" />
                      <span className="text-[15px] text-zinc-400">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono-label text-[11px] text-zinc-400 border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 rounded-lg group-hover:border-white/[0.14] transition-colors duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section id="skills" className="relative py-28 px-6 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader
            index="04"
            label="Skills"
            title="Technical"
            titleAccent="toolkit"
          />

          <div className="fade-up divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {Object.entries(skills).map(([category, list]) => (
              <div
                key={category}
                className="grid md:grid-cols-[280px_1fr] gap-4 md:gap-10 py-8 items-baseline"
              >
                <h3 className="font-mono-label text-[12px] uppercase tracking-[0.2em] text-zinc-500">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-300 text-[13px] font-medium hover:border-amber-400/30 hover:text-amber-200 hover:bg-amber-400/[0.05] transition-colors duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Certifications ─── */}
      <section className="relative py-28 px-6 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader
            index="05"
            label="Achievements"
            title="Certifications &"
            titleAccent="awards"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className={`fade-up fade-up-delay-${(index % 4) + 1} card-surface h-full p-7 rounded-3xl`}
              >
                <span className="font-mono-label text-[11px] text-amber-400/70 block mb-4">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-bold text-zinc-100 mb-2.5">
                  {cert.title}
                </h3>
                <p className="text-[13.5px] text-zinc-500 leading-relaxed">
                  {cert.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer / Contact ─── */}
      <footer
        id="contact"
        className="relative py-32 px-6 md:px-8 border-t border-white/[0.06] overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 100%, rgba(251,191,36,0.06), transparent 70%)",
          }}
        />
        <div className="max-w-[1120px] mx-auto relative">
          <div className="fade-up text-center mb-14">
            <p className="font-mono-label text-[12px] uppercase tracking-[0.25em] text-zinc-500 mb-6">
              What's next
            </p>
            <h2 className="section-title text-5xl md:text-7xl font-bold text-zinc-50 mb-7">
              Let's build something{" "}
              <span className="font-serif-display italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                great
              </span>
            </h2>
            <p className="text-zinc-500 text-[15px] md:text-base max-w-md mx-auto leading-relaxed">
              Open to new projects, opportunities, and interesting ideas —
              my inbox is always open.
            </p>
          </div>

          <div className="fade-up fade-up-delay-1 flex flex-wrap justify-center gap-3 mb-16">
            <a
              href="mailto:rahulthatipamula6@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-300 text-zinc-900 text-[14px] font-semibold hover:bg-amber-200 hover:shadow-[0_0_36px_-6px_rgba(251,191,36,0.5)] transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              rahulthatipamula6@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/rahul-thatipamula"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-zinc-300 text-[14px] font-semibold hover:border-white/25 hover:text-zinc-100 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/rahul-thatipamula"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-zinc-300 text-[14px] font-semibold hover:border-white/25 hover:text-zinc-100 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          <div className="fade-up fade-up-delay-2 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/[0.06]">
            <span className="font-mono-label text-[12px] text-zinc-600">
              © 2026 Rahul Thatipamula — Hyderabad, India
            </span>
            <div className="flex items-center gap-7">
              {[
                {
                  label: "HackerRank",
                  href: "https://hackerrank.com/rahulthatipamula",
                },
                {
                  label: "LeetCode",
                  href: "https://leetcode.com/rahul-thatipamula-19",
                },
                { label: "axiviontech.com", href: "https://axiviontech.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-label text-[12px] text-zinc-600 hover:text-amber-300 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
