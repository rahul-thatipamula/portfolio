import { useEffect, useState, type ComponentType } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ArrowRight,
  Download,
  Sparkles,
  Server,
  Smartphone,
  ShieldCheck,
  Sun,
  Moon,
  GraduationCap,
  Award,
  Lock,
  CornerDownLeft,
} from "lucide-react";
import profileImage from "@/assets/profile-image.png";

/* ────────────────────────────────────────────
   Data
──────────────────────────────────────────── */

const EMAIL = "rahulthatipamula6@gmail.com";
const PHONE = "+91 93926 92880";

const links = {
  github: "https://github.com/rahul-thatipamula",
  linkedin: "https://linkedin.com/in/rahul-thatipamula",
  leetcode: "https://leetcode.com/rahul-thatipamula-19",
  hackerrank: "https://hackerrank.com/rahulthatipamula",
  resume: "/resume.pdf",
};

const stats = [
  { value: "100+", label: "users on CAX, live on the Play Store" },
  { value: "2", label: "industry internships: Infosys & Rablo" },
  { value: "8", label: "projects on this page, from AI agents to payments" },
  { value: "8.79", label: "CGPA, B.Tech CSE (Cybersecurity)" },
];

type Tone = "brand" | "ai" | "live" | "warm";

const toneText: Record<Tone, string> = {
  brand: "text-brand",
  ai: "text-ai",
  live: "text-live",
  warm: "text-warm",
};

const toneChip: Record<Tone, string> = {
  brand: "text-brand bg-brand/10 border-brand/20",
  ai: "text-ai bg-ai/10 border-ai/20",
  live: "text-live bg-live/10 border-live/20",
  warm: "text-warm bg-warm/10 border-warm/20",
};

const capabilities: {
  icon: ComponentType<{ className?: string }>;
  tone: Tone;
  title: string;
  body: string;
  proof: string;
}[] = [
  {
    icon: Sparkles,
    tone: "ai",
    title: "AI & LLM systems",
    body: "RAG pipelines, tool-using agents and evaluation. I care about whether the model's answer is actually supported by the source, not just whether it sounds right.",
    proof: "PharmaDocs · APK Malware Analyzer",
  },
  {
    icon: Server,
    tone: "brand",
    title: "Backend & data",
    body: "APIs, relational schemas and data pipelines in Java/Spring Boot and Python. Transactions, concurrency, idempotent ingestion and data-quality checks.",
    proof: "Vortex Pay · Infosys Big Data",
  },
  {
    icon: Smartphone,
    tone: "live",
    title: "Mobile & product",
    body: "Cross-platform apps in Flutter, from auth to Play Store release. I've shipped to real users and led a small team through delivery.",
    proof: "CAX · Rablo",
  },
  {
    icon: ShieldCheck,
    tone: "warm",
    title: "Security by default",
    body: "My degree is in cybersecurity, so it shows up in the code: hashed credentials, JWT auth, parameterised queries, row locking and least-privilege database roles.",
    proof: "Vortex Pay · Hami",
  },
];

type Project = {
  id: string;
  title: string;
  kind: string;
  tone: Tone;
  status?: string;
  period: string;
  pitch: string;
  bullets: string[];
  tech: string[];
  links?: { label: string; href: string }[];
  note?: string;
};

const featured = {
  title: "PharmaDocs",
  kind: "AI · RAG agent",
  period: "Sep 2026 · Latest",
  pitch:
    "Ask a question about a medicine and get an answer grounded in the official FDA drug label, with a citation on every claim. If the answer can't be backed by the source, the system says so instead of guessing.",
  bullets: [
    "ETL from the openFDA drug-label API into PostgreSQL: raw payloads kept untouched in staging tables, cleaned and chunked, then embedded into pgvector with an HNSW cosine index.",
    "LangGraph agent that routes, retrieves, answers with SQL-backed tools, then runs a separate verifier model. Claims the source doesn't support trigger a query rewrite and a retry, up to two attempts.",
    "Seven reconciliation checks per ingest run (row counts, duplicates, nulls, orphans, oversize chunks), stored as queryable rows tied to a run ID instead of scattered in logs.",
    "Evaluation harness of 50 labelled questions measuring hit@5, MRR, latency and LLM-judged faithfulness, plus offline unit tests for chunking, parsing and graph routing.",
  ],
  tech: ["Python", "LangGraph", "OpenAI SDK", "PostgreSQL + pgvector", "FastAPI", "fastembed", "pytest"],
};

