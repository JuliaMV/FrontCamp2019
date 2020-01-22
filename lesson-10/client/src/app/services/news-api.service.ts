import {EventEmitter, Injectable} from '@angular/core';
import {INews, INewsResponse, ISource, ISourcesResponce} from '../interfaces';
import {API_KEY, baseUrl} from '../constans';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  limit = 5;
  page = 1;
  news: INews[] = [];
  selectedSource: ISource = { id: '', name: ''};
  sources: ISource[];
  local = { name: 'Local News', id: 'local-news' };
  selectedNews: INews;
  updateNewsList: EventEmitter<INews[]> = new EventEmitter();
  updateSelectedNews: EventEmitter<INews> = new EventEmitter();
  updateSelectedSource: EventEmitter<ISource> = new EventEmitter();
  updateSourcesList: EventEmitter<ISource[]> = new EventEmitter();

  constructor(private http: HttpClient) { }

  fetchSources = () => {
    this.http
      .get<ISourcesResponce>(`${baseUrl}sources?apiKey=${API_KEY}`)
      .subscribe((response: ISourcesResponce) => {
        this.sources = [this.local, ...response.sources];
        this.updateSourcesList.emit(this.sources);
      });
  }

  fetchNews = () => {
    if (this.selectedSource.id === 'local-news') {
      console.log('Local api not finished yet');
      return ;
    }
    this.http
      // tslint:disable-next-line:max-line-length
      .get<INewsResponse>(`${baseUrl}everything?sources=${this.selectedSource.id}&pageSize=${this.limit}&page=${this.page++}&apiKey=${API_KEY}`)
      .subscribe(response => {
        this.news = [...this.news, ...response.articles];
        this.updateNewsList.emit(this.news);
      });
  }

  setSelectedSource = (id: string) => {
    if (id !== this.selectedSource.id) {
      this.news = [];
      this.page = 1;
      this.selectedSource = this.sources.find(source => source.id === id);
      this.updateSelectedSource.emit(this.selectedSource);
    }
  }

  setSelectedNews = (title: string) => {
    this.selectedNews = this.news.find(news => news.title === title);
    this.updateSelectedNews.emit(this.selectedNews);

  }
}
