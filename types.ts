export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface GuestObject extends CosmicObject {
  type: 'guests';
  metadata: {
    name?: string;
    bio?: string;
    website?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface SeriesObject extends CosmicObject {
  type: 'series';
  metadata: {
    name?: string;
    description?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface EpisodeObject extends CosmicObject {
  type: 'episodes';
  metadata: {
    audio_url?: string;
    description?: string;
    show_notes?: string;
    episode_number?: number;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    series?: SeriesObject;
    guests?: GuestObject[];
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}