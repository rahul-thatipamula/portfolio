import { useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Briefcase,
  Award,
  MapPin,
  Phone,
  ExternalLink,
  Globe,
  ChevronRight,
  ArrowUpRight,
  GraduationCap,
  Layers,
  Sparkles
} from "lucide-react";
import profileImage from "@/assets/profile-image.png";

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

  const education = [
    {
      id: 1,
      school: "Sreenidhi Institute of Science and Technology",
      location: "Hyderabad, India",
      degree: "B.Tech, Computer Science and Engineering — Cybersecurity",
      period: "2022 — 2026",
      gpa: "8.81 / 10.00"
    },
    {
      id: 2,
      school: "Alphores Junior College",
      location: "Karimnagar, India",
      degree: "Intermediate, MPC",
      period: "2020 — 2022",
      gpa: "97.3%"
    }
  ];

  const experiences = [
    {
      id: 1,
      position: "Systems Engineer Intern — Big Data",
      company: "Infosys",
      location: "Mysore, India",
      period: "Jan 2026 — Present",
      companyUrl: "https://www.infosys.com",
      details: [
        "Undergoing structured Big Data training at Infosys Global Education Centre, Mysore, working hands-on with Python and PySpark for large-scale distributed data processing",
        "Learning Unix shell scripting, Power BI for data visualization and dashboarding, and MongoDB for NoSQL data storage and querying in enterprise data workflows"
      ]
    },
    {
      id: 2,
      position: "Mobile Application Developer Intern & Team Lead",
      company: "Rablo",
      location: "Lucknow, India (Remote)",
      period: "Oct 2024 — Jan 2025",
      companyUrl: "https://www.rablo.in",
      details: [
        "Developed two production-ready Flutter mobile applications and integrated RESTful APIs, enabling efficient and reliable frontend-backend communication",
        "Led a team of developers, coordinated task distribution, and ensured 100% on-time delivery of both projects within deadlines",
        "Recruited and mentored three junior developers, accelerating onboarding and improving overall team productivity"
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "CAX — Unified Student Engagement Platform",
      tech: ["Flutter", "React", "Node.js", "Azure", "MongoDB"],
      period: "Aug 2024 — Present",
      status: "active",
      playstore: "https://play.google.com/store",
      bullets: [
        "Scalable cross-platform student platform enabling club, community, and society management, college event management, and peer-to-peer product exchange",
        "Developing RESTful APIs using Node.js, deployed on Microsoft Azure with MongoDB, implementing JWT-based authentication and role-based access control for secure multi-user management"
      ]
    },
    {
      id: 2,
      title: "Vortex Pay — Digital Wallet",
      tech: ["Spring Boot", "ReactJS", "PostgreSQL", "JWT", "WebSocket"],
      period: "Apr 2025 — May 2025",
      status: "completed",
      bullets: [
        "Full-stack digital wallet with UPI-style transfers, QR payments, and real-time notifications using Spring Boot, React (Vite), and PostgreSQL with ACID-compliant transactions",
        "Implemented pessimistic locking with ordered lock acquisition and retry mechanisms to handle concurrent transfers, ensuring zero data corruption under high concurrency"
      ]
    },
    {
      id: 3,
      title: "Student Bio Data Management System",
      tech: ["Java", "Java Swing", "JDBC", "Oracle Database"],
      period: "Jun 2024 — Jul 2024",
      status: "completed",
      bullets: [
        "Desktop CRUD application built with Java Swing and JDBC connected to Oracle Database, replacing manual paperwork with digitized student record management",
        "Supports add, update, search, and delete operations with comprehensive data validation and secure database connectivity"
      ]
    }
  ];

  const skills = {
    "Programming Languages": ["Java", "Dart", "JavaScript", "Python", "C"],
    "Frontend": ["HTML", "CSS", "ReactJS", "Flutter"],
    "Backend & Databases": ["Node.js", "Express.js", "Spring Boot", "MongoDB", "SQL", "Oracle", "RESTful API Design"],
    "Tools & Concepts": ["Git", "Linux", "Unix", "Postman", "PySpark", "Power BI", "Cybersecurity Fundamentals"]
  };

  const certifications = [
    {
      title: "Hackathon Winner",
      detail: "Secured 1st place for best UI design at a university-level Flutter development workshop"
    },
    {
      title: "App Publication",
      detail: "Published CAX on Google Play Store with 100+ active users across student communities"
    },
    {
      title: "Udemy Certifications",
      detail: "Flutter & Dart — The Complete Development Bootcamp | MySQL — The Complete Developer's Guide"
    },
    {
      title: "HackerRank Certified",
      detail: "Java (Basic) — core Java programming and problem solving"
    },
    {
      title: "LinkedIn Learning",
      detail: "HTML & CSS Foundations | JavaScript Essential Training"
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Fixed Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60">
        <div className="max-w-[1200px] mx-auto px-8 h-14 flex items-center justify-between">
          <a href="#" className="text-[15px] font-semibold tracking-tight text-neutral-900">
            RT
          </a>
          <div className="hidden md:flex items-center gap-8">
            {["Education", "Experience", "Projects", "Skills"].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors font-medium">
                {s}
              </a>
            ))}
            <a href="#contact" className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center justify-center px-8 pt-14">
        <div className="max-w-3xl mx-auto text-center">
          <div className="fade-up mb-8">
            <img 
              src={profileImage} 
              alt="Rahul Thatipamula" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover ring-4 ring-neutral-100 shadow-md"
            />
          </div>

          <h1 className="fade-up fade-up-delay-1 hero-title text-[3.2rem] md:text-[4.5rem] lg:text-[5.2rem] font-extrabold text-neutral-900 mb-5">
            Rahul Thatipamula
          </h1>
          
          <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-neutral-500 mb-3 font-medium">
            Full-Stack Developer & Cybersecurity Enthusiast
          </p>
          
          <p className="fade-up fade-up-delay-2 text-[15px] md:text-base text-neutral-400 mb-8 max-w-xl mx-auto leading-relaxed">
            B.Tech CSE at SNIST, Cybersecurity specialization. Systems Engineer Intern at Infosys (Big Data). 
            Ex-Flutter Developer Intern & Team Lead at Rablo.
          </p>

          <div className="fade-up fade-up-delay-3 flex flex-wrap justify-center items-center gap-4 text-[13px] text-neutral-400 mb-10">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91 9392692880</span>
            <span className="text-neutral-200">|</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> rahulthatipamula6@gmail.com</span>
            <span className="text-neutral-200">|</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Hyderabad, India</span>
          </div>
          
          <div className="fade-up fade-up-delay-4 flex flex-wrap justify-center gap-2.5">
            {[
              { href: "https://linkedin.com/in/rahul-thatipamula", icon: Linkedin, label: "LinkedIn", primary: true },
              { href: "https://github.com/rahul-thatipamula", icon: Github, label: "GitHub" },
              { href: "mailto:rahulthatipamula6@gmail.com", icon: Mail, label: "Email" },
              { href: "https://hackerrank.com/rahulthatipamula", icon: Globe, label: "HackerRank" },
            ].map(link => (
              <a 
                key={link.label}
                href={link.href} 
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  link.primary 
                    ? "bg-neutral-900 text-white hover:bg-neutral-700 shadow-sm" 
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Education ─── */}
      <section id="education" className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="fade-up mb-14">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <GraduationCap className="w-[18px] h-[18px] text-blue-600" />
              </div>
              <span className="text-[13px] font-semibold text-blue-600 uppercase tracking-widest">Education</span>
            </div>
            <h2 className="section-title text-3xl md:text-4xl font-bold text-neutral-900 mt-3">
              Academic Background
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {education.map((edu, index) => (
              <div key={edu.id} className={`fade-up fade-up-delay-${index + 1} card-lift`}>
                <div className="h-full p-7 rounded-2xl bg-white border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1.5 leading-snug">{edu.school}</h3>
                  <p className="text-blue-600 font-semibold text-[14px] mb-3">{edu.degree}</p>
                  <p className="text-[13px] text-neutral-400 flex items-center gap-1.5 mb-5">
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <span className="text-[13px] text-neutral-400 font-medium">{edu.period}</span>
                    <span className="text-[13px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                      {edu.gpa}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Experience ─── */}
      <section id="experience" className="py-24 px-8 bg-neutral-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="fade-up mb-14">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Briefcase className="w-[18px] h-[18px] text-blue-600" />
              </div>
              <span className="text-[13px] font-semibold text-blue-600 uppercase tracking-widest">Experience</span>
            </div>
            <h2 className="section-title text-3xl md:text-4xl font-bold text-neutral-900 mt-3">
              Work Experience
            </h2>
          </div>
          
          <div className="space-y-5">
            {experiences.map((exp, index) => (
              <div key={exp.id} className={`fade-up fade-up-delay-${index + 1}`}>
                <div className="p-7 rounded-2xl bg-white border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-1">{exp.position}</h3>
                      <a 
                        href={exp.companyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 font-semibold text-[14px] hover:underline"
                      >
                        {exp.company}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-0.5 flex-shrink-0">
                      <span className="text-[13px] font-semibold text-neutral-500">{exp.period}</span>
                      <span className="text-[12px] text-neutral-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-neutral-500 leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[14px]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section id="projects" className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="fade-up mb-14">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Layers className="w-[18px] h-[18px] text-blue-600" />
              </div>
              <span className="text-[13px] font-semibold text-blue-600 uppercase tracking-widest">Projects</span>
            </div>
            <h2 className="section-title text-3xl md:text-4xl font-bold text-neutral-900 mt-3">
              Featured Projects
            </h2>
          </div>
          
          <div className="space-y-5">
            {projects.map((project, index) => (
              <div key={project.id} className={`fade-up fade-up-delay-${index + 1}`}>
                <div className="p-7 rounded-2xl bg-white border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300">
                  {/* Title row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-neutral-900">{project.title}</h3>
                      {project.status === "active" && (
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-neutral-400 font-medium">{project.period}</span>
                      {project.playstore && (
                        <a 
                          href={project.playstore} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[13px] text-blue-600 font-semibold hover:underline"
                        >
                          Play Store
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tech row */}
                  <div className="flex flex-wrap gap-1.5 mb-4 mt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[12px] font-medium text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Bullet points — resume style */}
                  <ul className="space-y-2.5">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-3 text-neutral-500 leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[14px]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section id="skills" className="py-24 px-8 bg-neutral-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="fade-up mb-14">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Sparkles className="w-[18px] h-[18px] text-blue-600" />
              </div>
              <span className="text-[13px] font-semibold text-blue-600 uppercase tracking-widest">Skills</span>
            </div>
            <h2 className="section-title text-3xl md:text-4xl font-bold text-neutral-900 mt-3">
              Technical Skills
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(skills).map(([category, list], index) => (
              <div key={category} className={`fade-up fade-up-delay-${index + 1} card-lift`}>
                <div className="h-full p-7 rounded-2xl bg-white border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h3 className="text-[13px] font-semibold text-blue-600 uppercase tracking-widest mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {list.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-neutral-50 text-neutral-600 text-[13px] font-medium border border-neutral-100 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/50 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Certifications ─── */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="fade-up mb-14">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Award className="w-[18px] h-[18px] text-blue-600" />
              </div>
              <span className="text-[13px] font-semibold text-blue-600 uppercase tracking-widest">Achievements</span>
            </div>
            <h2 className="section-title text-3xl md:text-4xl font-bold text-neutral-900 mt-3">
              Certifications & Awards
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className={`fade-up fade-up-delay-${(index % 4) + 1} card-lift`}>
                <div className="h-full p-6 rounded-2xl bg-white border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h3 className="text-[15px] font-bold text-neutral-900 mb-2">{cert.title}</h3>
                  <p className="text-[13px] text-neutral-400 leading-relaxed">{cert.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer id="contact" className="py-24 px-8 bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <div className="fade-up mb-10">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Connect
            </h2>
            <p className="text-neutral-400 text-[15px] max-w-md mx-auto leading-relaxed">
              Open to new projects, opportunities, and interesting ideas. Let's build something great together.
            </p>
          </div>
          
          <div className="fade-up fade-up-delay-1 flex flex-wrap justify-center gap-3 mb-10">
            <a 
              href="mailto:rahulthatipamula6@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-full text-[13px] font-semibold hover:bg-neutral-100 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
            <a 
              href="https://linkedin.com/in/rahul-thatipamula" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full text-[13px] font-semibold hover:bg-white/20 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a 
              href="https://github.com/rahul-thatipamula" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full text-[13px] font-semibold hover:bg-white/20 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          <div className="fade-up fade-up-delay-2 flex justify-center gap-8 mb-10">
            {[
              { label: "HackerRank", href: "https://hackerrank.com/rahulthatipamula" },
              { label: "LeetCode", href: "https://leetcode.com/rahul-thatipamula-19" },
              { label: "axiviontech.com", href: "https://axiviontech.com" },
            ].map(link => (
              <a 
                key={link.label}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[13px] text-neutral-500 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="fade-up fade-up-delay-3 pt-8 border-t border-white/10">
            <p className="text-[12px] text-neutral-600">
              © 2026 Rahul Thatipamula
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;