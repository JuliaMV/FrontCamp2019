import { Component, OnInit } from '@angular/core';

import {INews, ISource} from '../interfaces';
import {NewsApiService} from '../services/news-api.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isOwnNews = false;
  newsList: INews[] = [];
  loading = false;
  title: string;

  constructor( private newsApiService: NewsApiService) { }

  ngOnInit() {
    // this.loading = true;
    this.newsApiService.updateNewsList.subscribe((news: INews[]) => {
      this.newsList = news;
    });
    this.newsApiService.updateSelectedSource.subscribe((source: ISource) => {
      this.title = source.name;
    });

  }

  loadMore() {
    this.newsApiService.fetchNews();
  }

}
