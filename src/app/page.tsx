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
        <h1 className="fi fi2">Your computer, doing things for you.</h1>
        <p className="hero-sub fi fi3">
          OpenClaw is an AI agent that runs locally and takes action — email, code, research, scheduling — through apps you already use.
        </p>
        <div className="cta-row fi fi4">
          <a href="#demo" className="btn-primary">Try It</a>
          <a href="#what" className="btn-secondary">Learn More</a>
        </div>
      </div>

      {/* ── THE SHIFT ── */}
      <div className="shift-wrap" id="shift">
        <div className="shift-inner">
          <div className="section-tag">The Shift</div>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.3, marginBottom: "1.1rem",
          }}>
            From answers to actions.
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.78, color: "var(--text-mid)" }}>
            AI used to mean chat. Now it means delegation. Agents handle your email, write your code, and run tasks on a schedule. OpenClaw is the open-source version of that.
          </p>
        </div>
      </div>

      {/* ── WHAT IT DOES ── */}
      <div className="section" id="what">
        <div className="section-tag">What It Does</div>
        <h2>Runs on your machine. Works through your apps.</h2>
        <p>
          Laptop, Mac Mini, Pi, or server. You message it on WhatsApp, Slack, or Telegram. It picks the model, remembers context, and does the work.
        </p>
        <div className="capabilities">
          <div className="cap-cell">
            <h3>Email &amp; Calendar</h3>
            <p>Triage, draft, schedule, remind.</p>
          </div>
          <div className="cap-cell">
            <h3>Code &amp; DevOps</h3>
            <p>Shell, repos, CI, debugging.</p>
          </div>
          <div className="cap-cell">
            <h3>Research</h3>
            <p>Web search, file reading, summaries.</p>
          </div>
          <div className="cap-cell">
            <h3>Always On</h3>
            <p>Cron jobs, background tasks, automations.</p>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── HOW IT WORKS ── */}
      <div className="section" id="how">
        <div className="section-tag">Architecture</div>
        <h2>One process. Channels in, actions out.</h2>
        <p>
          The Gateway connects your messaging apps to the model and tools. Memory stays local. Skills are modular.
        </p>

        <div className="arch-box">
          <div className="arch-label">Stack</div>
          <div className="arch-stack">
            <div className="arch-layer layer-you">
              You — WhatsApp &middot; Telegram &middot; Slack &middot; Discord
            </div>
            <div className="arch-arrow">&#8597;</div>
            <div className="arch-layer layer-gateway">
              Gateway — sessions &middot; memory &middot; skills
            </div>
            <div className="arch-arrow">&#8597;</div>
            <div className="arch-layer layer-models">
              Models — Claude &middot; GPT &middot; Nemotron &middot; Ollama
            </div>
            <div className="arch-arrow">&#8597;</div>
            <div className="arch-layer layer-tools">
              Tools — browser &middot; shell &middot; files &middot; APIs
            </div>
          </div>
          <div className="arch-caption">
            Local. Model-agnostic. Private by default.
          </div>
        </div>

        <div className="nemo-callout" style={{ marginTop: "1.5rem" }}>
          <h3>NemoClaw</h3>
          <p>
            NVIDIA&apos;s hardened version. Sandboxed execution, local Nemotron models, policy guardrails. Early preview.
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
            <div className="video-coming-label">Coming Soon</div>
            <div className="video-sub">Claws Out — Ep. 1</div>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── LIVE DEMO ── */}
      <div className="demo-wrap" id="demo">
        <div className="demo-inner">
          <div className="demo-tag">Live Demo</div>
          <h2 className="demo-h2">Talk to a real claw.</h2>
          <p className="demo-sub">
            Live OpenClaw instance. Web search, summarization, OpenClaw Q&amp;A. Sandboxed.
          </p>
          <DemoChat />
          <p className="demo-below">
            This demo is limited. A full setup adds shell, email, calendar, smart home, and thousands more skills.
          </p>
          <p className="demo-disclaimer">
            No data stored. Rate limited. Claude Sonnet.
          </p>
        </div>
      </div>

      {/* ── SKILLS ── */}
      <div className="skills-wrap" id="skills">
        <div className="skills-inner">
          <div className="section-tag" style={{ color: "var(--red)" }}>Skills</div>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.3, marginBottom: "0.5rem",
          }}>
            What it can do.
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-mid)", marginBottom: "1.5rem" }}>
            Community picks. Verify before installing. Source:{" "}
            <a href="https://docs.openclaw.ai/cli/skills" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--red)", textDecoration: "none", fontWeight: 500 }}>
              ClawHub
            </a>
          </p>
          <SkillsDirectory />
          <div className="skills-note">
            <span>Always review source code first.</span>
            <a href="https://docs.openclaw.ai/cli/skills" target="_blank" rel="noopener noreferrer">
              Docs &rarr;
            </a>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── SETUP ── */}
      <div className="setup-section" id="setup">
        <div className="section-tag">Setup</div>
        <h2 style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
          lineHeight: 1.3, marginBottom: "1.5rem",
        }}>
          What should you run it on?
        </h2>
        <SetupSelector />
      </div>

      <div className="divider"><hr /></div>

      {/* ── SECURITY ── */}
      <div className="security-wrap" id="security">
        <div className="security-inner">
          <div className="section-tag" style={{ color: "var(--red)" }}>Security</div>
          <h2 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.3, marginBottom: "1.5rem",
          }}>
            Read this before deploying.
          </h2>
          <SecurityChecklist />
          <div className="security-sources">
            <a href="https://docs.openclaw.ai/gateway/security" target="_blank" rel="noopener noreferrer">OpenClaw Docs</a>{" "}&middot;{" "}
            <a href="https://www.microsoft.com/en-us/security/blog/2026/02/19/running-openclaw-safely-identity-isolation-runtime-risk/" target="_blank" rel="noopener noreferrer">Microsoft</a>{" "}&middot;{" "}
            <a href="https://github.com/slowmist/openclaw-security-practice-guide" target="_blank" rel="noopener noreferrer">SlowMist</a>
          </div>
        </div>
      </div>

      <div className="divider"><hr /></div>

      {/* ── COMMUNITY ── */}
      <div className="pulse-wrap" id="community">
        <div className="pulse-inner">
          <div className="pulse-tag">Community</div>
          <h2 className="pulse-h2">Built in the open.</h2>
          <CommunityPulse />
        </div>
      </div>

      {/* ── PATHS ── */}
      <div className="paths-wrap" id="paths">
        <div className="paths-inner">
          <div className="paths-grid">
            <a href="/overview" className="path-card">
              <h3>Understand</h3>
              <p>How it all fits together.</p>
              <div className="arrow">Overview &rarr;</div>
            </a>
            <a href="#watch" className="path-card">
              <h3>Watch</h3>
              <p>Video explainers.</p>
              <div className="arrow">Videos &rarr;</div>
            </a>
            <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="path-card">
              <h3>Source</h3>
              <p>The repo.</p>
              <div className="arrow">GitHub &rarr;</div>
            </a>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div className="section about" id="about">
        <div className="section-tag">About</div>
        <h2>Independent. Not official.</h2>
        <p>
          Made by practitioners. Not affiliated with the OpenClaw project. We just think this stuff matters and nobody&apos;s explaining it well yet.
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-id">Know<span className="claw">The</span>Claw</div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <ul>
                <li><a href="#what">What It Does</a></li>
                <li><a href="#demo">Demo</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#security">Security</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <ul>
                <li><a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer">openclaw.ai</a></li>
                <li><a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer">Docs</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
