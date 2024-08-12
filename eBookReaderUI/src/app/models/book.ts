export interface Place {
  name: string;
  description: string;
  image_path: string;
}

export interface Character {
  name: string;
  description: string;
  image_path: string;
}

export interface Vocabulary {
  word: string;
  definition: string;
}

export interface BookDetails {
  b_id: number;
  title: string;
  author: string;
  path: string;
  cover_path: string;
  Locations?: Place[];
  Characters?: Character[];
  summary?: string;
  last_read?: string;
}

export interface VocabData {
  [book_title: string]: Vocabulary[]
};
