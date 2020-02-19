import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { TitleComponent } from './title/title.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SelectComponent } from './select/select.component';
import { SearchComponent } from './search/search.component';
import { CreatedCheckboxComponent } from './created-checkbox/created-checkbox.component';
import { CreateBtnComponent } from './create-btn/create-btn.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { LoadMoreBtnComponent } from './load-more-btn/load-more-btn.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CreateNewsComponent } from './create-news/create-news.component';
import {EditNewsComponent} from './edit-news/edit-news.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { SearchPipe } from './pipes/search.pipe';
import {RefDirective} from "./ref.directive";
import { FooterElementComponent } from './footer-element/footer-element.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    TitleComponent,
    NotFoundComponent,
    ContactsComponent,
    SelectComponent,
    SearchComponent,
    CreatedCheckboxComponent,
    CreateBtnComponent,
    NewsCardComponent,
    LoadMoreBtnComponent,
    CreateNewsComponent,
    EditNewsComponent,
    ArticleComponent,
    LoginComponent,
    SearchPipe,
    RefDirective,
    FooterElementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  entryComponents: [NewsCardComponent, FooterElementComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
