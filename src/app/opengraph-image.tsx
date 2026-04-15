import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Songo CX | Genesys Cloud Consulting';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #152847 0%, #1F3864 60%, #2E5FA3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            width: 400,
            height: 300,
            background: 'rgba(74, 134, 200, 0.15)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />

        {/* Accent bar */}
        <div style={{ width: 56, height: 4, background: '#4A86C8', borderRadius: 2, marginBottom: 48 }} />

        {/* Wordmark */}
        <div style={{ fontSize: 58, fontWeight: 700, color: 'white', letterSpacing: '-2px', marginBottom: 28 }}>
          Songo CX
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.60)', lineHeight: 1.4, maxWidth: 620 }}>
          Boutique Genesys Cloud consulting.
          <br />
          Migrations, BYOC, and the hard stuff.
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 64,
            right: 80,
            fontSize: 18,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.05em',
          }}
        >
          songocx.com
        </div>
      </div>
    ),
    { ...size },
  );
}
