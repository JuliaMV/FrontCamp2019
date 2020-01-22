import { Component, OnInit } from '@angular/core';

import {INews} from '../interfaces';
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

  constructor( private newsApiService: NewsApiService) { }

  ngOnInit() {
    // this.loading = true;
    this.newsApiService.updateNewsList.subscribe((news: INews[]) => {
      this.newsList = news;
    });

  }

  loadMore() {
    this.newsApiService.fetchNews();
  }

}
