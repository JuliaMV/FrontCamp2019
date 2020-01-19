import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  label = 'Select source';
  options = [
    { text: 'Local'},
    { text: 'BBC'},
    { text: 'EuroNews'},
    { text: 'TuT.by'},
  ];

  @Input() isDisabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
