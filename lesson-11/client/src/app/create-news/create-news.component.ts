import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {
  title = 'Create';
  date =  new Date();

  constructor() { }

  ngOnInit() {
  }

  onSave = () => {
    console.log('save');
  }

  onCancel = () => {
    console.log('cancel');
  }

}
