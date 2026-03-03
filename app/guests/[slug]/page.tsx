// app/guests/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuestBySlug, getEpisodesByGuest } from '@/lib/cosmic';
import EpisodeCard from '@/components/EpisodeCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);

  if (!guest) {
    return { title: 'Guest Not Found' };
  }

  return {
    title: `${guest.metadata?.name ?? guest.title} — A Podcast About Cooking`,
    description: guest.metadata?.bio ?? '',
  };
}

export default async function GuestDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);

  if (!guest) {
    notFound();
  }

  const episodes = await getEpisodesByGuest(guest.id);
  const photo = guest.metadata?.photo;

  return (
    <>
      {/* Guest Header */}
      <section className="bg-charcoal-950 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/guests"
            className="inline-flex items-center gap-1 text-charcoal-400 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Guests
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            {photo ? (
              <img
                src={`${photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={guest.metadata?.name ?? guest.title}
                width={200}
                height={200}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-5xl text-brand-400 font-bold">
                  {(guest.metadata?.name ?? guest.title).charAt(0)}
                </span>
              </div>
            )}

            <div>
              <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
                Guest
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {guest.metadata?.name ?? guest.title}
              </h1>
              {guest.metadata?.bio && (
                <p className="text-charcoal-300 text-lg leading-relaxed max-w-2xl">
                  {guest.metadata.bio}
                </p>
              )}
              {guest.metadata?.website && (
                <a
                  href={guest.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 font-medium mt-4 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Guest Episodes */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-8">
            Episodes with {guest.metadata?.name ?? guest.title}
          </h2>

          {episodes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-charcoal-500">
                No episodes featuring this guest yet. Check back soon!
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