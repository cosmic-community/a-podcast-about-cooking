import type { Metadata } from 'next';
import { getEpisodes } from '@/lib/cosmic';
import EpisodeCard from '@/components/EpisodeCard';

export const metadata: Metadata = {
  title: 'Episodes — A Podcast About Cooking',
  description:
    'Browse all episodes of A Podcast About Cooking. From steak tips to Italian classics and cocktail crafting.',
};

export default async function EpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <>
      {/* Page Header */}
      <section className="bg-charcoal-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3">
            🎙️ All Episodes
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Episodes
          </h1>
          <p className="text-charcoal-300 text-lg max-w-2xl">
            Explore every episode — from sizzling steak techniques to authentic
            Italian recipes and creative cocktail crafting.
          </p>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {episodes.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🎙️</div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-2">
                No Episodes Yet
              </h2>
              <p className="text-charcoal-500">
                Check back soon for new episodes!
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