import Link from 'next/link';
import type { EpisodeObject } from '@/types';

interface EpisodeCardProps {
  episode: EpisodeObject;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const featuredImage = episode.metadata?.featured_image;
  const series = episode.metadata?.series;
  const episodeNumber = episode.metadata?.episode_number;

  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden bg-charcoal-100">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={episode.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-cream-200">
            <span className="text-5xl">🎙️</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {series && (
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
              {series.title}
            </span>
          )}
          {series && episodeNumber != null && (
            <span className="text-charcoal-300">·</span>
          )}
          {episodeNumber != null && (
            <span className="text-xs text-charcoal-400 font-medium">
              Ep. {episodeNumber}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-brand-600 transition-colors duration-200 line-clamp-2">
          {episode.title}
        </h3>

        {episode.metadata?.description && (
          <p className="text-sm text-charcoal-500 leading-relaxed line-clamp-2">
            {episode.metadata.description}
          </p>
        )}

        {/* Guests */}
        {episode.metadata?.guests && episode.metadata.guests.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-cream-200">
            <div className="flex -space-x-2">
              {episode.metadata.guests.slice(0, 3).map((guest) => {
                if (!guest) return null;
                return guest.metadata?.photo ? (
                  <img
                    key={guest.id}
                    src={`${guest.metadata.photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={guest.metadata?.name ?? guest.title}
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                ) : (
                  <div
                    key={guest.id}
                    className="w-7 h-7 rounded-full border-2 border-white bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-600"
                  >
                    {(guest.metadata?.name ?? guest.title).charAt(0)}
                  </div>
                );
              })}
            </div>
            <span className="text-xs text-charcoal-400">
              {episode.metadata.guests
                .filter(Boolean)
                .map((g) => g.metadata?.name ?? g.title)
                .join(', ')}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}