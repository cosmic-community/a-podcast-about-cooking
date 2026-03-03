// app/series/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSeriesBySlug, getEpisodesBySeries } from '@/lib/cosmic';
import EpisodeCard from '@/components/EpisodeCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  if (!series) {
    return { title: 'Series Not Found' };
  }

  return {
    title: `${series.metadata?.name ?? series.title} — A Podcast About Cooking`,
    description: series.metadata?.description ?? '',
  };
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  const episodes = await getEpisodesBySeries(series.id);
  const coverImage = series.metadata?.cover_image;

  return (
    <>
      {/* Series Header */}
      <section className="bg-charcoal-950 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/series"
            className="inline-flex items-center gap-1 text-charcoal-400 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Series
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3">
                📚 Series
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {series.metadata?.name ?? series.title}
              </h1>
              {series.metadata?.description && (
                <p className="text-charcoal-300 text-lg leading-relaxed">
                  {series.metadata.description}
                </p>
              )}
              <p className="text-charcoal-500 mt-4">
                {episodes.length} episode{episodes.length !== 1 ? 's' : ''}
              </p>
            </div>
            {coverImage && (
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={`${coverImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt={series.metadata?.name ?? series.title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Episodes in Series */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-8">
            Episodes in this Series
          </h2>

          {episodes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-charcoal-500">
                No episodes in this series yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}