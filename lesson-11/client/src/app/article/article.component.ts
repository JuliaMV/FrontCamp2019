import {Component, Input, OnInit} from '@angular/core';
import {INews} from '../interfaces';
import {NewsApiService} from '../services/news-api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  news: INews = {
    source: {id: 'ansa', name: 'ANSA.it'},
    author: '',
    title: 'Cerca figlie online, loro: cancellatelo',
    // tslint:disable-next-line:max-line-length
    description: 'Il Tribunale civile di Milano ha accolto il ricorso di due sorelle adottate che lamentavano il,trattamento illecito dei loro dati personali operato dal padre biologico sulla propria bacheca',
    url: 'http://www.ansa.it/lombardia/notizie/2020/01/22/cerca-figlie-online-loro-cancellatelo_4bf11b56-1939-4c57-b83a-c7ac600e4c69.html',
    urlToImage: 'http://www.ansa.it/webimages/img_700/2013/11/9/8cb160f24366f8e4861c707356e7026d.jpg',
    publishedAt: '2020-01-22T10:33:50Z',
    content: '(ANSA) - MILANO, 22 GEN - Il Tribunale civile di Milano ha',
  };

  constructor(private newsApiService: NewsApiService) { }

  ngOnInit() {
    // this.newsApiService.updateSelectedNews.subscribe((news: INews) => {
    //   this.news = news;
    // });
  }

  onDelete = () => {
    console.log('delete');
  }

}
