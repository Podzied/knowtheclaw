import Nav from "./components/Nav";
import DemoChat from "./components/DemoChat";
import SkillsDirectory from "./components/SkillsDirectory";
import SetupSelector from "./components/SetupSelector";
import SecurityChecklist from "./components/SecurityChecklist";
import CommunityPulse from "./components/CommunityPulse";

export default function Home() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <div className="hero" id="top">
        <div className="hero-tag fi">
          <span style={{ fontSize: "1rem" }}>&#x1F99E;</span> Local-First AI Agent
        </div>
        <h1 className="fi fi2">AI that acts, not just chats.</h1>
        <p className="hero-sub fi fi3">
          OpenClaw runs on your machine, works through the apps you already use,
          and handles real work — inbox, scheduling, research, code, and
          automation. KnowTheClaw explains what it is, how it works, and why it
          matters.
        </p>
        <div className="cta-row fi fi4">
          <a href="/overview" className="btn-primary">
            Read the Overview
          </a>
          <a href="#demo" className="btn-secondary">
            Try the Live Demo
          </a>
        </div>
      </div>

      {/* ── THE SHIFT ── */}
      <div className="shift-wrap" id="shift">
        <div className="shift-inner">
          <div className="section-tag">What Changed</div>
          <h2
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.3,
              marginBottom: "1.1rem",
            }}
          >
            AI moved from answers to actions.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.78,
              color: "var(--text-mid)",
              marginBottom: "0.9rem",
            }}
          >
            For the past few years, AI mostly meant chat: ask a question, get an
            answer, move on. Now the interface is changing. Instead of only
            answering questions, agents can take action across the tools you
            already use — triaging email, scheduling meetings, running research,
            writing code, and handling recurring tasks. The important shift is
            not better conversation. It&apos;s delegated execution.
          </p>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.78,
              color: "var(--text-mid)",
            }}
          >
            OpenClaw is one of the clearest open-source examples of that shift.
            This site exists to explain what it is, how it works, and why it
            matters.
          </p>
        </div>
      </div>

      {/* ── WHAT IT DOES ── */}
      <div className="section" id="what">
        <div className="section-tag">What OpenClaw Does</div>
        <h2>A local AI agent that works through the tools you already use.</h2>
        <p>
          OpenClaw runs as a background service on your own machine — laptop,
          Mac Mini, Raspberry Pi, or DGX Spark. You interact with it through
          familiar channels like WhatsApp, Telegram, Slack, and Discord. It
          connects to the model you choose, keeps memory locally, and can
          execute tasks directly — not just suggest next steps.
        </p>
        <div className="capabilities">
          <div className="cap-cell">
            <h3>Inbox &amp; Calendar</h3>
            <p>Triage email, draft replies, manage scheduling, send reminders, and surface conflicts.</p>
          </div>
          <div className="cap-cell">
            <h3>Code &amp; Systems</h3>
            <p>Run shell commands, inspect repos, debug issues, and automate repetitive dev work.</p>
          </div>
          <div className="cap-cell">
            <h3>Research &amp; Files</h3>
            <p>Search the web, read local files, and combine both into usable summaries or reports.</p>
          </div>
          <div className="cap-cell">
            <h3>Always On</h3>
            <p>Run scheduled jobs, background tasks, and recurring workflows without waiting for a fresh prompt.</p>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── HOW IT WORKS ── */}
      <div className="section" id="how">
        <div className="section-tag">How It Works</div>
        <h2>One local gateway connects your channels, models, and tools.</h2>
        <p>
          OpenClaw runs a single local process called the Gateway — the control
          plane for your assistant. It connects your messaging channels to the
          model you choose, manages sessions, stores memory as local Markdown
          files, and executes tasks through modular skills. The Gateway is the
          infrastructure. The product is the assistant it creates.
        </p>
        <p>Your data stays on your hardware unless you decide otherwise.</p>

        <div className="arch-box">
          <div className="arch-label">Architecture</div>
          <div className="arch-stack">
            <div className="arch-layer layer-you">
              You — WhatsApp &middot; Telegram &middot; Slack &middot; Discord &middot; 20+ channels
            </div>
            <div className="arch-arrow">&#8597;</div>
            <div className="arch-layer layer-gateway">
              OpenClaw Gateway — sessions &middot; memory &middot; skills &middot; heartbeat
            </div>
            <div className="arch-arrow">&#8597;</div>
            <div className="arch-layer layer-models">
              Models — Claude &middot; GPT &middot; DeepSeek &middot; Nemotron &middot; Ollama
            </div>
            <div className="arch-arrow">&#8597;</div>
            <div className="arch-layer layer-tools">
              Tools — browser &middot; shell &middot; files &middot; APIs &middot; cron
            </div>
          </div>
          <div className="arch-caption">
            Runs on your machine. Model-agnostic. Privacy by default.<br />
            Extend with modular skills or build your own.
          </div>
        </div>

        <div className="nemo-callout" style={{ marginTop: "1.5rem" }}>
          <h3>Where NemoClaw Fits</h3>
          <p>
            NVIDIA built NemoClaw on top of OpenClaw for environments that need
            tighter controls around security, privacy, and execution. It adds
            the OpenShell runtime for sandboxed agent execution, local Nemotron
            model support, and policy-based privacy and security guardrails for
            running OpenClaw more safely in controlled environments. Currently
            in early preview.
          </p>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── VIDEO ── */}
      <div className="section" id="watch">
        <div className="section-tag">Watch</div>
        <h2>Start here.</h2>
        <div className="video-box">
          <div className="video-placeholder">
            <div className="video-coming-label">Video Coming Soon</div>
            <div className="video-sub">Claws Out — Episode 1</div>
          </div>
        </div>
        <p className="video-caption">
          A short explainer for people who want the mental model before they read the repo.
        </p>
      </div>

      <div className="divider"><hr /></div>

      {/* ── LIVE DEMO ── */}
      <div className="demo-wrap" id="demo">
        <div className="demo-inner">
          <div className="demo-tag">Live Demo</div>
          <h2 className="demo-h2">Talk to a real claw.</h2>
          <p className="demo-sub">
            This is a live OpenClaw instance running in a restricted demo
            environment. It can search the web, summarize content, and answer
            questions about OpenClaw in real time. It&apos;s the actual software,
            with a limited toolset and guardrails.
          </p>
          <DemoChat />
          <p className="demo-below">
            This demo runs a sandboxed OpenClaw instance with web search and
            summarization skills. A full setup on your own hardware can do
            significantly more — shell access, email, calendar, file management,
            smart home control, and thousands of community skills.
          </p>
          <p className="demo-disclaimer">
            Demo sessions are temporary. No personal data is collected. Rate
            limited. Powered by Claude Sonnet.
          </p>
        </div>
      </div>

      {/* ── SKILLS DIRECTORY ── */}
      <div className="skills-wrap" id="skills">
        <div className="skills-inner">
          <div className="section-tag" style={{ color: "var(--red)" }}>Skills Directory</div>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.3, marginBottom: "0.5rem",
          }}>
            What you can actually do with OpenClaw.
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-mid)", marginBottom: "1.5rem" }}>
            A curated shortlist of skills worth knowing about — not a canonical
            registry. These picks are opinionated, based on community adoption
            and published reviews. Always verify before installing. The official
            source is{" "}
            <a href="https://docs.openclaw.ai/cli/skills" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--red)", textDecoration: "none", fontWeight: 500 }}>
              ClawHub
            </a>.
          </p>
          <SkillsDirectory />
          <div className="skills-note">
            <span>Curated from ClawHub and community sources. Always review skills before installing.</span>
            <a href="https://docs.openclaw.ai/cli/skills" target="_blank" rel="noopener noreferrer">
              Full skills docs &rarr;
            </a>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── SETUP SELECTOR ── */}
      <div className="setup-section" id="setup">
        <div className="section-tag">Setup Guide</div>
        <h2 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
          lineHeight: 1.3, marginBottom: "0.5rem",
        }}>
          What should you run it on?
        </h2>
        <p style={{ fontSize: "0.92rem", color: "var(--text-mid)", marginBottom: "1.8rem", lineHeight: 1.7 }}>
          Pick your hardware and use case. We&apos;ll recommend a practical setup.
        </p>
        <SetupSelector />
      </div>

      <div className="divider"><hr /></div>

      {/* ── SECURITY CHECKLIST ── */}
      <div className="security-wrap" id="security">
        <div className="security-inner">
          <div className="section-tag" style={{ color: "var(--red)" }}>Security</div>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.3, marginBottom: "0.5rem",
          }}>
            Before you deploy, read this.
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-mid)", marginBottom: "1.8rem", lineHeight: 1.7 }}>
            OpenClaw has real security surface. These aren&apos;t theoretical risks —
            they&apos;ve been documented by Microsoft, Cisco, and the OpenClaw project
            itself. Use this checklist.
          </p>
          <SecurityChecklist />
          <div className="security-sources">
            Sources:{" "}
            <a href="https://docs.openclaw.ai/gateway/security" target="_blank" rel="noopener noreferrer">
              OpenClaw Security Docs
            </a>{" "}&middot;{" "}
            <a href="https://www.microsoft.com/en-us/security/blog/2026/02/19/running-openclaw-safely-identity-isolation-runtime-risk/" target="_blank" rel="noopener noreferrer">
              Microsoft Security Blog
            </a>{" "}&middot;{" "}
            <a href="https://github.com/slowmist/openclaw-security-practice-guide" target="_blank" rel="noopener noreferrer">
              SlowMist Security Guide
            </a>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── COMMUNITY PULSE ── */}
      <div className="pulse-wrap" id="community">
        <div className="pulse-inner">
          <div className="pulse-tag">Community</div>
          <h2 className="pulse-h2">Built in the open, by the community.</h2>
          <p className="pulse-sub">
            OpenClaw is open source. These are the people building it — live from the repo.
          </p>
          <CommunityPulse />
        </div>
      </div>

      {/* ── THREE PATHS ── */}
      <div className="paths-wrap" id="paths">
        <div className="paths-inner">
          <div className="section-tag">Go Deeper</div>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.3, marginBottom: "1rem",
          }}>
            Where do you want to go next?
          </h2>
          <div className="paths-grid">
            <a href="/overview" className="path-card">
              <h3>Understand</h3>
              <p>What OpenClaw is, what it does, and how the pieces fit together.</p>
              <div className="arrow">Read the overview &rarr;</div>
            </a>
            <a href="#watch" className="path-card">
              <h3>Watch</h3>
              <p>Short explainers for people who want the model fast.</p>
              <div className="arrow">Watch videos &rarr;</div>
            </a>
            <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="path-card">
              <h3>Go to the Source</h3>
              <p>Repo, docs, and primary materials for builders who want the raw thing.</p>
              <div className="arrow">View on GitHub &rarr;</div>
            </a>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div className="section about" id="about">
        <div className="section-tag">About This Site</div>
        <h2>What this site is.</h2>
        <p>
          KnowTheClaw is an independent educational resource created by
          practitioners working in and around the AI agent ecosystem. It is not
          the official OpenClaw project site. The goal is simple: explain a
          fast-moving technical project clearly enough that builders, operators,
          and leaders can understand what matters without digging through the
          repo first.
        </p>
        <p>
          This site has a point of view. We think the move from chatbots to
          agents that take action is real and still poorly explained. OpenClaw is
          one of the clearest examples, so we use it as the case study.
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-id">Know<span className="claw">The</span>Claw</div>
            <div className="footer-sub">Clear explanations of OpenClaw and the shift from chat to agents.</div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>This Site</h4>
              <ul>
                <li><a href="#shift">What Changed</a></li>
                <li><a href="#what">What It Does</a></li>
                <li><a href="#demo">Live Demo</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#setup">Setup</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Source Materials</h4>
              <ul>
                <li><a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">OpenClaw on GitHub</a></li>
                <li><a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer">openclaw.ai</a></li>
                <li><a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer">OpenClaw Docs</a></li>
                <li><a href="https://www.nvidia.com/en-us/ai/nemoclaw/" target="_blank" rel="noopener noreferrer">NemoClaw by NVIDIA</a></li>
                <li><a href="https://github.com/NVIDIA/NemoClaw" target="_blank" rel="noopener noreferrer">NemoClaw on GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
