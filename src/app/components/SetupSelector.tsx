'use client'

import { useState } from 'react'

type Hardware = 'macmini' | 'laptop' | 'rpi' | 'dgx' | 'vps'
type UseCase = 'personal' | 'dev' | 'team' | 'experiment'
type Privacy = 'local' | 'hybrid' | 'cloud'

interface Config {
  tag: string
  title: string
  desc: string
  cmd: string
}

const configs: Record<string, Config> = {
  'macmini-personal-local': { tag: 'Recommended', title: 'Mac Mini Home Server', desc: 'Always-on local agent with full privacy. Best general-purpose setup.', cmd: 'openclaw init --mode local --model llama3 --gateway lan' },
  'macmini-personal-hybrid': { tag: 'Balanced', title: 'Mac Mini + Cloud Boost', desc: 'Local by default, cloud for heavy tasks. Good balance.', cmd: 'openclaw init --mode hybrid --local llama3 --cloud claude' },
  'macmini-personal-cloud': { tag: 'Easy start', title: 'Mac Mini Cloud Agent', desc: 'Uses cloud models for everything. Simplest setup.', cmd: 'openclaw init --mode cloud --model claude --gateway lan' },
  'macmini-dev-local': { tag: 'Dev-ready', title: 'Local Dev Workstation', desc: 'Full local stack for development workflows.', cmd: 'openclaw init --mode local --model codellama --skills dev-tools' },
  'macmini-dev-hybrid': { tag: 'Recommended', title: 'Dev Hybrid Setup', desc: 'Local for code, cloud for complex reasoning.', cmd: 'openclaw init --mode hybrid --local codellama --cloud claude --skills dev-tools' },
  'macmini-dev-cloud': { tag: 'Quick setup', title: 'Cloud Dev Agent', desc: 'Cloud-powered development assistant.', cmd: 'openclaw init --mode cloud --model claude --skills dev-tools' },
  'macmini-team-local': { tag: 'Private', title: 'Team Local Server', desc: 'Shared agent on LAN. Full data privacy.', cmd: 'openclaw init --mode local --model llama3 --gateway lan --multi-user' },
  'macmini-team-hybrid': { tag: 'Recommended', title: 'Team Hybrid Server', desc: 'Shared agent with cloud fallback for heavy tasks.', cmd: 'openclaw init --mode hybrid --local llama3 --cloud claude --multi-user' },
  'macmini-team-cloud': { tag: 'Scalable', title: 'Team Cloud Hub', desc: 'Cloud-powered shared agent for teams.', cmd: 'openclaw init --mode cloud --model claude --multi-user' },
  'macmini-experiment-local': { tag: 'Sandbox', title: 'Local Experiment Box', desc: 'Isolated environment for testing skills and models.', cmd: 'openclaw init --mode local --model llama3 --sandbox' },
  'macmini-experiment-hybrid': { tag: 'Flexible', title: 'Hybrid Lab', desc: 'Test locally, benchmark against cloud models.', cmd: 'openclaw init --mode hybrid --local llama3 --cloud claude --sandbox' },
  'macmini-experiment-cloud': { tag: 'Compare', title: 'Cloud Testing', desc: 'Quick experiments with cloud models.', cmd: 'openclaw init --mode cloud --model claude --sandbox' },

  'laptop-personal-local': { tag: 'Portable', title: 'Laptop Local Agent', desc: 'Runs on your laptop. Works offline.', cmd: 'openclaw init --mode local --model llama3-small --gateway localhost' },
  'laptop-personal-hybrid': { tag: 'Recommended', title: 'Laptop Hybrid', desc: 'Light model locally, cloud when connected.', cmd: 'openclaw init --mode hybrid --local phi3 --cloud claude' },
  'laptop-personal-cloud': { tag: 'Lightest', title: 'Laptop Cloud Agent', desc: 'Minimal local resources. Needs internet.', cmd: 'openclaw init --mode cloud --model claude' },
  'laptop-dev-local': { tag: 'Offline-ready', title: 'Portable Dev Setup', desc: 'Lightweight code assistant that works anywhere.', cmd: 'openclaw init --mode local --model codellama-small --skills dev-tools' },
  'laptop-dev-hybrid': { tag: 'Recommended', title: 'Laptop Dev Hybrid', desc: 'Local autocomplete, cloud for complex tasks.', cmd: 'openclaw init --mode hybrid --local phi3 --cloud claude --skills dev-tools' },
  'laptop-dev-cloud': { tag: 'Simple', title: 'Laptop Cloud Dev', desc: 'Full cloud dev assistant on any laptop.', cmd: 'openclaw init --mode cloud --model claude --skills dev-tools' },
  'laptop-team-local': { tag: 'Limited', title: 'Laptop Team (Local)', desc: 'Possible but not ideal. Consider a dedicated server.', cmd: 'openclaw init --mode local --model phi3 --gateway lan --multi-user' },
  'laptop-team-hybrid': { tag: 'Workable', title: 'Laptop Team Hybrid', desc: 'Can work for small teams with cloud offloading.', cmd: 'openclaw init --mode hybrid --local phi3 --cloud claude --multi-user' },
  'laptop-team-cloud': { tag: 'Recommended', title: 'Laptop Team Cloud', desc: 'Cloud handles the load. Laptop just routes.', cmd: 'openclaw init --mode cloud --model claude --multi-user' },
  'laptop-experiment-local': { tag: 'Quick test', title: 'Laptop Sandbox', desc: 'Fast local experiments with small models.', cmd: 'openclaw init --mode local --model phi3 --sandbox' },
  'laptop-experiment-hybrid': { tag: 'Compare', title: 'Laptop Hybrid Lab', desc: 'Test small vs large models side by side.', cmd: 'openclaw init --mode hybrid --local phi3 --cloud claude --sandbox' },
  'laptop-experiment-cloud': { tag: 'Fastest', title: 'Cloud Experiments', desc: 'Skip setup, go straight to testing.', cmd: 'openclaw init --mode cloud --model claude --sandbox' },

  'rpi-personal-local': { tag: 'Low power', title: 'Pi Home Agent', desc: 'Always-on, ultra low power. Limited model size.', cmd: 'openclaw init --mode local --model tinyllama --gateway lan' },
  'rpi-personal-hybrid': { tag: 'Recommended', title: 'Pi + Cloud Hybrid', desc: 'Pi handles routing, cloud handles thinking.', cmd: 'openclaw init --mode hybrid --local tinyllama --cloud claude' },
  'rpi-personal-cloud': { tag: 'Best for Pi', title: 'Pi Cloud Gateway', desc: 'Pi as always-on gateway to cloud models.', cmd: 'openclaw init --mode cloud --model claude --gateway lan' },
  'rpi-dev-local': { tag: 'Very limited', title: 'Pi Dev (Local)', desc: 'Only for very lightweight dev tasks.', cmd: 'openclaw init --mode local --model tinyllama --skills dev-tools' },
  'rpi-dev-hybrid': { tag: 'Workable', title: 'Pi Dev Hybrid', desc: 'Basic local tasks, cloud for code generation.', cmd: 'openclaw init --mode hybrid --local tinyllama --cloud claude --skills dev-tools' },
  'rpi-dev-cloud': { tag: 'Recommended', title: 'Pi Cloud Dev', desc: 'Pi routes to cloud. Full dev capability.', cmd: 'openclaw init --mode cloud --model claude --skills dev-tools' },
  'rpi-team-local': { tag: 'Not recommended', title: 'Pi Team (Local)', desc: 'Too limited for team use. Consider VPS.', cmd: 'openclaw init --mode local --model tinyllama --multi-user' },
  'rpi-team-hybrid': { tag: 'Minimal', title: 'Pi Team Hybrid', desc: 'Pi as gateway only. Cloud does all work.', cmd: 'openclaw init --mode hybrid --local tinyllama --cloud claude --multi-user' },
  'rpi-team-cloud': { tag: 'Best option', title: 'Pi Team Gateway', desc: 'Pi as always-on hub. Cloud handles requests.', cmd: 'openclaw init --mode cloud --model claude --multi-user' },
  'rpi-experiment-local': { tag: 'Educational', title: 'Pi Tinkering', desc: 'Great for learning. Limited for real work.', cmd: 'openclaw init --mode local --model tinyllama --sandbox' },
  'rpi-experiment-hybrid': { tag: 'Fun', title: 'Pi Experiment Hybrid', desc: 'See what a tiny model can do vs cloud.', cmd: 'openclaw init --mode hybrid --local tinyllama --cloud claude --sandbox' },
  'rpi-experiment-cloud': { tag: 'Easy', title: 'Pi Cloud Lab', desc: 'Use Pi as your experiment gateway.', cmd: 'openclaw init --mode cloud --model claude --sandbox' },

  'dgx-personal-local': { tag: 'Overkill', title: 'DGX Personal', desc: 'Maximum local power. Run any model.', cmd: 'openclaw init --mode local --model llama3-70b --gpu' },
  'dgx-personal-hybrid': { tag: 'Flexible', title: 'DGX Hybrid', desc: 'Local large models + cloud API access.', cmd: 'openclaw init --mode hybrid --local llama3-70b --cloud claude --gpu' },
  'dgx-personal-cloud': { tag: 'Unnecessary', title: 'DGX Cloud', desc: 'You have a DGX. Use it locally.', cmd: 'openclaw init --mode cloud --model claude' },
  'dgx-dev-local': { tag: 'Recommended', title: 'DGX Dev Powerhouse', desc: 'Run the biggest code models locally.', cmd: 'openclaw init --mode local --model codellama-70b --gpu --skills dev-tools' },
  'dgx-dev-hybrid': { tag: 'Maximum', title: 'DGX Dev Hybrid', desc: 'Best of both worlds. Local + cloud models.', cmd: 'openclaw init --mode hybrid --local codellama-70b --cloud claude --gpu --skills dev-tools' },
  'dgx-dev-cloud': { tag: 'Wasteful', title: 'DGX Cloud Dev', desc: 'Why use cloud when you have a DGX?', cmd: 'openclaw init --mode cloud --model claude --skills dev-tools' },
  'dgx-team-local': { tag: 'Recommended', title: 'DGX Team Server', desc: 'Dedicated AI server for your team. Full privacy.', cmd: 'openclaw init --mode local --model llama3-70b --gpu --multi-user' },
  'dgx-team-hybrid': { tag: 'Scalable', title: 'DGX Team Hybrid', desc: 'Local primary, cloud overflow.', cmd: 'openclaw init --mode hybrid --local llama3-70b --cloud claude --gpu --multi-user' },
  'dgx-team-cloud': { tag: 'Odd choice', title: 'DGX Team Cloud', desc: 'Cloud models on a DGX. Not ideal.', cmd: 'openclaw init --mode cloud --model claude --multi-user' },
  'dgx-experiment-local': { tag: 'Beast mode', title: 'DGX Lab', desc: 'Run any experiment at full speed.', cmd: 'openclaw init --mode local --model llama3-70b --gpu --sandbox' },
  'dgx-experiment-hybrid': { tag: 'Compare', title: 'DGX Benchmark Lab', desc: 'Compare local 70B against cloud APIs.', cmd: 'openclaw init --mode hybrid --local llama3-70b --cloud claude --gpu --sandbox' },
  'dgx-experiment-cloud': { tag: 'Why?', title: 'DGX Cloud Lab', desc: 'You really should use local models.', cmd: 'openclaw init --mode cloud --model claude --sandbox' },

  'vps-personal-local': { tag: 'Budget', title: 'VPS Local Agent', desc: 'Small model on a cheap VPS. Always on.', cmd: 'openclaw init --mode local --model phi3 --gateway 0.0.0.0' },
  'vps-personal-hybrid': { tag: 'Recommended', title: 'VPS Hybrid Agent', desc: 'VPS routes + manages, cloud thinks.', cmd: 'openclaw init --mode hybrid --local phi3 --cloud claude --gateway 0.0.0.0' },
  'vps-personal-cloud': { tag: 'Simplest', title: 'VPS Cloud Gateway', desc: 'VPS as always-on cloud gateway.', cmd: 'openclaw init --mode cloud --model claude --gateway 0.0.0.0' },
  'vps-dev-local': { tag: 'Limited', title: 'VPS Dev (Local)', desc: 'Small model for basic dev tasks.', cmd: 'openclaw init --mode local --model phi3 --skills dev-tools --gateway 0.0.0.0' },
  'vps-dev-hybrid': { tag: 'Recommended', title: 'VPS Dev Hybrid', desc: 'Local for quick tasks, cloud for heavy lifting.', cmd: 'openclaw init --mode hybrid --local phi3 --cloud claude --skills dev-tools --gateway 0.0.0.0' },
  'vps-dev-cloud': { tag: 'Simple', title: 'VPS Cloud Dev', desc: 'Cloud-powered dev on a VPS.', cmd: 'openclaw init --mode cloud --model claude --skills dev-tools --gateway 0.0.0.0' },
  'vps-team-local': { tag: 'Tight', title: 'VPS Team (Local)', desc: 'Works for small teams with small models.', cmd: 'openclaw init --mode local --model phi3 --multi-user --gateway 0.0.0.0' },
  'vps-team-hybrid': { tag: 'Recommended', title: 'VPS Team Hybrid', desc: 'VPS coordinates, cloud processes.', cmd: 'openclaw init --mode hybrid --local phi3 --cloud claude --multi-user --gateway 0.0.0.0' },
  'vps-team-cloud': { tag: 'Scalable', title: 'VPS Team Cloud', desc: 'VPS as team hub, all cloud processing.', cmd: 'openclaw init --mode cloud --model claude --multi-user --gateway 0.0.0.0' },
  'vps-experiment-local': { tag: 'Cheap lab', title: 'VPS Sandbox', desc: 'Spin up, experiment, tear down.', cmd: 'openclaw init --mode local --model phi3 --sandbox --gateway 0.0.0.0' },
  'vps-experiment-hybrid': { tag: 'Flexible', title: 'VPS Hybrid Lab', desc: 'Test different model combinations.', cmd: 'openclaw init --mode hybrid --local phi3 --cloud claude --sandbox --gateway 0.0.0.0' },
  'vps-experiment-cloud': { tag: 'Quick', title: 'VPS Cloud Lab', desc: 'Fast cloud experiments on a VPS.', cmd: 'openclaw init --mode cloud --model claude --sandbox --gateway 0.0.0.0' },
}