const pipeline = [
  { step: "Extract", detail: "openFDA labels" },
  { step: "Stage → Clean", detail: "chunk + dedupe" },
  { step: "Embed", detail: "pgvector · HNSW" },
  { step: "Agent", detail: "route → retrieve → answer" },
  { step: "Verify", detail: "cited or retry", loop: true },
];

const projects: Project[] = [
  {
    id: "cax",
    title: "CAX",
    kind: "Mobile · Full-stack",
    tone: "live",
    status: "Live",
    period: "Aug 2024 — Present",
    pitch:
      "A student engagement platform where clubs run their events and students discover them, replacing the college WhatsApp-group chaos.",
    bullets: [
      "Owned the product end to end: system design, Flutter app, Spring Boot API, MongoDB data model, AWS deployment and Play Store release.",
      "Restricted sign-up to verified college email addresses, so every account belongs to a real student.",
      "Released on Google Play and grew to 100+ users across student communities.",
    ],
    tech: ["Flutter", "Spring Boot", "MongoDB", "AWS"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.axiviontech.cax" },
      { label: "caxone.in", href: "https://caxone.in" },
    ],
  },
  {
    id: "vortex",
    title: "Vortex Pay",
    kind: "Backend · Payments",
    tone: "brand",
    period: "Apr 2025 — May 2025",
    pitch:
      "A digital wallet with UPI-style IDs, QR payments and instant transfers. The hard part is keeping money correct when many transfers hit the same account at once.",
    bullets: [
      "Wrapped every transfer in an ACID transaction in PostgreSQL, with pessimistic row locks acquired in a fixed order to rule out deadlocks.",
      "Added retries with exponential backoff, so a contended transfer either completes or fails cleanly without ever corrupting a balance.",
      "Secured the API with Spring Security, BCrypt-hashed passwords and stateless JWT auth.",
    ],
    tech: ["Java 21", "Spring Boot", "PostgreSQL", "Spring Security", "JWT", "React"],
  },
  {
    id: "apk",
    title: "APK Malware Analyzer",
    kind: "AI · Security",
    tone: "ai",
    period: "Mar 2026",
    pitch:
      "Upload an Android app and find out whether it is likely malicious, and why. The verdict comes with the features that drove it.",
    bullets: [
      "Extracts static features from the APK and classifies it with a gradient-boosted (XGBoost) model trained on a labelled malware dataset.",
      "Explains each prediction with SHAP feature attributions, so an analyst can see which signals pushed the verdict.",
      "Served through a FastAPI backend with a React front end for uploads and reports.",
    ],
    tech: ["Python", "XGBoost", "SHAP", "FastAPI", "React"],
  },
  {
    id: "hami",
    title: "Hami",
    kind: "AI · Civic tech",
    tone: "warm",
    status: "In progress",
    period: "Sep 2026 — Present",
    pitch:
      "A civic accountability platform for Telangana that puts each manifesto promise next to what official government records say was delivered. Evidence, not verdicts.",
    bullets: [
      "Two-person team build: public site, reviewer app, Express API and an ingestion worker over managed Postgres (Neon).",
      "A local LLM (Qwen3 via Ollama) extracts structured findings from official PDFs, and nothing goes public without sign-off from two human reviewers.",
      "Least-privilege database roles for the public API, reviewers and worker, with a hash-chained audit trail.",
    ],
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Ollama", "Neon"],
  },
];

