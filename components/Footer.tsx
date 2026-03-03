import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 text-charcoal-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎙️</span>
              <span className="font-bold text-white text-lg">
                A Podcast About Cooking
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Specializing in steak, Italian food, and mixology. Every episode
              is a culinary adventure.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/episodes"
                  className="text-sm hover:text-white transition-colors"
                >
                  Episodes
                </Link>
              </li>
              <li>
                <Link
                  href="/series"
                  className="text-sm hover:text-white transition-colors"
                >
                  Series
                </Link>
              </li>
              <li>
                <Link
                  href="/guests"
                  className="text-sm hover:text-white transition-colors"
                >
                  Guests
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-charcoal-800 px-3 py-1.5 rounded-full">
                🥩 Steak
              </span>
              <span className="text-xs bg-charcoal-800 px-3 py-1.5 rounded-full">
                🍝 Italian
              </span>
              <span className="text-xs bg-charcoal-800 px-3 py-1.5 rounded-full">
                🍸 Mixology
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {currentYear} A Podcast About Cooking. All rights reserved.
          </p>
          <p className="text-xs">
            Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}