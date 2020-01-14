import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  title = '404 Page not found';
  text = {
    start: 'Go to ',
    end: ' page'
  };
  redirectLink = {
    text: 'Main',
    path: ['/']
  };

  constructor() { }

  ngOnInit() {
  }

}
