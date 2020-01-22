import {Component, Input, OnInit} from '@angular/core';
import {NewsApiService} from '../services/news-api.service';
import {ISource} from '../interfaces';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input('title') title: string;
  constructor(private  newsApiService: NewsApiService) { }

  ngOnInit() {
  }

}
