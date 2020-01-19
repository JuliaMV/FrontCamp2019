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

export interface IEvrethingResponse {
  status: string;
  totalResults: number;
  articles: INews[];
}
