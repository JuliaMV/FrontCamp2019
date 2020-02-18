import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  label = 'Search by keyword';
  placeHolder = 'Search...';

  constructor( private searchService: SearchService) { }

  ngOnInit() {

  }

  onInput(event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.trim()) {
      this.searchService.setSearch(value.trim());
    }
  }

}
