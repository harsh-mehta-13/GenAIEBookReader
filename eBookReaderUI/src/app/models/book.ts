export interface Place {
  name: string;
  description: string;
  imgUrl: string;
}

export interface Character {
  name: string;
  description: string;
  imgUrl: string;
}

export interface Vocabulary {
  [word: string]: { meaning: string };
}

export interface BookDetails {
  title: string;
  creator: string;
  pubDate: string;
  Locations?: Location[];
  Characters?: Character[];
  path: string;
}
