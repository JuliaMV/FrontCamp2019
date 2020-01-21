import {Component, Input, OnInit} from '@angular/core';
import {ISource, ISourcesResponce} from '../interfaces';
import {NewsApiService} from '../services/news-api.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  label = 'Select source';
  local = { name: 'Local News', id: 'local-news' };
  sources: ISource[];

  @Input() isDisabled: boolean;

  constructor(private newsApiService: NewsApiService) {
  }

  ngOnInit() {
    this.newsApiService.fetchSources()
      .subscribe((response: ISourcesResponce) => {
        this.sources = [this.local, ...response.sources];
      });
  }

  selectHandler = (event) => {
    const source = (event.target as HTMLSelectElement).value;
    this.newsApiService.setSelectedSource(source);
    this.newsApiService.fetchNews(source);
  }

}
