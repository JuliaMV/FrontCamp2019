import {EventEmitter, Injectable} from '@angular/core';
import {INews, INewsResponse, ISourcesResponce} from '../interfaces';
import {API_KEY, baseUrl} from '../constans';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  limit = 5;
  page = 1;
  news: INews[] = [];
  selectedSource: string;
  updateNewsList: EventEmitter<INews[]> = new EventEmitter();

  constructor(private http: HttpClient) { }

  fetchSources = () => {
    return this.http.get<ISourcesResponce>(`${baseUrl}sources?apiKey=${API_KEY}`);
  }

  fetchNews = (source) => {
    if (source === 'local-news') {
      console.log('Local api not finished yet');
      return ;
    }
    this.http
      .get<INewsResponse>(`${baseUrl}everything?sources=${source}&pageSize=${this.limit}&page=${this.page++}&apiKey=${API_KEY}`)
      .subscribe(response => {
        this.news = [...this.news, ...response.articles];
        this.updateNewsList.emit(this.news);
      });
  }

  setSelectedSource = (name: string) => {
    if (name !== this.selectedSource) {
      this.news = [];
      this.page = 1;
      this.selectedSource = name;
    }
  }
}
