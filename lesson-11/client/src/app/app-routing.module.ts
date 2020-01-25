import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import {CreateNewsComponent} from './create-news/create-news.component';
import {EditNewsComponent} from './edit-news/edit-news.component';
import {ArticleComponent} from './article/article.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'create', component: CreateNewsComponent },
  { path: 'edit', component: EditNewsComponent },
  { path: 'acticle', component: ArticleComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
