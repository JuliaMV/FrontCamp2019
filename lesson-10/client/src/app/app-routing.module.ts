import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '404', component: NotFoundComponent },
  // { path: 'edit', component: EditComponent },
  // { path: 'create', component: CreateNewsComponent },
  // { path: 'create', component: NewsPageComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'logout', component: Logout
  //  [lfsdComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
