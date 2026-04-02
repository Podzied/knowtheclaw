import Nav from "../components/Nav";

export default function Overview() {
  return (
    <>
      <Nav />

      <div className="hero" id="top">
        <div className="hero-tag fi">
          <span style={{ fontSize: "1rem" }}>&#x1F99E;</span> Overview
        </div>
        <h1 className="fi fi2">What OpenClaw is and how it works.</h1>
        <p className="hero-sub fi fi3">
          A plain-language overview of the architecture, the agent model, and why it matters — written for people who build things, not just people who follow AI news.
        </p>
      </div>

      <div className="section">
        <div className="section-tag">The Big Picture</div>
        <h2>One agent, running locally, working through your apps.</h2>
        <p>
          OpenClaw is an open-source AI agent that runs on your own hardware — a laptop, a Mac Mini, a Raspberry Pi, or a server. You message it through WhatsApp, Slack, Telegram, or Discord. It connects to the AI model you choose, keeps memory locally, and can execute real tasks: email triage, code generation, scheduling, research, and automation.
        </p>
        <p>
          It is not a chatbot. It is not a wrapper around an API. It is a local process that receives instructions through your existing messaging apps and takes action on your behalf using modular skills.
        </p>
      </div>

      <div className="divider"><hr /></div>

      <div className="section">
        <div className="section-tag">Architecture</div>
        <h2>The Gateway is the infrastructure. The product is the assistant it creates.</h2>
        <p>
          At the core of OpenClaw is the Gateway — a single local process that connects three layers: your messaging channels (inbound), AI models (reasoning), and tools (outbound). The Gateway manages sessions, memory, skills, and a heartbeat that keeps the agent always-on and proactive.
        </p>
        <p>
          Models are pluggable. You can use Claude, GPT, Nemotron, Ollama, or any provider with a compatible API. Memory stays on your machine. Skills are modular scripts that define what the agent can do — and the community builds new ones every day.
        </p>
      </div>

      <div className="divider"><hr /></div>

      <div className="section">
        <div className="section-tag">Why It Matters</div>
        <h2>The shift from conversation to delegation.</h2>
        <p>
          For the past few years, AI mostly meant chat: ask a question, get an answer, move on. The interface is changing. Agents don&apos;t just answer — they act. They handle your email, write your code, monitor your systems, and run tasks on a schedule.
        </p>
        <p>
          The important shift is not better conversation. It&apos;s delegated execution. OpenClaw is the open-source version of that shift — transparent, extensible, and under your control.
        </p>
      </div>

      <div className="divider"><hr /></div>

      <div className="section">
        <div className="section-tag">NemoClaw</div>
        <h2>The enterprise-grade distribution.</h2>
        <p>
          NemoClaw is NVIDIA&apos;s hardened distribution of OpenClaw, built for enterprise and edge deployment. It runs entirely on local Nemotron models, adds sandboxed execution environments, and enforces policy guardrails that limit what the agent can access and do. For teams that need auditability, isolation, and control — without giving up the flexibility of an open-source agent — NemoClaw is the clearest path.
        </p>
      </div>

      <div className="divider"><hr /></div>

      <div className="section">
        <div className="section-tag">What This Site Is</div>
        <h2>Independent. Not official.</h2>
        <p>
          KnowTheClaw is an independent educational resource created by practitioners working in and around the AI agent ecosystem. It is not the official OpenClaw project site and is not affiliated with or endorsed by the OpenClaw maintainers.
        </p>
        <p>
          We built this because the technology is moving fast, the documentation is fragmented, and most coverage focuses on hype rather than how things actually work. This site exists to close that gap — with clear explanations, real demos, and honest takes on what&apos;s ready and what isn&apos;t.
        </p>
      </div>

      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "2rem" }}>
        <div className="cta-row">
          <a href="/#demos" className="btn-primary">Watch the Demos</a>
          <a href="/#try-it" className="btn-secondary">Try It Yourself</a>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-id">Know<span className="claw">The</span>Claw</div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <ul>
                <li><a href="/#what">What It Does</a></li>
                <li><a href="/#demos">Demos</a></li>
                <li><a href="/#skills">Skills</a></li>
                <li><a href="/#security">Security</a></li>
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
