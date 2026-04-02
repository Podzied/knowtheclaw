import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'KnowTheClaw — OpenClaw, Explained'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111110',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          <div style={{ fontSize: 28 }}>🦞</div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#C43D2B',
            }}
          >
            Open-Source AI Agent
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#FAFAF8',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          Your computer just got an employee.
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 24,
            color: '#777770',
            lineHeight: 1.5,
            maxWidth: '750px',
          }}
        >
          OpenClaw runs on your machine, handles your email, code, research, and scheduling — through the apps you already use.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            right: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: '#FAFAF8',
              display: 'flex',
            }}
          >
            Know<span style={{ color: '#C43D2B' }}>The</span>Claw
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#555550',
            }}
          >
            knowtheclaw.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
