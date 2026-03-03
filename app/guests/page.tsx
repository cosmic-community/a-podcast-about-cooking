import type { Metadata } from 'next';
import { getGuests } from '@/lib/cosmic';
import GuestCard from '@/components/GuestCard';

export const metadata: Metadata = {
  title: 'Guests — A Podcast About Cooking',
  description:
    'Meet the chefs, bartenders, and culinary experts who join us on A Podcast About Cooking.',
};

export default async function GuestsPage() {
  const guests = await getGuests();

  return (
    <>
      {/* Page Header */}
      <section className="bg-charcoal-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3">
            👤 People
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Guests
          </h1>
          <p className="text-charcoal-300 text-lg max-w-2xl">
            Meet the chefs, pitmasters, sommeliers, bartenders, and culinary
            experts who bring their expertise to every episode.
          </p>
        </div>
      </section>

      {/* Guests Grid */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {guests.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-2">
                No Guests Yet
              </h2>
              <p className="text-charcoal-500">
                Check back soon for guest profiles!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {guests.map((guest) => (
                <GuestCard key={guest.id} guest={guest} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}