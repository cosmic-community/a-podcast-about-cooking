import Link from 'next/link';
import type { SeriesObject } from '@/types';

interface SeriesCardProps {
  series: SeriesObject;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const coverImage = series.metadata?.cover_image;

  return (
    <Link
      href={`/series/${series.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-[3/2] overflow-hidden bg-charcoal-100">
        {coverImage ? (
          <img
            src={`${coverImage.imgix_url}?w=800&h=530&fit=crop&auto=format,compress`}
            alt={series.metadata?.name ?? series.title}
            width={400}
            height={265}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-cream-200">
            <span className="text-5xl">📚</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
          Series
        </p>
        <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-brand-600 transition-colors duration-200">
          {series.metadata?.name ?? series.title}
        </h3>

        {series.metadata?.description && (
          <p className="text-sm text-charcoal-500 leading-relaxed line-clamp-2">
            {series.metadata.description}
          </p>
        )}

        <span className="inline-flex items-center gap-1 text-brand-600 text-sm font-medium mt-4 group-hover:gap-2 transition-all duration-200">
          Explore Series
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}