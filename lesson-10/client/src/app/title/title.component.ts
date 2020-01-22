import { Component, OnInit } from '@angular/core';
import {NewsApiService} from '../services/news-api.service';
import {ISource} from '../interfaces';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  title: string;

  constructor(private  newsApiService: NewsApiService) { }

  ngOnInit() {
    this.newsApiService.updateSelectedSource.subscribe((source: ISource) => {
      this.title = source.name;
    });
  }

}
