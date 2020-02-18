import { Pipe, PipeTransform } from '@angular/core';
import {INews} from '../interfaces';
import {SearchService} from '../services/search.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(newsList: INews[], search = ''): INews[] {
    if (search.trim()) {
      return newsList.filter(news => news.description.toLowerCase().includes(search.trim().toLowerCase()));
    }
    return newsList;
  }
}
