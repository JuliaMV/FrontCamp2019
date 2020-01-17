import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-created-checkbox',
  templateUrl: './created-checkbox.component.html',
  styleUrls: ['./created-checkbox.component.scss']
})
export class CreatedCheckboxComponent implements OnInit {
  label = 'Created by me';
  isChecked = false;

  constructor() { }

  ngOnInit() {
  }

}