const hardwareOptions: { value: Hardware; label: string }[] = [
  { value: 'macmini', label: 'Mac Mini' },
  { value: 'laptop', label: 'Laptop' },
  { value: 'rpi', label: 'Raspberry Pi' },
  { value: 'dgx', label: 'DGX / GPU Server' },
  { value: 'vps', label: 'VPS / Cloud VM' },
]

const useOptions: { value: UseCase; label: string }[] = [
  { value: 'personal', label: 'Personal' },
  { value: 'dev', label: 'Development' },
  { value: 'team', label: 'Team' },
  { value: 'experiment', label: 'Experiment' },
]

const privacyOptions: { value: Privacy; label: string }[] = [
  { value: 'local', label: 'Fully Local' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'cloud', label: 'Cloud' },
]

export default function SetupSelector() {
  const [hardware, setHardware] = useState<Hardware | null>(null)
  const [useCase, setUseCase] = useState<UseCase | null>(null)
  const [privacy, setPrivacy] = useState<Privacy | null>(null)

  const configKey = hardware && useCase && privacy ? `${hardware}-${useCase}-${privacy}` : null
  const result = configKey ? configs[configKey] : null

  return (
    <div>
      <div className="setup-step">
        <div className="setup-step-label">1. What hardware?</div>
        <div className="setup-options">
          {hardwareOptions.map((opt) => (
            <button
              key={opt.value}
              className={`setup-opt ${hardware === opt.value ? 'selected' : ''}`}
              onClick={() => setHardware(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="setup-step">
        <div className="setup-step-label">2. Primary use case?</div>
        <div className="setup-options">
          {useOptions.map((opt) => (
            <button
              key={opt.value}
              className={`setup-opt ${useCase === opt.value ? 'selected' : ''}`}
              onClick={() => setUseCase(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="setup-step">
        <div className="setup-step-label">3. Privacy preference?</div>
        <div className="setup-options">
          {privacyOptions.map((opt) => (
            <button
              key={opt.value}
              className={`setup-opt ${privacy === opt.value ? 'selected' : ''}`}
              onClick={() => setPrivacy(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="setup-result">
          <span className="rec-tag">{result.tag}</span>
          <h3>{result.title}</h3>
          <p>{result.desc}</p>
          <code>{result.cmd}</code>
        </div>
      )}
    </div>
  )
}
