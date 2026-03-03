import Link from 'next/link';
import type { GuestObject } from '@/types';

interface GuestCardProps {
  guest: GuestObject;
}

export default function GuestCard({ guest }: GuestCardProps) {
  const photo = guest.metadata?.photo;
  const name = guest.metadata?.name ?? guest.title;

  return (
    <Link
      href={`/guests/${guest.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-sm hover:shadow-md transition-all duration-300 text-center p-6"
    >
      {/* Photo */}
      <div className="mx-auto w-28 h-28 rounded-full overflow-hidden mb-4">
        {photo ? (
          <img
            src={`${photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={name}
            width={112}
            height={112}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-3xl font-bold text-brand-600">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-brand-600 transition-colors duration-200 mb-1">
        {name}
      </h3>

      {/* Bio */}
      {guest.metadata?.bio && (
        <p className="text-sm text-charcoal-500 line-clamp-2 leading-relaxed">
          {guest.metadata.bio}
        </p>
      )}

      {/* Website indicator */}
      {guest.metadata?.website && (
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 text-xs text-brand-600 font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Website
          </span>
        </div>
      )}
    </Link>
  );
}