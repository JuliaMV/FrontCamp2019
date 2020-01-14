import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoText = 'Aggregator Logo';
  homeLinkText = 'Main';
  menuLinks = [
    { text: 'Contacts', path: ['/contacts'] },
  ];
  buttons = [
    { text: 'Login' },
    { text: 'Logout' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
