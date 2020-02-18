import {EventEmitter, Injectable} from '@angular/core';
import {INews} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  search = '';
  updateSearchValue: EventEmitter<string> = new EventEmitter();

  setSearch = (value) => {
    this.search = value.toLowerCase();
    this.updateSearchValue.emit(this.search);
  }
}