const smallBuilds = [
  {
    title: "Rubric CLI",
    body: "Terminal client that lets coding agents pull their task list, report results and ask questions. JSON output on every command, and scoped CI sessions.",
    tech: "CLI · macOS & Linux",
    href: "https://github.com/rahul-thatipamula/rubric-cli",
  },
  {
    title: "QuotaBar",
    body: "macOS menu-bar app that tracks AI API spend and token usage across OpenAI, Anthropic and Gemini, with alerts before you hit a limit.",
    tech: "Python · macOS",
    href: "https://github.com/rahul-thatipamula/quotabar",
  },
  {
    title: "Student Bio Data System",
    body: "Java CLI on JDBC and PostgreSQL with a layered Model–DAO–Service design and parameterised queries against SQL injection.",
    tech: "Java · JDBC · PostgreSQL",
    href: "https://github.com/rahul-thatipamula/student-biodata-system",
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
    summary: "Enterprise big-data training at the Infosys Global Education Centre.",
    details: [
      "Processed large datasets in a distributed environment with Python and PySpark.",
      "Built interactive Power BI dashboards, and used MongoDB for NoSQL storage and querying in enterprise data workflows.",
      "Worked with Unix shell scripting for data handling tasks.",
    ],
    tech: ["PySpark", "Python", "Power BI", "MongoDB", "Unix"],
  },
  {
    id: 2,
    position: "Mobile App Developer Intern & Team Lead",
    company: "Rablo",
    location: "Lucknow, India · Remote",
    period: "Oct 2024 — Jan 2025",
    companyUrl: "https://www.rablo.in",
    summary: "Built features for two Flutter apps while leading the intern team.",
    details: [
      "Developed features for two Flutter applications and integrated their REST APIs for reliable client–server communication.",
      "Led a small team of developers, split the work across modules and delivered within project deadlines.",
      "Onboarded and mentored junior interns, which got new people contributing sooner and sped up the team.",
    ],
    tech: ["Flutter", "Dart", "REST APIs", "Team leadership"],
  },
];

const skills: { group: string; tone: Tone; items: string[] }[] = [
  {
    group: "AI & ML",
    tone: "ai",
    items: ["RAG", "LangGraph agents", "LLM evaluation", "pgvector / embeddings", "OpenAI SDK", "Ollama (local LLMs)", "XGBoost", "SHAP"],
  },
  {
    group: "Languages",
    tone: "brand",
    items: ["Java", "Python", "Dart", "JavaScript", "SQL"],
  },
  {
    group: "Backend & data",
    tone: "brand",
    items: ["Spring Boot", "FastAPI", "Node.js / Express", "PostgreSQL", "MongoDB", "PySpark", "Power BI"],
  },
  {
    group: "Mobile & web",
    tone: "live",
    items: ["Flutter", "React", "HTML / CSS"],
  },
  {
    group: "Infra & tools",
    tone: "warm",
    items: ["AWS", "Git", "Linux / shell", "pytest", "JWT / Spring Security"],
  },
];

const education = [
  {
    school: "Sreenidhi Institute of Science and Technology",
    degree: "B.Tech, Computer Science & Engineering — Cybersecurity",
    period: "2022 — 2026",
    score: "CGPA 8.79 / 10",
    location: "Hyderabad",
  },
  {
    school: "Alphores Junior College",
    degree: "Intermediate, MPC",
    period: "2020 — 2022",
    score: "97.3%",
    location: "Karimnagar",
  },
];

const certifications = [
  { title: "Flutter & Dart — The Complete Development Bootcamp", issuer: "Udemy" },
  { title: "MySQL — The Complete Developer's Guide", issuer: "Udemy" },
  { title: "Java (Basic)", issuer: "HackerRank" },
  { title: "HTML & CSS Foundations · JavaScript Essential Training", issuer: "LinkedIn Learning" },
];

const navSections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "Education" },
];

/* ────────────────────────────────────────────
   Pieces
──────────────────────────────────────────── */

