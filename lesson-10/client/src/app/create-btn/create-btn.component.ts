import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-btn',
  templateUrl: './create-btn.component.html',
  styleUrls: ['./create-btn.component.scss']
})
export class CreateBtnComponent implements OnInit {
  text = 'add article';

  constructor() { }

  ngOnInit() {
  }

}
