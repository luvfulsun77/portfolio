// Shared content types — mirror CLAUDE.md §3 schemas.

export type WorkType =
  | "media-facade"
  | "installation"
  | "projection-mapping"
  | "video"
  | "interactive"
  | "print"
  | "mixed-media";

export type RecognitionCategory =
  | "award"
  | "exhibition-selection"
  | "press"
  | "publication"
  | "screening";

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5";

export interface LocalizedString {
  ko: string;
  en: string;
}

export interface OptionalLocalizedString {
  ko: string;
  en?: string;
}

export interface WorkVideo {
  youtubeId: string;
  duration: number;
  aspectRatio: AspectRatio;
  poster?: string;
  startAt?: number;
  endAt?: number;
}

export interface WorkImage {
  src: string;
  caption?: string;
}

export interface WorkInteractive {
  url: string;
  tech: string[];
}

export interface WorkCredit {
  role: string;
  name: string;
}

export interface Work {
  slug: string;
  title: { ko: string; en: string; hanja?: string };
  year: number;
  type: WorkType;
  venue?: string;
  dimensions?: string;
  materials?: string[];
  tools?: string[];
  statement: LocalizedString;
  thumbnail: string;
  video?: WorkVideo;
  images?: WorkImage[];
  interactive?: WorkInteractive;
  credits?: WorkCredit[];
}

export interface Recognition {
  slug?: string;
  year: number;
  date?: string;
  category: RecognitionCategory;
  title: OptionalLocalizedString;
  organization: string;
  award?: string;
  relatedWorkSlug?: string;
  description?: OptionalLocalizedString;
  link?: string;
  image?: string;
}

export interface CVItem {
  year: number;
  title: string;
  venue?: string;
  note?: string;
}

export interface About {
  portrait: string;
  /** Hanja form of the artist's name, e.g. 遊 於 藝 */
  hanja?: string;
  /** Short bilingual tagline, e.g. "예술에서 놀다 / Playing in Art" */
  tagline?: LocalizedString;
  statement: LocalizedString;
  bio: LocalizedString;
  cv: {
    education: CVItem[];
    /** Pre-art professional experience (optional) */
    experience?: CVItem[];
    soloExhibitions: CVItem[];
    groupExhibitions: CVItem[];
    publications: CVItem[];
  };
  contact: {
    email: string;
    instagram: string;
    sedition?: string;
  };
}
