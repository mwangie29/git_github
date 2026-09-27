import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Copy,
  ExternalLink,
  GitBranch,
  Github,
  LockKeyhole,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
} from "lucide-react";

const chapters = [
  { id: "model", no: "01", title: "The mental model", eyebrow: "Start here" },
  { id: "compare", no: "02", title: "Git vs GitHub", eyebrow: "The distinction" },
  { id: "workflow", no: "03", title: "The delivery loop", eyebrow: "In practice" },
  { id: "security", no: "04", title: "Security + governance", eyebrow: "At scale" },
  { id: "roadmap", no: "05", title: "The learning path", eyebrow: "Next moves" },
];

const commandLines = [
  ["$", "git init"],
  ["$", "git add ."],
  ["$", 'git commit -m "Initial version"'],
  ["$", "git log --oneline"],
];

const workflowSteps = [
  { icon: GitBranch, label: "git push", detail: "A new snapshot lands" },
  { icon: Workflow, label: "Action starts", detail: "The workflow wakes up" },
  { icon: Check, label: "Test + lint", detail: "Quality gates run" },
  { icon: ShieldCheck, label: "Scan", detail: "Risk is surfaced" },
  { icon: ArrowUpRight, label: "Deploy", detail: "A release ships" },
];

const featureRows = [
  ["Commits", "Yes", "Displays / manages them"],
  ["Branches", "Yes", "Yes"],
  ["Pull requests", "No", "Yes + review workflow"],
  ["Issues", "No", "Yes"],
  ["Actions / CI/CD", "No", "Yes"],
  ["Secret scanning", "No", "Yes"],
  ["Organizations", "No", "Yes"],
];

const roadmap = [
  { no: "01", title: "Git basics", items: "init · add · status · commit · log · diff" },
  { no: "02", title: "Everyday Git", items: "rebase · stash · cherry-pick · conflict resolution" },
  { no: "03", title: "GitHub engineering", items: "PRs · reviews · rules · CODEOWNERS · releases" },
  { no: "04", title: "Production engineering", items: "CI/CD · security scanning · Docker · approvals" },
  { no: "05", title: "Large-scale systems", items: "monorepos · worktrees · merge queues · governance" },
];

function CodeBlock({ lines = commandLines, label = "terminal" }: { lines?: string[][]; label?: string }) {
  const [copied, setCopied] = useState(false);
  const text = lines.map((line) => line.join(" ")).join("\n");

  const copy = async () => {
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code-window">
      <div className="code-window__bar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <span>{label}</span>
        <button className="copy-button" onClick={copy} aria-label="Copy code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>{lines.map((line, index) => (
        <code key={index} className="code-line">
          <span className="code-line__number">{String(index + 1).padStart(2, "0")}</span>
          <span className="code-line__prompt">{line[0]}</span>
          <span>{line.slice(1).join(" ")}</span>
        </code>
      ))}</pre>
    </div>
  );
}

