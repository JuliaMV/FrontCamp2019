import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  label = 'Search by keyword';
  placeHolder = 'Search...';

  constructor() { }

  ngOnInit() {

  }

}
