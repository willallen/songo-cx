export default function SocialProof() {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 text-[200px] leading-none font-bold text-surface select-none">&ldquo;</div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="bg-surface rounded-2xl p-12 md:p-16 border border-gray-100">
          <blockquote className="text-2xl md:text-3xl text-navy font-medium leading-snug mb-8 tracking-tight">
            &ldquo;Migration completed on schedule. Zero carrier outages on cutover day.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-cx" />
            <cite className="text-body text-sm not-italic font-medium">
              Contact Center Director, Financial Services
            </cite>
            <div className="w-10 h-px bg-cx" />
          </div>
        </div>
      </div>
    </section>
  );
}
