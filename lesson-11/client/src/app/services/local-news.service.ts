import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalNewsService {

  constructor(private http: HttpClient) { }

  createNews = (form) => {
    this.http
      .post('/api/news', form)
      .subscribe(response => {
        console.log('resp', response);
      });
  }
}
