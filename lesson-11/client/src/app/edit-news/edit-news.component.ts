import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {
  title = 'Edit';
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
