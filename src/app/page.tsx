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
        <h1 className="fi fi2">Your computer just got an employee.</h1>
        <p className="hero-sub fi fi3">
          OpenClaw is an open-source AI agent that runs on your machine. It reads your email, writes code, searches the web, manages files, and runs tasks on a schedule — through the apps you already use. No cloud. No subscription. Yours.
        </p>
        <div className="cta-row fi fi4">
          <a href="#try-it" className="btn-primary">Talk to the Agent</a>
          <a href="#demo-1" className="btn-secondary">Watch the Explainer</a>
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
            For the past few years, AI mostly meant chat: ask a question, get an answer, move on. Now the interface is changing. Agents handle your email, write your code, and run tasks on a schedule. OpenClaw is the open-source version of that.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.78, color: "var(--text-mid)", marginTop: "1rem", fontWeight: 500 }}>
            The important shift is not better conversation. It&apos;s delegated execution.
          </p>
        </div>
      </div>

      {/* ── EXPLAINER VIDEO ── */}
      <div id="demos">
        <div className="demo-section" id="demo-1">
          <div className="demo-section-inner">
            <div className="demo-section-tag">Explainer</div>
            <h2 className="demo-section-h2">The ecosystem in 60 seconds.</h2>
            <p className="demo-section-sub">
              People keep mixing up OpenClaw, NemoClaw, and OpenShell. They&apos;re not competing products — they&apos;re layers. One is the agent, one locks it down, and one packages the whole thing so you can install it with a single command. This video sorts it out.
            </p>
            <div className="video-box">
              <video
                controls
                preload="metadata"
                playsInline
                style={{ width: "100%", display: "block", borderRadius: "8px" }}
              >
                <source src="/videos/openclaw-explained.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Explainer Interstitial */}
        <div className="interstitial">
          <div className="interstitial-inner">
            <p>
              Three layers, one stack. Now here&apos;s why that architecture matters.
            </p>
          </div>
        </div>

        {/* Video 2 — Security */}
        <div className="demo-section" id="demo-2">
          <div className="demo-section-inner">
            <div className="demo-section-tag">Security</div>
            <h2 className="demo-section-h2">The problem with self-policing agents.</h2>
            <p className="demo-section-sub">
              Most agent frameworks put their safety checks inside the agent itself — same process, same environment. That works until it doesn&apos;t. This video covers a real incident and explains how OpenShell takes a fundamentally different approach to agent security.
            </p>
            <div className="video-box">
              <video
                controls
                preload="metadata"
                playsInline
                style={{ width: "100%", display: "block", borderRadius: "8px" }}
              >
                <source src="/videos/openclaw-video-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Interstitial before demos */}
        <div className="interstitial">
          <div className="interstitial-inner">
            <p>
              That&apos;s the theory. Here&apos;s what it actually looks like when someone uses it.
            </p>
          </div>
        </div>

        {/* Demo 1 — Trip Planning */}
        <div className="demo-section" id="demo-3">
          <div className="demo-section-inner">
            <div className="demo-section-tag">Demo</div>
            <h2 className="demo-section-h2">Plan a trip without touching your inbox.</h2>
            <p className="demo-section-sub">
              A real trip to San Francisco. Flights, hotel, meetings, conflicts — the agent pulls it all from your email and calendar, figures out the logistics, and drafts reschedule emails where needed. You just approve and send.
            </p>
            <div className="video-box">
              <video
                controls
                preload="metadata"
                playsInline
                style={{ width: "100%", display: "block", borderRadius: "8px" }}
              >
                <source src="/videos/demo-01.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Demo 2 — Workspace Comparison */}
        <div className="demo-section" id="demo-4">
          <div className="demo-section-inner">
            <div className="demo-section-tag">Demo</div>
            <h2 className="demo-section-h2">Compare options without opening ten tabs.</h2>
            <p className="demo-section-sub">
              Three co-working spaces, one off-site to plan. The agent visits each site, pulls pricing, reviews, amenities, and transit access, then picks the best fit and writes the booking email. Research that would take an hour, done in minutes.
            </p>
            <div className="video-box">
              <video
                controls
                preload="metadata"
                playsInline
                style={{ width: "100%", display: "block", borderRadius: "8px" }}
              >
                <source src="/videos/demo-02.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Demo 3 — Competitive Research */}
        <div className="demo-section" id="demo-5">
          <div className="demo-section-inner">
            <div className="demo-section-tag">Demo</div>
            <h2 className="demo-section-h2">Build a competitive cheat sheet before your pitch.</h2>
            <p className="demo-section-sub">
              Two competitors, one week until the pitch. The agent searches for their latest announcements, pricing changes, and what people are saying on Twitter and Hacker News — then builds a positioning brief with strengths, weaknesses, and your best angle of attack.
            </p>
            <div className="video-box">
              <video
                controls
                preload="metadata"
                playsInline
                style={{ width: "100%", display: "block", borderRadius: "8px" }}
              >
                <source src="/videos/demo-03.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* ── GUIDED LIVE WIDGET ── */}
      <div className="demo-wrap" id="try-it">
        <div className="demo-inner">
          <div className="demo-tag">Try It</div>
          <h2 className="demo-h2">Talk to a claw.</h2>
          <p className="demo-sub">
            Live OpenClaw agent. Pick a prompt or type your own. Sandboxed — no data stored.
          </p>
          <div className="prompt-cards">
            <button className="prompt-card" data-prompt="research">
              <div className="prompt-card-icon">&#x1F50D;</div>
              <h3>Research</h3>
              <p>Deep-dive a topic with web search and source synthesis.</p>
            </button>
            <button className="prompt-card" data-prompt="monitoring">
              <div className="prompt-card-icon">&#x1F4E1;</div>
              <h3>Monitoring</h3>
              <p>What changed this week in a repo, API, or news topic.</p>
            </button>
            <button className="prompt-card" data-prompt="evaluation">
              <div className="prompt-card-icon">&#x1F4CB;</div>
              <h3>Evaluation</h3>
              <p>Paste a URL and get a structured analyst readout.</p>
            </button>
          </div>
          <DemoChat />
          <p className="demo-below">
            This demo is limited. A full setup adds shell, email, calendar, smart home, and thousands more skills.
          </p>
          <p className="demo-disclaimer">
            No data stored. Sandboxed. Rate limited.
          </p>
        </div>
      </div>

      {/* ── WHAT IT DOES ── */}
      <div className="section" id="what">
        <div className="section-tag">What It Does</div>
        <h2>Runs on your machine. Works through your apps.</h2>
        <p>
          Laptop, Mac Mini, Pi, or server. You message it on WhatsApp, Slack, or Telegram. It connects to the model you choose, keeps memory locally, and can execute tasks directly.
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
        <h2>One local gateway connects your channels, models, and tools.</h2>
        <p>
          The Gateway is the infrastructure. The product is the assistant it creates.
        </p>

        <div className="arch-box">
          <div className="arch-label">Stack</div>
          <div className="arch-stack">
            <div className="arch-layer layer-you">
              You — WhatsApp &middot; Telegram &middot; Slack &middot; Discord
            </div>
            <div className="arch-arrow">&#8597;</div>
            <div className="arch-layer layer-gateway">
              Gateway — sessions &middot; memory &middot; skills &middot; heartbeat
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
            NemoClaw is NVIDIA&apos;s hardened distribution of OpenClaw, built for enterprise and edge deployment. It runs entirely on local Nemotron models, adds sandboxed execution environments, and enforces policy guardrails that limit what the agent can access and do. For teams that need auditability, isolation, and control — without giving up the flexibility of an open-source agent — NemoClaw is the clearest path. It&apos;s currently in early preview.
          </p>
        </div>
      </div>

      <div className="divider"><hr /></div>


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
            <a href="#demos" className="path-card">
              <h3>Watch the Demos</h3>
              <p>Three walkthroughs showing what OpenClaw actually does.</p>
              <div className="arrow">Demos &rarr;</div>
            </a>
            <a href="#try-it" className="path-card">
              <h3>Try It Yourself</h3>
              <p>Talk to a live instance with pre-seeded prompts.</p>
              <div className="arrow">Live Widget &rarr;</div>
            </a>
            <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="path-card">
              <h3>Go to the Source</h3>
              <p>The repo, the docs, and everything behind it.</p>
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
          KnowTheClaw is an independent educational resource created by practitioners working in and around the AI agent ecosystem. It is not the official OpenClaw project site and is not affiliated with or endorsed by the OpenClaw maintainers.
        </p>
        <p>
          We built this because the technology is moving fast, the documentation is fragmented, and most coverage focuses on hype rather than how things actually work. This site exists to close that gap — with clear explanations, real demos, and honest takes on what&apos;s ready and what isn&apos;t.
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
                <li><a href="https://build.nvidia.com/nvidia/nemoclaw" target="_blank" rel="noopener noreferrer">NemoClaw by NVIDIA</a></li>
                <li><a href="https://github.com/NVIDIA/NemoClaw" target="_blank" rel="noopener noreferrer">NemoClaw on GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
