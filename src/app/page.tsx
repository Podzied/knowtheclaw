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
          <span style={{ fontSize: "1rem" }}>&#x1F99E;</span> Open-Source AI Agent
        </div>
        <h1 className="fi fi2">AI that acts, not just chats.</h1>
        <p className="hero-sub fi fi3">
          OpenClaw runs on your machine and handles real work — email, code, research, scheduling — through the apps you already use.
        </p>
        <div className="cta-row fi fi4">
          <a href="#demo" className="btn-primary">
            Try the Live Demo
          </a>
          <a href="#what" className="btn-secondary">
            How It Works
          </a>
        </div>
      </div>

      {/* ── THE SHIFT ── */}
      <div className="shift-wrap" id="shift">
        <div className="shift-inner">
          <div className="section-tag">What Changed</div>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.3, marginBottom: "1.1rem",
          }}>
            AI moved from answers to actions.
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.78, color: "var(--text-mid)" }}>
            Agents don&apos;t just answer questions — they triage email, schedule meetings, write code, and run recurring tasks. The shift isn&apos;t better conversation. It&apos;s delegated execution. OpenClaw is one of the clearest open-source examples.
          </p>
        </div>
      </div>

      {/* ── WHAT IT DOES ── */}
      <div className="section" id="what">
        <div className="section-tag">What It Does</div>
        <h2>A local AI agent that works through your existing tools.</h2>
        <p>
          OpenClaw runs on your machine — laptop, Mac Mini, Pi, or DGX Spark. You talk to it through WhatsApp, Slack, Telegram, or Discord. It connects to the model you choose, keeps memory locally, and executes tasks directly.
        </p>
        <div className="capabilities">
          <div className="cap-cell">
            <h3>Inbox &amp; Calendar</h3>
            <p>Triage email, draft replies, schedule meetings, send reminders.</p>
          </div>
          <div className="cap-cell">
            <h3>Code &amp; Systems</h3>
            <p>Run commands, inspect repos, debug issues, automate dev work.</p>
          </div>
          <div className="cap-cell">
            <h3>Research &amp; Files</h3>
            <p>Search the web, read local files, produce summaries and reports.</p>
          </div>
          <div className="cap-cell">
            <h3>Always On</h3>
            <p>Scheduled jobs, background tasks, recurring workflows.</p>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── HOW IT WORKS ── */}
      <div className="section" id="how">
        <div className="section-tag">How It Works</div>
        <h2>One gateway connects your channels, models, and tools.</h2>
        <p>
          The Gateway is a single local process — it connects your messaging channels to the model you choose, manages sessions, stores memory as local files, and executes tasks through modular skills. Your data stays on your hardware.
        </p>

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
            Runs locally. Model-agnostic. Privacy by default.
          </div>
        </div>

        <div className="nemo-callout" style={{ marginTop: "1.5rem" }}>
          <h3>NemoClaw</h3>
          <p>
            NVIDIA&apos;s hardened layer on top of OpenClaw. Adds sandboxed execution, local Nemotron models, and policy-based security guardrails. Early preview.
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
          Short explainer. Mental model before you read the repo.
        </p>
      </div>

      <div className="divider"><hr /></div>

      {/* ── LIVE DEMO ── */}
      <div className="demo-wrap" id="demo">
        <div className="demo-inner">
          <div className="demo-tag">Live Demo</div>
          <h2 className="demo-h2">Talk to a real claw.</h2>
          <p className="demo-sub">
            A live OpenClaw instance with web search and summarization. Real software, limited toolset, guardrails on.
          </p>
          <DemoChat />
          <p className="demo-below">
            This is a sandboxed demo. A full setup can do significantly more — shell, email, calendar, file management, smart home, and thousands of community skills.
          </p>
          <p className="demo-disclaimer">
            Temporary sessions. No data collected. Rate limited. Powered by Claude Sonnet.
          </p>
        </div>
      </div>

      {/* ── SKILLS DIRECTORY ── */}
      <div className="skills-wrap" id="skills">
        <div className="skills-inner">
          <div className="section-tag" style={{ color: "var(--red)" }}>Skills</div>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.3, marginBottom: "0.5rem",
          }}>
            What you can do with it.
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-mid)", marginBottom: "1.5rem" }}>
            Curated picks based on community adoption. Always verify before installing. Official source:{" "}
            <a href="https://docs.openclaw.ai/cli/skills" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--red)", textDecoration: "none", fontWeight: 500 }}>
              ClawHub
            </a>.
          </p>
          <SkillsDirectory />
          <div className="skills-note">
            <span>Review skills before installing.</span>
            <a href="https://docs.openclaw.ai/cli/skills" target="_blank" rel="noopener noreferrer">
              Full docs &rarr;
            </a>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── SETUP SELECTOR ── */}
      <div className="setup-section" id="setup">
        <div className="section-tag">Setup</div>
        <h2 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
          lineHeight: 1.3, marginBottom: "0.5rem",
        }}>
          What should you run it on?
        </h2>
        <p style={{ fontSize: "0.92rem", color: "var(--text-mid)", marginBottom: "1.8rem", lineHeight: 1.7 }}>
          Pick your hardware, use case, and privacy preference.
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
            Real risks documented by Microsoft, Cisco, and the OpenClaw project.
          </p>
          <SecurityChecklist />
          <div className="security-sources">
            Sources:{" "}
            <a href="https://docs.openclaw.ai/gateway/security" target="_blank" rel="noopener noreferrer">OpenClaw Docs</a>{" "}&middot;{" "}
            <a href="https://www.microsoft.com/en-us/security/blog/2026/02/19/running-openclaw-safely-identity-isolation-runtime-risk/" target="_blank" rel="noopener noreferrer">Microsoft</a>{" "}&middot;{" "}
            <a href="https://github.com/slowmist/openclaw-security-practice-guide" target="_blank" rel="noopener noreferrer">SlowMist</a>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── COMMUNITY PULSE ── */}
      <div className="pulse-wrap" id="community">
        <div className="pulse-inner">
          <div className="pulse-tag">Community</div>
          <h2 className="pulse-h2">Built in the open.</h2>
          <p className="pulse-sub">
            Live from the OpenClaw repo.
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
            Where next?
          </h2>
          <div className="paths-grid">
            <a href="/overview" className="path-card">
              <h3>Understand</h3>
              <p>How the pieces fit together.</p>
              <div className="arrow">Overview &rarr;</div>
            </a>
            <a href="#watch" className="path-card">
              <h3>Watch</h3>
              <p>Short video explainers.</p>
              <div className="arrow">Videos &rarr;</div>
            </a>
            <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="path-card">
              <h3>Source</h3>
              <p>Repo, docs, raw materials.</p>
              <div className="arrow">GitHub &rarr;</div>
            </a>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div className="section about" id="about">
        <div className="section-tag">About</div>
        <h2>What this site is.</h2>
        <p>
          KnowTheClaw is an independent resource by practitioners in the AI agent ecosystem. Not the official OpenClaw site. The goal: explain a fast-moving project clearly enough that you don&apos;t need to dig through the repo.
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-id">Know<span className="claw">The</span>Claw</div>
            <div className="footer-sub">OpenClaw, explained.</div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Site</h4>
              <ul>
                <li><a href="#what">What It Does</a></li>
                <li><a href="#demo">Live Demo</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#setup">Setup</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#community">Community</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Source</h4>
              <ul>
                <li><a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer">openclaw.ai</a></li>
                <li><a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer">Docs</a></li>
                <li><a href="https://www.nvidia.com/en-us/ai/nemoclaw/" target="_blank" rel="noopener noreferrer">NemoClaw</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
