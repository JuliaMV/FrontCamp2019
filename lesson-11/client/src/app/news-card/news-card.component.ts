import {Component, Input, OnInit} from '@angular/core';
import {INews} from '../interfaces';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() news: INews;

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    console.log('delete')
  }

}
