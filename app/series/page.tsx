import type { Metadata } from 'next';
import { getSeries } from '@/lib/cosmic';
import SeriesCard from '@/components/SeriesCard';

export const metadata: Metadata = {
  title: 'Series — A Podcast About Cooking',
  description:
    'Explore our curated podcast series on steak, Italian cooking, mixology, and more.',
};

export default async function SeriesPage() {
  const series = await getSeries();

  return (
    <>
      {/* Page Header */}
      <section className="bg-charcoal-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3">
            📚 Collections
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Series
          </h1>
          <p className="text-charcoal-300 text-lg max-w-2xl">
            Curated collections of episodes organized by theme. Deep dive into
            steak mastery, Italian traditions, cocktail craft, and more.
          </p>
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {series.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-2">
                No Series Yet
              </h2>
              <p className="text-charcoal-500">
                Check back soon for new series!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {series.map((s) => (
                <SeriesCard key={s.id} series={s} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}