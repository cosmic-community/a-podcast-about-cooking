import Link from 'next/link';
import { getEpisodes, getSeries, getGuests } from '@/lib/cosmic';
import EpisodeCard from '@/components/EpisodeCard';
import SeriesCard from '@/components/SeriesCard';
import GuestCard from '@/components/GuestCard';

export default async function HomePage() {
  const [episodes, series, guests] = await Promise.all([
    getEpisodes(),
    getSeries(),
    getGuests(),
  ]);

  const latestEpisodes = episodes.slice(0, 3);
  const featuredEpisode = episodes[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-charcoal-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-700/30 via-charcoal-950 to-brand-900/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-4">
              🎙️ Podcast
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              A Podcast
              <br />
              About{' '}
              <span className="text-brand-400">Cooking</span>
            </h1>
            <p className="text-lg sm:text-xl text-charcoal-300 leading-relaxed mb-8 max-w-2xl">
              Dive deep into the art of the perfect steak, the soul of Italian
              cuisine, and the craft of mixology. Every episode is a culinary
              journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/episodes"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Browse Episodes
              </Link>
              <Link
                href="/series"
                className="inline-flex items-center gap-2 border border-charcoal-600 hover:border-charcoal-400 text-charcoal-200 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Explore Series
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      </section>

      {/* Specialties Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-cream-50 border border-cream-200">
              <div className="text-5xl mb-4">🥩</div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">
                Steak
              </h3>
              <p className="text-charcoal-500">
                From dry-aging techniques to the perfect reverse sear, master the
                art of cooking steak.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-cream-50 border border-cream-200">
              <div className="text-5xl mb-4">🍝</div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">
                Italian
              </h3>
              <p className="text-charcoal-500">
                Authentic recipes, regional traditions, and the secrets behind
                Italy&apos;s most beloved dishes.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-cream-50 border border-cream-200">
              <div className="text-5xl mb-4">🍸</div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">
                Mixology
              </h3>
              <p className="text-charcoal-500">
                Craft cocktails, spirits education, and beverage pairings that
                elevate every meal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      {featuredEpisode && (
        <section className="py-16 sm:py-20 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">
                Latest Episode
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900">
                Now Playing
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cream-200">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {featuredEpisode.metadata?.featured_image && (
                  <div className="aspect-video lg:aspect-auto">
                    <img
                      src={`${featuredEpisode.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                      alt={featuredEpisode.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {featuredEpisode.metadata?.series && (
                    <span className="inline-flex items-center text-brand-600 text-sm font-semibold uppercase tracking-wider mb-3">
                      {featuredEpisode.metadata.series.title}
                    </span>
                  )}
                  <span className="text-charcoal-400 text-sm font-medium mb-2">
                    Episode{' '}
                    {featuredEpisode.metadata?.episode_number ?? '—'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-900 mb-4">
                    {featuredEpisode.title}
                  </h3>
                  <p className="text-charcoal-500 leading-relaxed mb-6 line-clamp-3">
                    {featuredEpisode.metadata?.description ?? ''}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/episodes/${featuredEpisode.slug}`}
                      className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View Episode
                    </Link>
                    {featuredEpisode.metadata?.audio_url && (
                      <a
                        href={featuredEpisode.metadata.audio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-charcoal-500 hover:text-brand-600 font-medium text-sm transition-colors"
                      >
                        Listen Now →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Episodes */}
      {latestEpisodes.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">
                  Recent
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900">
                  Latest Episodes
                </h2>
              </div>
              <Link
                href="/episodes"
                className="hidden sm:inline-flex text-brand-600 hover:text-brand-700 font-semibold transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestEpisodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/episodes"
                className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
              >
                View All Episodes →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Series */}
      {series.length > 0 && (
        <section className="py-16 sm:py-20 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">
                  Collections
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900">
                  Series
                </h2>
              </div>
              <Link
                href="/series"
                className="hidden sm:inline-flex text-brand-600 hover:text-brand-700 font-semibold transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {series.map((s) => (
                <SeriesCard key={s.id} series={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guests */}
      {guests.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">
                  Featured
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900">
                  Our Guests
                </h2>
              </div>
              <Link
                href="/guests"
                className="hidden sm:inline-flex text-brand-600 hover:text-brand-700 font-semibold transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {guests.slice(0, 4).map((guest) => (
                <GuestCard key={guest.id} guest={guest} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}