import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  text = '© 2014 Copyright Text';

  constructor() { }

  ngOnInit() {
  }

}
