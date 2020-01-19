import { Component, OnInit } from '@angular/core';

import {IEvrethingResponse, INews} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';


const API_KEY = '2d8e0d602e59435c86345a7b8b40c0d8';
const baseUrl = 'https://newsapi.org/v2/';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isOwnNews = true;
  newsList: INews[];
  loading = false;

  constructor( private http: HttpClient) { }

  ngOnInit() {
    this.loading = true;
    this.http.get<IEvrethingResponse>('https://newsapi.org/v2/everything?q=bitcoin&pageSize=5&apiKey=2d8e0d602e59435c86345a7b8b40c0d8')
      .pipe(delay(1500))
      .subscribe((response) => {
        this.newsList = response.articles;
        this.loading = false;
      });
  }

}
