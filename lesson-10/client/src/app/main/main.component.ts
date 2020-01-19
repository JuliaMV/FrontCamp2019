import { Component, OnInit } from '@angular/core';

import { INews } from '../interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isOwnNews = true;

  newsList: INews[] = [
    {
      title: `title`,
      description: 'lorem',
      date: new Date(),
      urlToImage: 'https://via.placeholder.com/200x270'
    },
    {
      title: `title sadca`,
      description: 'lorem fasf',
      date: new Date(),
      urlToImage: 'https://via.placeholder.com/200x270'
    },
    {
      title: `title dawsda`,
      description: 'lorem',
      date: new Date(),
      urlToImage: 'https://via.placeholder.com/200x270'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
