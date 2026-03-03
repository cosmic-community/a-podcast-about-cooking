// app/episodes/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEpisodeBySlug } from '@/lib/cosmic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    return { title: 'Episode Not Found' };
  }

  return {
    title: `${episode.title} — A Podcast About Cooking`,
    description: episode.metadata?.description ?? '',
  };
}

export default async function EpisodeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const series = episode.metadata?.series;
  const guests = episode.metadata?.guests;
  const featuredImage = episode.metadata?.featured_image;

  return (
    <>
      {/* Episode Header */}
      <section className="bg-charcoal-950 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-1 text-charcoal-400 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Episodes
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {series && (
              <Link
                href={`/series/${series.slug}`}
                className="bg-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full hover:bg-brand-500/30 transition-colors"
              >
                {series.title}
              </Link>
            )}
            <span className="text-charcoal-500 text-sm">
              Episode {episode.metadata?.episode_number ?? '—'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {episode.title}
          </h1>

          {episode.metadata?.description && (
            <p className="text-charcoal-300 text-lg leading-relaxed max-w-3xl">
              {episode.metadata.description}
            </p>
          )}

          {episode.metadata?.audio_url && (
            <div className="mt-8">
              <a
                href={episode.metadata.audio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Listen to Episode
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Episode Content */}
      <section className="py-12 sm:py-16 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {featuredImage && (
                <div className="rounded-2xl overflow-hidden mb-8">
                  <img
                    src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
                    alt={episode.title}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {episode.metadata?.show_notes && (
                <div>
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                    Show Notes
                  </h2>
                  <div
                    className="prose-show-notes"
                    dangerouslySetInnerHTML={{
                      __html: episode.metadata.show_notes,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Guests */}
              {guests && guests.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm">
                  <h3 className="text-lg font-bold text-charcoal-900 mb-4">
                    Guests
                  </h3>
                  <div className="space-y-4">
                    {guests.map((guest) => {
                      if (!guest) return null;
                      return (
                        <Link
                          key={guest.id}
                          href={`/guests/${guest.slug}`}
                          className="flex items-center gap-3 group"
                        >
                          {guest.metadata?.photo ? (
                            <img
                              src={`${guest.metadata.photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                              alt={guest.metadata?.name ?? guest.title}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold">
                              {(guest.metadata?.name ?? guest.title).charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                              {guest.metadata?.name ?? guest.title}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Series Info */}
              {series && (
                <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm">
                  <h3 className="text-lg font-bold text-charcoal-900 mb-3">
                    Series
                  </h3>
                  <Link
                    href={`/series/${series.slug}`}
                    className="group"
                  >
                    {series.metadata?.cover_image && (
                      <img
                        src={`${series.metadata.cover_image.imgix_url}?w=600&h=340&fit=crop&auto=format,compress`}
                        alt={series.title}
                        width={300}
                        height={170}
                        className="w-full h-auto rounded-lg mb-3"
                      />
                    )}
                    <p className="font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                      {series.metadata?.name ?? series.title}
                    </p>
                    {series.metadata?.description && (
                      <p className="text-sm text-charcoal-500 mt-1 line-clamp-2">
                        {series.metadata.description}
                      </p>
                    )}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}