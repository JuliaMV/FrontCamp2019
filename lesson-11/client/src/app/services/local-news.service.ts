import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalNewsService {

  constructor() { }

  createNews = (form) => {
    console.log(form);
  }
}
