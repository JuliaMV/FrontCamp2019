import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.scss']
})
export class LoadMoreBtnComponent implements OnInit {
  text = 'load more'

  constructor() { }

  ngOnInit() {
  }

}
