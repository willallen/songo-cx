const cards = [
  {
    title: 'PureConnect + Genesys Cloud Fluency',
    body: "We've lived both platforms. Your migration doesn't need two teams.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: 'Carrier Architecture Depth',
    body: 'BYOC, SBC config, SIP trunking, number porting — the carrier work that stalls most implementations.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
  },
  {
    title: 'Boutique practice. Senior talent.',
    body: 'Every engagement is handled by senior architects. No junior staff, no handoffs.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function Differentiators() {
  return (
    <section className="bg-surface py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group bg-white rounded-2xl p-8 border border-gray-100 card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-cx-lighter flex items-center justify-center text-cx mb-6 group-hover:bg-cx group-hover:text-white transition-colors duration-300">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-navy mb-3 leading-snug">{card.title}</h3>
              <p className="text-body text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
