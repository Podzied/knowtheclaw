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
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 16 }}>🦞</div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#FAFAF8',
            marginBottom: 12,
          }}
        >
          Know<span style={{ color: '#C43D2B' }}>The</span>Claw
        </div>
        <div
          style={{
            fontSize: 26,
            color: '#999990',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          AI that acts, not just chats. The open-source agent — explained.
        </div>
      </div>
    ),
    { ...size }
  )
}
