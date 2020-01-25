import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-created-checkbox',
  templateUrl: './created-checkbox.component.html',
  styleUrls: ['./created-checkbox.component.scss']
})
export class CreatedCheckboxComponent implements OnInit {
  label = 'Created by me';

  @Input() isChecked: boolean;
  @Output() onClickCreateBtn: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  clickBtn() {
    this.onClickCreateBtn.emit();
  }

}
