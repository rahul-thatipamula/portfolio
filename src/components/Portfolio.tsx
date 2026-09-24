import { useEffect, type ComponentType, type ReactNode } from "react";
import {
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  Download,
  Sparkles,
  Server,
  Smartphone,
  ShieldCheck,
  GraduationCap,
  Award,
  Lock,
  RotateCcw,
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
  { value: "100+", label: "users on CAX, live on Google Play" },
  { value: "2", label: "internships, at Infosys and Rablo" },
  { value: "8", label: "projects, from AI agents to payments" },
  { value: "8.79", label: "CGPA in B.Tech CSE, Cybersecurity" },
];

type Tone = "brand" | "ai" | "live" | "warm";

const toneText: Record<Tone, string> = {
  brand: "text-brand",
  ai: "text-ai",
  live: "text-live",
  warm: "text-warm",
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

const highlights = [
  {
    title: "Clean data in.",
    body: "openFDA labels land untouched in staging tables, then get cleaned, chunked and embedded into pgvector with an HNSW index. Any transform bug can be replayed without re-fetching.",
  },
  {
    title: "An agent that checks itself.",
    body: "A LangGraph state machine routes, retrieves and answers with SQL-backed tools. A second model then verifies every cited claim, and anything unsupported triggers a rewrite and retry.",
  },
  {
    title: "Data quality you can query.",
    body: "Seven reconciliation checks per ingest run (counts, duplicates, nulls, orphans, oversize chunks) are stored as rows tied to a run ID, not buried in logs.",
  },
  {
    title: "Measured, not guessed.",
    body: "A 50-question evaluation set reports hit@5, MRR, latency and LLM-judged faithfulness. Unit tests cover chunking, parsing and routing with no network or database.",
  },
];

/* ────────────────────────────────────────────
   Pieces
──────────────────────────────────────────── */

const Section = ({
  id,
  muted = false,
  children,
}: {
  id?: string;
  muted?: boolean;
  children: ReactNode;
}) => (
  <section
    id={id}
    className={`px-4 sm:px-6 py-20 md:py-28 ${muted ? "bg-surface-2" : "bg-canvas"}`}
  >
    <div className="max-w-[1024px] mx-auto">{children}</div>
  </section>
);

const SectionHeader = ({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) => (
  <div className="fade-up text-center max-w-[720px] mx-auto mb-12 md:mb-16">
    {eyebrow && <p className="eyebrow text-ink-soft mb-3">{eyebrow}</p>}
    <h2 className="font-display text-[36px] md:text-[52px] leading-[1.08] font-semibold text-ink [text-wrap:balance]">
      {title}
    </h2>
    {intro && (
      <p className="mt-5 text-[17px] md:text-[21px] leading-[1.45] text-ink-soft">{intro}</p>
    )}
  </div>
);

const ExternalA = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);

const MoreLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <ExternalA href={href} className="link-more text-[17px]">
    {children}
    <ChevronRight className="w-4 h-4" />
  </ExternalA>
);