const SectionHeader = ({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) => (
  <div className="fade-up mb-12 md:mb-14 max-w-2xl">
    <p className="font-mono-label text-[12px] uppercase tracking-[0.2em] text-brand mb-4">
      {eyebrow}
    </p>
    <h2 className="font-display text-3xl md:text-[2.75rem] leading-[1.1] font-bold text-ink">
      {title}
    </h2>
    {intro && (
      <p className="mt-4 text-[16px] md:text-[17px] text-ink-soft leading-relaxed">{intro}</p>
    )}
  </div>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono-label text-[11.5px] text-ink-soft bg-surface-2 border border-line px-2.5 py-1 rounded-md">
    {children}
  </span>
);

const Bullet = ({ children, tone = "brand" }: { children: React.ReactNode; tone?: Tone }) => (
  <li className="flex gap-3 leading-relaxed">
    <span
      className={`mt-[10px] w-1.5 h-1.5 rounded-full shrink-0 ${
        {
          brand: "bg-brand",
          ai: "bg-ai",
          live: "bg-live",
          warm: "bg-warm",
        }[tone]
      }`}
    />
    <span className="text-[15px] text-ink-soft">{children}</span>
  </li>
);

const ExternalA = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const explicit = document.documentElement.dataset.theme;
    setDark(
      explicit ? explicit === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    setDark(!dark);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="w-9 h-9 rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:bg-surface-2 transition-colors"
    >
      {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
};

/* ────────────────────────────────────────────
   Portfolio
──────────────────────────────────────────── */

const Portfolio = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-canvas text-ink overflow-x-hidden">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-canvas/80 backdrop-blur-xl border-b border-line/70">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-ai text-white font-display font-bold text-[13px] flex items-center justify-center tracking-normal">
              RT
            </span>
            <span className="font-display font-semibold text-[15px] text-ink tracking-tight hidden sm:inline">
              Rahul Thatipamula
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[14px] font-medium text-ink-soft hover:text-ink transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-canvas text-[13px] font-semibold hover:bg-brand hover:text-brand-ink transition-colors"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <header className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 hero-backdrop pointer-events-none" />
        <div className="absolute inset-0 hero-grid pointer-events-none" />

        <div className="relative max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 pt-16 md:pt-24 pb-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            <div>
              <div className="fade-up inline-flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-full bg-surface border border-line text-[13px] text-ink-soft mb-8 shadow-sm">
                <span className="pulse-dot w-2 h-2 rounded-full bg-live" />
                Open to software engineering & AI engineering roles
              </div>

              <p className="fade-up fade-up-delay-1 font-mono-label text-[13px] text-ink-faint mb-4">
                Rahul Thatipamula — Software Engineer
              </p>

              <h1 className="fade-up fade-up-delay-1 font-display text-[2.6rem] sm:text-[3.4rem] lg:text-[4.1rem] leading-[1.04] font-bold text-ink mb-7 max-w-[15ch]">
                I build <span className="text-gradient">AI systems</span> and the software around them.
              </h1>

              <p className="fade-up fade-up-delay-2 text-[17px] md:text-[18px] text-ink-soft max-w-[58ch] leading-relaxed mb-9">
                Full-stack engineer working across LLM applications, backend services and mobile.
                Recently: a RAG agent that won't answer unless it can cite the source, a payments
                backend that stays correct under concurrent load, and a student app live on the
                Play Store. CS graduate specialising in cybersecurity, based in Hyderabad.
              </p>

              <div className="fade-up fade-up-delay-3 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand text-brand-ink text-[14px] font-semibold hover:opacity-90 shadow-[0_10px_30px_-12px_rgb(var(--brand)/0.7)] transition-opacity"
                >
                  See my work
                  <ArrowRight className="w-4 h-4" />
                </a>
                <ExternalA
                  href={links.resume}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface border border-line text-ink text-[14px] font-semibold hover:border-ink/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Résumé
                </ExternalA>
                <div className="flex items-center gap-0.5 ml-1">
                  {[
                    { href: links.github, icon: Github, label: "GitHub" },
                    { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
                    { href: `mailto:${EMAIL}`, icon: Mail, label: "Email" },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={l.label}
                      className="w-11 h-11 rounded-full flex items-center justify-center text-ink-soft hover:text-brand hover:bg-surface transition-colors"
                    >
                      <l.icon className="w-[19px] h-[19px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Portrait */}
            <div className="fade-up fade-up-delay-2 hidden lg:block relative">
              <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-brand/25 to-ai/25 blur-2xl" />
              <div className="relative p-1.5 rounded-[2rem] bg-surface border border-line shadow-xl">
                <img
                  src={profileImage}
                  alt="Portrait of Rahul Thatipamula"
                  className="w-[280px] h-[340px] object-cover rounded-[1.6rem]"
                />
              </div>
              <div className="absolute -left-10 bottom-16 card px-3.5 py-2.5 shadow-lg flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-md bg-ai/15 text-ai flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-[12.5px] leading-tight">
                  <span className="block font-semibold text-ink">PharmaDocs</span>
                  <span className="text-ink-faint">RAG agent · just shipped</span>
                </span>
              </div>
              <div className="absolute -right-6 top-10 card px-3.5 py-2.5 shadow-lg flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-md bg-live/15 text-live flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </span>
                <span className="text-[12.5px] leading-tight">
                  <span className="block font-semibold text-ink">CAX</span>
                  <span className="text-ink-faint">100+ users</span>
                </span>
              </div>
            </div>
          </div>

          {/* Proof strip */}
          <dl className="fade-up fade-up-delay-4 mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-line bg-surface/80 backdrop-blur divide-x divide-y lg:divide-y-0 divide-line overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="p-5 md:p-6">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl md:text-[2.1rem] font-bold text-ink mb-1">
                    {s.value}
                  </span>
                  <span className="text-[13px] text-ink-soft leading-snug">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ─── What I do ─── */}
      <section className="py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader
            eyebrow="What I do"
            title="One engineer, the whole stack, with AI where it earns its place."
            intro="I'm most useful on products that need a model, a reliable backend and an app people actually open. Each area below links to work that backs it up."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((c, i) => (
              <div key={c.title} className={`fade-up fade-up-delay-${i + 1} card card-hover p-6 flex flex-col`}>
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 border ${toneChip[c.tone]}`}
                >
                  <c.icon className="w-5 h-5" />
                </span>
                <h3 className="font-display text-[18px] font-semibold text-ink mb-2 tracking-tight">
                  {c.title}
                </h3>
                <p className="text-[14.5px] text-ink-soft leading-relaxed mb-5 flex-1">{c.body}</p>
                <p className={`font-mono-label text-[11.5px] ${toneText[c.tone]}`}>↳ {c.proof}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Work ─── */}
      <section id="work" className="py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader
            eyebrow="Selected work"
            title="Projects, and the engineering decisions behind them."
            intro="For each one: the problem, what I built, and the parts that were actually hard."
          />

          {/* Featured: PharmaDocs */}
          <article className="fade-up relative card overflow-hidden mb-6">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-ai" />
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              <div className="p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span className={`font-mono-label text-[11px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-md border ${toneChip.ai}`}>
                    {featured.kind}
                  </span>
                  <span className="font-mono-label text-[11px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-md border text-brand bg-brand/10 border-brand/20">
                    Featured
                  </span>
                  <span className="font-mono-label text-[12px] text-ink-faint">{featured.period}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
                  {featured.title}
                </h3>
                <p className="text-[16px] md:text-[17px] text-ink leading-relaxed mb-7">
                  {featured.pitch}
                </p>
                <ul className="space-y-3 mb-8">
                  {featured.bullets.map((b) => (
                    <Bullet key={b} tone="ai">
                      {b}
                    </Bullet>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                <p className="inline-flex items-center gap-2 text-[13px] text-ink-faint">
                  <Lock className="w-3.5 h-3.5" />
                  Private repository. Happy to walk through the code in an interview.
                </p>
              </div>

              {/* Architecture */}
              <div className="bg-surface-2 border-t lg:border-t-0 lg:border-l border-line p-6 md:p-10 flex flex-col justify-center">
                <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-ink-faint mb-6">
                  How a question flows
                </p>
                <ol className="relative space-y-3">
                  {pipeline.map((p, i) => (
                    <li key={p.step} className="relative flex items-center gap-4">
                      <span
                        className={`relative z-10 w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-mono-label text-[12px] font-medium border ${
                          i >= 3 ? toneChip.ai : toneChip.brand
                        } bg-surface`}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1 card px-4 py-3 flex items-center justify-between gap-3">
                        <span className="font-semibold text-[14.5px] text-ink">{p.step}</span>
                        <span className="font-mono-label text-[11.5px] text-ink-faint text-right">
                          {p.detail}
                        </span>
                      </div>
                      {i < pipeline.length - 1 && (
                        <span className="absolute left-[17px] top-9 h-3 w-px bg-line" />
                      )}
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-ai/40 bg-ai/[0.06] px-4 py-3">
                  <CornerDownLeft className="w-4 h-4 text-ai mt-0.5 shrink-0" />
                  <p className="text-[13px] text-ink-soft leading-relaxed">
                    <span className="font-semibold text-ink">Unsupported claim?</span> The agent
                    rewrites the query and retrieves again, at most twice. It never returns an
                    uncited answer.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Project grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <article
                key={p.id}
                className={`fade-up fade-up-delay-${(i % 2) + 1} card card-hover p-6 md:p-8 flex flex-col`}
              >
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span
                    className={`font-mono-label text-[11px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-md border ${toneChip[p.tone]}`}
                  >
                    {p.kind}
                  </span>
                  {p.status && (
                    <span className="inline-flex items-center gap-1.5 font-mono-label text-[11px] uppercase tracking-[0.12em] text-live">
                      <span className="w-1.5 h-1.5 rounded-full bg-live" />
                      {p.status}
                    </span>
                  )}
                  <span className="font-mono-label text-[12px] text-ink-faint ml-auto">{p.period}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink mb-3">{p.title}</h3>
                <p className="text-[15.5px] text-ink leading-relaxed mb-5">{p.pitch}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.bullets.map((b) => (
                    <Bullet key={b} tone={p.tone}>
                      {b}
                    </Bullet>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                {p.links && (
                  <div className="flex flex-wrap gap-5 pt-5 border-t border-line">
                    {p.links.map((l) => (
                      <ExternalA
                        key={l.label}
                        href={l.href}
                        className="link-sweep inline-flex items-center gap-1 text-[14px] font-semibold text-brand"
                      >
                        {l.label}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </ExternalA>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Smaller builds */}
          <div className="fade-up mt-14">
            <h3 className="font-mono-label text-[12px] uppercase tracking-[0.2em] text-ink-faint mb-5">
              Smaller builds · open source
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {smallBuilds.map((b) => (
                <ExternalA
                  key={b.title}
                  href={b.href}
                  className="group card card-hover p-5 flex flex-col"
                >
                  <span className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[15.5px] text-ink">{b.title}</span>
                    <Github className="w-4 h-4 text-ink-faint group-hover:text-brand transition-colors" />
                  </span>
                  <span className="text-[14px] text-ink-soft leading-relaxed mb-4 flex-1">{b.body}</span>
                  <span className="font-mono-label text-[11.5px] text-ink-faint">{b.tech}</span>
                </ExternalA>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Experience ─── */}
      <section id="experience" className="py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-surface-2/60 border-y border-line">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader
            eyebrow="Experience"
            title="Where I've worked."
            intro="Enterprise data engineering at Infosys, and shipping mobile features at a startup while leading its intern team."
          />
          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <article
                key={exp.id}
                className={`fade-up fade-up-delay-${i + 1} card p-6 md:p-8 grid md:grid-cols-[220px_1fr] gap-4 md:gap-10`}
              >
                <div>
                  <ExternalA
                    href={exp.companyUrl}
                    className="link-sweep inline-flex items-center gap-1 font-display text-xl font-bold text-ink hover:text-brand transition-colors"
                  >
                    {exp.company}
                    <ArrowUpRight className="w-4 h-4" />
                  </ExternalA>
                  <p className="font-mono-label text-[12px] text-ink-faint mt-2">{exp.period}</p>
                  <p className="flex items-center gap-1.5 text-[13px] text-ink-faint mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </p>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-ink mb-1.5">{exp.position}</h3>
                  <p className="text-[15px] text-ink-soft mb-4">{exp.summary}</p>
                  <ul className="space-y-2.5 mb-5">
                    {exp.details.map((d) => (
                      <Bullet key={d}>{d}</Bullet>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section id="skills" className="py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader
            eyebrow="Toolkit"
            title="What I work with."
            intro="Every tool here has been used in a project or role on this page, not just in a tutorial."
          />
          <div className="fade-up card divide-y divide-line">
            {skills.map((s) => (
              <div
                key={s.group}
                className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-8 px-5 md:px-8 py-5 md:py-6 items-baseline"
              >
                <h3 className={`font-mono-label text-[12px] uppercase tracking-[0.16em] ${toneText[s.tone]}`}>
                  {s.group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-surface-2 border border-line text-ink text-[13.5px] font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Education & certifications ─── */}
      <section id="about" className="py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeader eyebrow="Background" title="Education & certifications." />
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="fade-up card p-6 md:p-8">
              <h3 className="flex items-center gap-2 font-semibold text-ink mb-6">
                <GraduationCap className="w-5 h-5 text-brand" /> Education
              </h3>
              <div className="space-y-6">
                {education.map((e) => (
                  <div key={e.school} className="flex justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[15.5px] text-ink leading-snug">{e.school}</p>
                      <p className="text-[14px] text-ink-soft mt-1">{e.degree}</p>
                      <p className="font-mono-label text-[12px] text-ink-faint mt-2">
                        {e.period} · {e.location}
                      </p>
                    </div>
                    <span className="shrink-0 self-start font-mono-label text-[12px] font-medium text-brand bg-brand/10 border border-brand/20 px-2.5 py-1 rounded-md">
                      {e.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="fade-up fade-up-delay-1 card p-6 md:p-8">
              <h3 className="flex items-center gap-2 font-semibold text-ink mb-6">
                <Award className="w-5 h-5 text-warm" /> Certifications
              </h3>
              <ul className="space-y-4">
                {certifications.map((c) => (
                  <li key={c.title} className="flex justify-between gap-4 items-baseline">
                    <span className="text-[14.5px] text-ink leading-snug">{c.title}</span>
                    <span className="shrink-0 font-mono-label text-[11.5px] text-ink-faint">{c.issuer}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-line flex flex-wrap gap-5">
                <ExternalA href={links.leetcode} className="link-sweep inline-flex items-center gap-1 text-[14px] font-semibold text-brand">
                  LeetCode <ArrowUpRight className="w-3.5 h-3.5" />
                </ExternalA>
                <ExternalA href={links.hackerrank} className="link-sweep inline-flex items-center gap-1 text-[14px] font-semibold text-brand">
                  HackerRank <ArrowUpRight className="w-3.5 h-3.5" />
                </ExternalA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <footer id="contact" className="px-4 sm:px-6 md:px-8 pb-10">
        <div className="max-w-[1120px] mx-auto">
          <div className="fade-up relative overflow-hidden rounded-3xl bg-ink text-canvas px-6 py-14 md:px-14 md:py-20">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand/40 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -left-16 w-72 h-72 rounded-full bg-ai/30 blur-3xl pointer-events-none" />
            <div className="relative max-w-2xl">
              <p className="font-mono-label text-[12px] uppercase tracking-[0.2em] opacity-70 mb-5">
                Contact
              </p>
              <h2 className="font-display text-4xl md:text-[3.4rem] leading-[1.05] font-bold mb-6">
                Hiring for backend, full-stack or AI engineering? Let's talk.
              </h2>
              <p className="text-[16px] md:text-[17px] opacity-80 leading-relaxed mb-10">
                I'm looking for a team that ships real products and cares how they're built.
                Email is the fastest way to reach me.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-canvas text-ink text-[14px] font-semibold hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-4 h-4" />
                  {EMAIL}
                </a>
                <ExternalA
                  href={links.linkedin}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-canvas/25 text-[14px] font-semibold hover:border-canvas/60 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </ExternalA>
                <ExternalA
                  href={links.github}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-canvas/25 text-[14px] font-semibold hover:border-canvas/60 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </ExternalA>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono-label text-[12.5px] opacity-70">
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> {PHONE}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Hyderabad, India
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-[13px] text-ink-faint">
            <span>© 2026 Rahul Thatipamula</span>
            <a href="#" className="hover:text-ink transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