function SectionKicker({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-kicker"><span>{number}</span><span>{children}</span></div>;
}

function AppMark() {
  return (
    <div className="app-mark" aria-label="Git / GitHub Field Guide">
      <span className="app-mark__slash">/</span>
      <span className="app-mark__word">field guide</span>
    </div>
  );
}

export default function Home() {
  const [activeChapter, setActiveChapter] = useState("model");
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(false);

  const visibleChapters = useMemo(() => {
    if (!query.trim()) return chapters;
    return chapters.filter((chapter) => `${chapter.title} ${chapter.eyebrow}`.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveChapter(visible[0].target.id);
    }, { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.4, 0.8] });
    chapters.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNav(false);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar__inner">
          <AppMark />
          <nav className={`topnav ${mobileNav ? "topnav--open" : ""}`} aria-label="Primary navigation">
            <button onClick={() => jumpTo("model")} className="topnav__link">Read the guide</button>
            <button onClick={() => jumpTo("roadmap")} className="topnav__link">Roadmap</button>
            <a href="https://git-scm.com/book/en/v2" target="_blank" rel="noreferrer" className="topnav__link">Source material <ExternalLink size={13} /></a>
          </nav>
          <div className="topbar__actions">
            <button className={`save-button ${saved ? "save-button--saved" : ""}`} onClick={() => setSaved(!saved)}>
              {saved ? <Check size={15} /> : <Sparkles size={15} />} {saved ? "Saved" : "Save guide"}
            </button>
            <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">
              {mobileNav ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero__texture" />
          <div className="hero__grid" />
          <div className="container hero__inner">
            <div className="hero__rail">
              <span>FIELD GUIDE</span><span>NO. 01</span><span>2026</span>
            </div>
            <div className="hero__copy">
              <div className="eyebrow"><CircleDot size={12} fill="currentColor" /> A practical explainer for ambitious builders</div>
              <h1>Git is the <em>engine.</em><br />GitHub is the<br /><strong>operating system.</strong></h1>
              <p className="hero__dek">There is substantially more to Git and GitHub than “save my code / push to GitHub.” Here is the deeper system underneath.</p>
              <div className="hero__meta">
                <span><b>33</b> sections</span><span><b>11</b> min read</span><span><b>∞</b> useful later</span>
              </div>
              <button className="hero__cta" onClick={() => jumpTo("model")}>Start with the mental model <ArrowDownRight size={17} /></button>
            </div>
            <div className="hero__visual" aria-label="Abstract version control graph">
              <div className="hero__visual-head"><span>repository / main</span><span>live graph</span></div>
              <div className="commit-graph">
                <div className="graph-line graph-line--main" />
                <div className="graph-line graph-line--branch" />
                <div className="graph-line graph-line--branch-two" />
                {["A", "B", "C", "D", "E", "F", "G"].map((commit, index) => <span key={commit} className={`commit commit--${index + 1}`}><i />{commit}</span>)}
              </div>
              <div className="hero__visual-foot"><span>snapshots, not just diffs</span><span>● connected</span></div>
            </div>
          </div>
          <div className="hero__foot container"><span>Scroll to explore</span><span className="hero__foot-line" /><span>Git / GitHub / 001</span></div>
        </section>

        <section className="intro container" id="intro">
          <div className="intro__aside"><span>THE SHORT VERSION</span><span>01 — 04</span></div>
          <div className="intro__content">
            <p className="lede">Git records the history of a project. GitHub adds the system around that history: collaboration, automation, security, governance, and deployment.</p>
            <div className="pull-quote">“GitHub is where Git repositories are stored” is technically understandable — and far too narrow.</div>
            <div className="intro__cols">
              <p>Once projects become large, Git and GitHub stop being merely where your code is stored. They become part of how software is engineered, reviewed, secured, released, and governed.</p>
              <p>This guide follows that widening lens — from the first local commit to the questions that matter when there are 1,000 developers and continuous deployments.</p>
            </div>
          </div>
        </section>

        <div className="reading-layout container">
          <aside className="chapter-nav" aria-label="Guide chapters">
            <div className="chapter-nav__top"><span>CONTENTS</span><Search size={14} /></div>
            <label className="chapter-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter chapters" /></label>
            <div className="chapter-list">
              {visibleChapters.map((chapter) => <button key={chapter.id} className={`chapter-item ${activeChapter === chapter.id ? "chapter-item--active" : ""}`} onClick={() => jumpTo(chapter.id)}><span className="chapter-item__no">{chapter.no}</span><span><small>{chapter.eyebrow}</small>{chapter.title}</span><ChevronRight size={15} /></button>)}
              {!visibleChapters.length && <p className="chapter-empty">No matching chapters.</p>}
            </div>
            <div className="chapter-nav__note"><span className="note-dot" /> <span>Field note</span><p>Git is distributed. Your clone contains the history — and the power to work offline.</p></div>
          </aside>

          <div className="article">
            <section className="article-section" id="model">
              <SectionKicker number="01">The mental model</SectionKicker>
              <div className="section-heading"><h2>Snapshots<br /><i>all the way down.</i></h2><div className="section-heading__side"><span>THE PREMISE</span><p>Git primarily thinks in snapshots, not a giant list of changes.</p></div></div>
              <div className="model-grid">
                <div className="model-copy"><p>Imagine your project moving through a series of states. Each commit is a particular state of the project — a durable point you can inspect, compare, branch from, recover, or return to.</p><p>Because Git is distributed, a clone is not merely a folder containing the latest code. It contains substantial repository history and can perform many operations without a server.</p><div className="inline-callout"><span className="inline-callout__mark">↳</span><span><b>Working offline is a feature.</b><br />The server is useful. It is not the engine.</span></div></div>
                <div className="snapshot-card"><div className="snapshot-card__label">PROJECT / HISTORY</div><div className="snapshot-graph"><div className="snapshot-trunk" />{["v1", "v2", "v3", "v4"].map((version, index) => <div key={version} className={`snapshot-node snapshot-node--${index + 1}`}><b>{version}</b><span>{index === 0 ? "first state" : index === 3 ? "current" : "snapshot"}</span></div>)}<div className="snapshot-branch" /><div className="snapshot-branch-node"><b>feature</b><span>E → F</span></div></div><div className="snapshot-card__foot"><span>A — B — C — D</span><span>reversible history</span></div></div>
              </div>
              <CodeBlock />
            </section>

            <section className="article-section" id="compare">
              <SectionKicker number="02">The distinction</SectionKicker>
              <div className="section-heading"><h2>Engine<br /><i>vs. ecosystem.</i></h2><div className="section-heading__side"><span>ONE LINE EACH</span><p>Git is version-control infrastructure. GitHub is developer infrastructure built around it.</p></div></div>
              <div className="compare-cards"><article className="compare-card compare-card--git"><div className="compare-card__head"><div className="compare-icon"><GitBranch size={20} /></div><span>THE ENGINE</span></div><h3>Git</h3><p>A distributed version control system. It records the history of a project and gives you branches, merges, rebases, reversions, and recovery.</p><div className="compare-card__tag">local-first / history-rich</div></article><article className="compare-card compare-card--github"><div className="compare-card__head"><div className="compare-icon"><Github size={20} /></div><span>THE PLATFORM</span></div><h3>GitHub</h3><p>A software-development platform that wraps repositories in collaboration, automation, security, project management, and governance.</p><div className="compare-card__tag">social / automated / governed</div></article></div>
              <div className="feature-table-wrap"><div className="feature-table__head"><span>CAPABILITY</span><span>GIT</span><span>GITHUB</span></div>{featureRows.map(([capability, git, github]) => <div className="feature-row" key={capability}><span>{capability}</span><span className={git === "No" ? "muted-value" : "yes-value"}>{git}</span><span className={github.includes("Yes") ? "yes-value" : "muted-value"}>{github}</span></div>)}</div>
            </section>

            <section className="article-section article-section--workflow" id="workflow">
              <SectionKicker number="03">The delivery loop</SectionKicker>
              <div className="section-heading"><h2>Push once.<br /><i>Orchestrate everything.</i></h2><div className="section-heading__side"><span>GITHUB ACTIONS</span><p>Repeatable workflows turn a push into a tested, scanned, deployable release.</p></div></div>
              <div className="workflow-panel"><div className="workflow-panel__top"><span>WORKFLOW / ON PUSH</span><span className="live-pill"><i /> ready</span></div><div className="workflow-steps">{workflowSteps.map((step, index) => { const Icon = step.icon; return <div className="workflow-step" key={step.label}><div className="workflow-step__icon"><Icon size={18} /></div><div><b>{step.label}</b><span>{step.detail}</span></div>{index < workflowSteps.length - 1 && <div className="workflow-arrow"><ArrowUpRight size={14} /></div>}</div>; })}</div><div className="workflow-panel__foot"><Terminal size={15} /><code>git push origin main</code><span>→</span><code>ship / learn / repeat</code></div></div>
              <div className="workflow-note"><span className="workflow-note__number">06</span><p>Actions can go much further than tests: deployments, database migrations, package publishing, Docker images, documentation, dependency updates, and release notifications.</p><a href="https://docs.github.com/en/actions" target="_blank" rel="noreferrer">Explore Actions <ArrowUpRight size={14} /></a></div>
            </section>

            <section className="article-section" id="security">
              <SectionKicker number="04">At scale</SectionKicker>
              <div className="section-heading"><h2>The repo<br /><i>becomes a rulebook.</i></h2><div className="section-heading__side"><span>ENGINEERING GOVERNANCE</span><p>Professional teams encode the path from change to production.</p></div></div>
              <div className="security-intro"><p>Branch protection changes GitHub from a place where code lives into a system that controls how code is allowed to become production code.</p><div className="branch-rules"><div className="branch-rules__head"><GitBranch size={16} /><span>main / protected</span><span className="branch-rules__status">rules active</span></div><div className="rule rule--blocked"><X size={14} /> direct push</div><div className="rule rule--blocked"><X size={14} /> force push</div><div className="rule rule--allowed"><Check size={14} /> pull request + review</div><div className="rule rule--allowed"><Check size={14} /> tests + security checks pass</div></div></div>
              <div className="security-grid"><article><div className="security-icon"><LockKeyhole size={18} /></div><h3>Secrets stay secret.</h3><p>Push protection can stop supported credentials before they land. Secret scanning looks across more than the latest commit.</p><span>secret scanning</span></article><article><div className="security-icon"><Code2 size={18} /></div><h3>Code becomes data.</h3><p>CodeQL can analyze data flows to spot classes of vulnerabilities that a basic test suite will never exercise.</p><span>code scanning</span></article><article><div className="security-icon"><Github size={18} /></div><h3>Ownership is explicit.</h3><p>CODEOWNERS maps paths to teams, so organizational knowledge can travel with the repository.</p><span>CODEOWNERS</span></article></div>
            </section>

            <section className="article-section" id="roadmap">
              <SectionKicker number="05">The learning path</SectionKicker>
              <div className="section-heading"><h2>From command<br /><i>to capability.</i></h2><div className="section-heading__side"><span>FIVE LEVELS</span><p>Knowledge compounds when you move from syntax to systems.</p></div></div>
              <div className="roadmap-list">{roadmap.map((level, index) => <div className={`roadmap-row ${index === 2 ? "roadmap-row--highlight" : ""}`} key={level.no}><span className="roadmap-row__no">{level.no}</span><div className="roadmap-row__title"><h3>{level.title}</h3><p>{level.items}</p></div><ArrowUpRight size={17} /></div>)}</div>
              <div className="money-card"><div><span className="money-card__eyebrow">THE MONEY ANGLE</span><h3>Don’t sell “I know Git.”<br /><i>Sell a better delivery system.</i></h3></div><div className="money-card__copy"><p>Repository setup. PR workflows. CI/CD. Deployment automation. Supply-chain security. Eventually, tools that operate on GitHub.</p><a href="https://github.com/features" target="_blank" rel="noreferrer">See the surface area <ArrowUpRight size={15} /></a></div></div>
            </section>
          </div>
        </div>

        <section className="closing container"><div className="closing__line" /><div className="closing__label">THE MENTAL MODEL TO KEEP</div><h2>Control complexity.<br /><i>Ship with confidence.</i></h2><p>Git gives you the history. GitHub gives teams the systems to decide who can change what, how it is reviewed, whether it is secure, and whether it can be reproduced.</p><button onClick={() => jumpTo("model")}>Read it again <ArrowUpRight size={16} /></button></section>
      </main>
      <footer className="footer"><div className="container footer__inner"><AppMark /><span>Git / GitHub / Field Guide No. 01</span><span>Built for curious builders.</span></div></footer>
    </div>
  );
}
