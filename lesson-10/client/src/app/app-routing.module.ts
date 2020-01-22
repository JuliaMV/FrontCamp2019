import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import {CreateNewsComponent} from './create-news/create-news.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'create', component: CreateNewsComponent },
  // { path: 'edit', component: EditComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'logout', component: Logout
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