const TechLine = ({ items }: { items: string[] }) => (
  <p className="text-[14px] text-ink-faint leading-relaxed">{items.join(" · ")}</p>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((b) => (
      <li key={b} className="flex gap-3 text-[15px] leading-[1.55] text-ink-soft">
        <span className="mt-[9px] w-1 h-1 rounded-full bg-ink-faint shrink-0" />
        <span>{b}</span>
      </li>
    ))}
  </ul>
);

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
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/75 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.08]">
        <div className="max-w-[1024px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          <a href="#" className="text-[15px] font-semibold text-ink tracking-tight shrink-0">
            Rahul Thatipamula
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[12.5px] text-ink/80 hover:text-ink transition-colors"
              >
                {s.label}
              </a>
            ))}
            <a href="#contact" className="text-[12.5px] text-ink/80 hover:text-ink transition-colors">
              Contact
            </a>
          </div>
          <ExternalA
            href={links.resume}
            className="inline-flex items-center rounded-full bg-brand text-brand-ink text-[12px] font-medium px-3.5 py-1 hover:bg-[#0077ed] transition-colors"
          >
            Résumé
          </ExternalA>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <header className="relative px-4 sm:px-6 pt-28 md:pt-36 pb-16 md:pb-20 text-center">
        <div className="max-w-[1024px] mx-auto">
          <div className="fade-up flex justify-center mb-7">
            <img
              src={profileImage}
              alt="Portrait of Rahul Thatipamula"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-[0_12px_32px_-12px_rgb(0_0_0/0.35)] ring-4 ring-white"
            />
          </div>

          <div className="fade-up fade-up-delay-1 inline-flex items-center gap-2 text-[14px] text-ink-soft mb-5">
            <span className="pulse-dot w-2 h-2 rounded-full bg-live" />
            Open to software engineering & AI engineering roles
          </div>

          <p className="fade-up fade-up-delay-1 font-display text-[21px] md:text-[28px] font-semibold text-ink mb-2">
            Rahul Thatipamula
          </p>
          <h1 className="fade-up fade-up-delay-2 font-display text-[44px] sm:text-[60px] md:text-[80px] leading-[1.04] font-semibold text-ink max-w-[900px] mx-auto [text-wrap:balance]">
            AI systems. <span className="text-gradient">And the software around them.</span>
          </h1>

          <p className="fade-up fade-up-delay-3 mt-7 text-[19px] md:text-[23px] leading-[1.4] text-ink-soft max-w-[700px] mx-auto">
            Software engineer building LLM applications, reliable backends and mobile apps
            people actually use. Cybersecurity graduate, based in Hyderabad.
          </p>

          <div className="fade-up fade-up-delay-4 mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#work" className="btn-primary">
              See my work
            </a>
            <ExternalA href={links.resume} className="btn-secondary">
              <Download className="w-4 h-4" />
              Download résumé
            </ExternalA>
          </div>
          <div className="fade-up fade-up-delay-4 mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            <MoreLink href={links.github}>GitHub</MoreLink>
            <MoreLink href={links.linkedin}>LinkedIn</MoreLink>
            <a href={`mailto:${EMAIL}`} className="link-more text-[17px]">
              Email
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Spec row */}
          <dl className="fade-up mt-20 md:mt-24 pt-12 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-[40px] md:text-[48px] font-semibold text-ink leading-none mb-2">
                    {s.value}
                  </span>
                  <span className="block text-[14px] text-ink-soft leading-snug max-w-[200px] mx-auto">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ─── What I do ─── */}
      <Section muted>
        <SectionHeader
          eyebrow="What I do"
          title="One engineer. The whole stack."
          intro="With AI where it earns its place. Each area below points to the work that backs it up."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {capabilities.map((c, i) => (
            <div key={c.title} className={`fade-up fade-up-delay-${(i % 2) + 1} tile p-8 md:p-10`}>
              <c.icon className={`w-8 h-8 mb-6 ${toneText[c.tone]}`} />
              <h3 className="font-display text-[24px] md:text-[28px] font-semibold text-ink mb-3">
                {c.title}
              </h3>
              <p className="text-[17px] leading-[1.5] text-ink-soft mb-5">{c.body}</p>
              <p className={`text-[14px] font-medium ${toneText[c.tone]}`}>Seen in {c.proof.replace(" · ", " and ")}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Work ─── */}
      <Section id="work">
        <SectionHeader
          eyebrow="Selected work"
          title="Built end to end."
          intro="For each project: the problem, what I built, and the parts that were actually hard."
        />

        {/* Featured: PharmaDocs */}
        <article className="fade-up tile-muted px-6 py-12 md:px-14 md:py-16 mb-5">
          <div className="text-center max-w-[720px] mx-auto">
            <p className="eyebrow text-warm mb-3">New · {featured.kind}</p>
            <h3 className="font-display text-[44px] md:text-[64px] leading-none font-semibold text-ink mb-4">
              {featured.title}
            </h3>
            <p className="font-display text-[24px] md:text-[32px] leading-tight font-semibold text-gradient mb-6">
              Every answer, cited. Or no answer at all.
            </p>
            <p className="text-[17px] md:text-[19px] leading-[1.5] text-ink-soft">{featured.pitch}</p>
          </div>

          {/* Pipeline */}
          <div className="mt-12">
            <p className="text-center eyebrow text-ink-soft mb-5">How a question flows</p>
            <ol className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-2 md:gap-1.5">
              {pipeline.map((p, i) => (
                <li key={p.step} className="flex flex-col md:flex-row items-center gap-2 md:gap-1.5">
                  <div
                    className={`w-full md:w-[150px] md:h-[84px] flex flex-col justify-center bg-white rounded-2xl px-4 py-4 text-center shadow-[0_1px_2px_rgb(0_0_0/0.04)] ${
                      i >= 3 ? "ring-1 ring-ai/30" : ""
                    }`}
                  >
                    <span className="block text-[15px] font-semibold text-ink">{p.step}</span>
                    <span className="block text-[12.5px] text-ink-soft mt-1">{p.detail}</span>
                  </div>
                  {i < pipeline.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-ink-faint rotate-90 md:rotate-0 shrink-0" />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-center justify-center gap-2 text-[14px] text-ink-soft text-center">
              <RotateCcw className="w-4 h-4 text-ai shrink-0" />
              Unsupported claim? It rewrites the query and retrieves again, at most twice.
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {highlights.map((h) => (
              <div key={h.title} className="bg-white rounded-[20px] p-6 md:p-7">
                <h4 className="text-[19px] font-semibold text-ink mb-2">{h.title}</h4>
                <p className="text-[15px] leading-[1.55] text-ink-soft">{h.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center space-y-3">
            <TechLine items={featured.tech} />
            <p className="inline-flex items-center gap-1.5 text-[14px] text-ink-soft">
              <Lock className="w-3.5 h-3.5" />
              Private repository. Happy to walk through the code in an interview.
            </p>
          </div>
        </article>

        {/* Project tiles */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className={`fade-up fade-up-delay-${(i % 2) + 1} tile-muted tile-hover p-8 md:p-10 flex flex-col`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <p className={`eyebrow ${toneText[p.tone]}`}>{p.kind}</p>
                {p.status && (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-soft bg-white rounded-full px-2.5 py-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${p.status === "Live" ? "bg-live" : "bg-warm"}`}
                    />
                    {p.status}
                  </span>
                )}
              </div>
              <h3 className="font-display text-[30px] md:text-[34px] leading-tight font-semibold text-ink mb-1">
                {p.title}
              </h3>
              <p className="text-[13px] text-ink-faint mb-5">{p.period}</p>
              <p className="text-[17px] leading-[1.5] text-ink mb-6">{p.pitch}</p>
              <div className="flex-1 mb-6">
                <Bullets items={p.bullets} />
              </div>
              <TechLine items={p.tech} />
              {p.links && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
                  {p.links.map((l) => (
                    <MoreLink key={l.label} href={l.href}>
                      {l.label}
                    </MoreLink>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Smaller builds */}
        <div className="fade-up mt-16">
          <h3 className="font-display text-[24px] md:text-[28px] font-semibold text-ink text-center mb-8">
            Smaller builds, open source.
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {smallBuilds.map((b) => (
              <div key={b.title} className="tile-muted p-7 flex flex-col">
                <h4 className="text-[19px] font-semibold text-ink mb-2">{b.title}</h4>
                <p className="text-[15px] leading-[1.55] text-ink-soft mb-4 flex-1">{b.body}</p>
                <p className="text-[13px] text-ink-faint mb-4">{b.tech}</p>
                <MoreLink href={b.href}>View on GitHub</MoreLink>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Experience ─── */}
      <Section id="experience" muted>
        <SectionHeader
          eyebrow="Experience"
          title="Where I've worked."
          intro="Enterprise data engineering at Infosys. Shipping mobile features at a startup while leading its intern team."
        />
        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <article
              key={exp.id}
              className={`fade-up fade-up-delay-${i + 1} tile p-8 md:p-10 grid md:grid-cols-[220px_1fr] gap-5 md:gap-10`}
            >
              <div>
                <h3 className="font-display text-[28px] font-semibold text-ink leading-tight">
                  {exp.company}
                </h3>
                <p className="text-[14px] text-ink-soft mt-2">{exp.period}</p>
                <p className="flex items-center gap-1.5 text-[14px] text-ink-faint mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </p>
              </div>
              <div>
                <p className="text-[19px] font-semibold text-ink mb-1">{exp.position}</p>
                <p className="text-[17px] text-ink-soft mb-5">{exp.summary}</p>
                <div className="mb-5">
                  <Bullets items={exp.details} />
                </div>
                <TechLine items={exp.tech} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ─── Skills ─── */}
      <Section id="skills">
        <SectionHeader
          eyebrow="Toolkit"
          title="What I work with."
          intro="Every tool here has been used in a project or role on this page."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => (
            <div
              key={s.group}
              className={`fade-up fade-up-delay-${(i % 3) + 1} tile-muted p-7 ${
                i === 0 ? "lg:col-span-2 sm:col-span-2" : ""
              }`}
            >
              <h3 className={`eyebrow mb-4 ${toneText[s.tone]}`}>{s.group}</h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="bg-white rounded-full px-3.5 py-1.5 text-[14px] text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Education & certifications ─── */}
      <Section id="about" muted>
        <SectionHeader eyebrow="Background" title="Education & certifications." />
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="fade-up tile p-8 md:p-10">
            <h3 className="flex items-center gap-2 text-[19px] font-semibold text-ink mb-7">
              <GraduationCap className="w-5 h-5 text-brand" /> Education
            </h3>
            <div className="space-y-7">
              {education.map((e) => (
                <div key={e.school}>
                  <div className="flex justify-between items-baseline gap-4">
                    <p className="text-[17px] font-semibold text-ink leading-snug">{e.school}</p>
                    <span className="shrink-0 text-[15px] font-semibold text-brand">{e.score}</span>
                  </div>
                  <p className="text-[15px] text-ink-soft mt-1">{e.degree}</p>
                  <p className="text-[13px] text-ink-faint mt-1.5">
                    {e.period} · {e.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-up fade-up-delay-1 tile p-8 md:p-10">
            <h3 className="flex items-center gap-2 text-[19px] font-semibold text-ink mb-7">
              <Award className="w-5 h-5 text-warm" /> Certifications
            </h3>
            <ul className="divide-y divide-line">
              {certifications.map((c) => (
                <li key={c.title} className="py-3.5 first:pt-0">
                  <p className="text-[15px] text-ink leading-snug">{c.title}</p>
                  <p className="text-[13px] text-ink-faint mt-1">{c.issuer}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <MoreLink href={links.leetcode}>LeetCode</MoreLink>
              <MoreLink href={links.hackerrank}>HackerRank</MoreLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Contact ─── */}
      <section id="contact" className="px-4 sm:px-6 py-24 md:py-32 text-center">
        <div className="fade-up max-w-[760px] mx-auto">
          <p className="eyebrow text-ink-soft mb-3">Contact</p>
          <h2 className="font-display text-[40px] md:text-[64px] leading-[1.05] font-semibold text-ink mb-6">
            Let's build something <span className="text-gradient">worth shipping.</span>
          </h2>
          <p className="text-[19px] md:text-[21px] leading-[1.45] text-ink-soft mb-10">
            Hiring for backend, full-stack or AI engineering? I'm looking for a team that ships
            real products and cares how they're built. Email is the fastest way to reach me.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href={`mailto:${EMAIL}`} className="btn-primary">
              <Mail className="w-4 h-4" />
              Email me
            </a>
            <ExternalA href={links.linkedin} className="btn-secondary">
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </ExternalA>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-ink-soft">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {EMAIL}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> {PHONE}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Hyderabad, India
            </span>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-surface-2 px-4 sm:px-6">
        <div className="max-w-[1024px] mx-auto py-5 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-ink-soft">
          <span>Copyright © 2026 Rahul Thatipamula. All rights reserved.</span>
          <div className="flex items-center divide-x divide-line">
            {[
              { label: "GitHub", href: links.github },
              { label: "LinkedIn", href: links.linkedin },
              { label: "LeetCode", href: links.leetcode },
              { label: "HackerRank", href: links.hackerrank },
            ].map((l) => (
              <ExternalA key={l.label} href={l.href} className="px-3 first:pl-0 last:pr-0 hover:text-ink hover:underline">
                {l.label}
              </ExternalA>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
