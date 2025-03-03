// types.ts
export interface Story {
  id: string;
  title: string;
  content: string;
  slug: string;
  author_id: string;
  published_at: string | null;
  updated_at: string;
  status: string;
  image_url?: string;
  meta_description?: string;
}
