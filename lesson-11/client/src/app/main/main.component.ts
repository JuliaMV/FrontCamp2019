import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';

import {INews, ISource} from '../interfaces';
import {NewsApiService} from '../services/news-api.service';
import {AuthService} from '../services/auth.service';
import {SearchService} from '../services/search.service';
import {RefDirective} from '../ref.directive';
import {NewsCardComponent} from '../news-card/news-card.component';
import {SearchPipe} from '../pipes/search.pipe';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [SearchPipe],
})
export class MainComponent implements OnInit {
  isOwnNews = false;
  newsList: INews[] = [];
  loading = false;
  title: string;
  isLogin = false;
  searchValue: string;

  constructor( private newsApiService: NewsApiService,
               private authService: AuthService,
               private searchService: SearchService,
               private resolver: ComponentFactoryResolver,
               private searchPipe: SearchPipe,
  ) { }

  @ViewChild(RefDirective, {static: false}) refDir: RefDirective;


  ngOnInit() {
    this.newsApiService.updateNewsList.subscribe((news: INews[]) => {
      this.newsList = news;
      this.showNews();
    });
    this.newsApiService.updateSelectedSource.subscribe((source: ISource) => {
      this.title = source.name;
    });
    this.searchService.updateSearchValue.subscribe((value: string) => {
      this.searchValue = value;
      this.showNews();
    });

    this.authService.updateLogin.subscribe((isLogin: boolean) => {
      this.isLogin = isLogin;
    });


    this.authService.isLogged();
  }

  loadMore() {
    this.newsApiService.fetchNews();
  }

  showNews = () => {
    const newsFactory = this.resolver.resolveComponentFactory(NewsCardComponent);

    this.refDir.containerRef.clear();

    this.searchPipe.transform(this.newsList, this.searchValue)
      .forEach(item => {
      const component = this.refDir.containerRef.createComponent(newsFactory);
      component.instance.news = item;
    });
  }

}
