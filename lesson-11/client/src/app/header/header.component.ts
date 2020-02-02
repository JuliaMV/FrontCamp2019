import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  logoText = 'Aggregator Logo';
  homeLinkText = 'Main';
  menuLinks = [
    { text: 'Contacts', path: ['/contacts'] },
  ];


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.updateLogin.subscribe((isLogin: boolean) => {
      this.isLogin = isLogin;
    });
  }

  onLogout = () => {
    this.authService.logout();
  }

}
