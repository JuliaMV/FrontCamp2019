import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalNewsService} from '../services/local-news.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {
  form: FormGroup;

  title = 'Create';
  author: string | null = null;
  date =  new Date();

  constructor(private localNewsService: LocalNewsService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.updateName.subscribe(name => {
      this.author = name;
    });

    this.authService.checkName();

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      urlToImage: new FormControl(''),
      url: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSave = () => {
    if (this.form.valid) {
      this.localNewsService
        .createNews({...this.form.value, author: this.author, publishedAd: this.date });
    }
  }

  onCancel = () => {
    this.router.navigate(['/']);
  }

  onSubmit = () => {
    this.onSave();
  }

}
