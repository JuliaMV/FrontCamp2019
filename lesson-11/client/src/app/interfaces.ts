export interface INews {
  source: { id: string, name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  content: string;
  publishedAt: string;
}

export interface INewsResponse {
  status: string;
  totalResults: number;
  articles: INews[];
}

export interface ISource {
  id: string;
  name: string;
  // description: string;
  // url: string;
  // category: string;
  // language: string;
  // country: string;
}

export interface ISourcesResponce {
  status: string;
  sources: ISource[];
}
