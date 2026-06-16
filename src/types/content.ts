export type GalleryImage = {
  src: string;
  alt: string;
};

export type ContentSection = {
  slug: string;
  title: string;
  description: string;
  paragraphs: string[];
  images: GalleryImage[];
  highlights?: string[];
};

export type ContentCategory = {
  slug: string;
  title: string;
  description: string;
  sections: ContentSection[];
};
