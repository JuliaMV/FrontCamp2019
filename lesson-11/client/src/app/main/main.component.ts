import { Component, OnInit } from '@angular/core';

import {INews, ISource} from '../interfaces';
import {NewsApiService} from '../services/news-api.service';
import {AuthService} from "../services/auth.service";


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
  isLogin = false;

  constructor( private newsApiService: NewsApiService, private authService: AuthService) { }

  ngOnInit() {
    this.newsApiService.updateNewsList.subscribe((news: INews[]) => {
      this.newsList = news;
    });
    this.newsApiService.updateSelectedSource.subscribe((source: ISource) => {
      this.title = source.name;
    });

    this.authService.updateLogin.subscribe((isLogin: boolean) => {
      this.isLogin = isLogin;
    });


    this.authService.isLogged();
  }

  loadMore() {
    this.newsApiService.fetchNews();
  }

}
