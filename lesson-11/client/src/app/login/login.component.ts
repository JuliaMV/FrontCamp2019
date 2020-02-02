import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  loginHandler = () => {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      this.authService.login(formData);
    }
  }

  registerHandler = () => {
    if (this.form.valid) {
      const formData = { ...this.form.value };;
      this.authService.register(formData);
    }
  }



}
