import { ImageResponse } from 'next/og';
import { getWorkItem } from '@/lib/content';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getWorkItem(slug);

  const label = item?.type === 'case-study' ? 'Case Study' : 'Article';
  const title = item?.title ?? 'Songo CX';
  const meta = item ? `${item.tag} · ${item.readTime}` : '';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #152847 0%, #1F3864 60%, #2E5FA3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          justifyContent: 'space-between',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'white', letterSpacing: '0.04em' }}>
            SONGO CX
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 22 }}>·</span>
          <span
            style={{
              fontSize: 18,
              color: '#4A86C8',
              fontWeight: 600,
              background: 'rgba(74,134,200,0.15)',
              padding: '4px 14px',
              borderRadius: 20,
            }}
          >
            {label}
          </span>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 56, height: 4, background: '#4A86C8', borderRadius: 2, marginBottom: 36 }} />
          <div
            style={{
              fontSize: title.length > 60 ? 38 : 46,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              maxWidth: 920,
              letterSpacing: '-0.5px',
            }}
          >
            {title}
          </div>
          {meta && (
            <div style={{ marginTop: 28, fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>
              {meta}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.30)', letterSpacing: '0.04em' }}>
          songocx.com
        </div>
      </div>
    ),
    { ...size },
  );
}
