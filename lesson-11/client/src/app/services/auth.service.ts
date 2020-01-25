import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = true;
  updateLogin: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  register = async (form) => {
    const { email, password } = form;
    const headers = {['Content-Type']: 'application/json'};
    const response = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(form), headers });
    const data = await response.json();

    if (!response.ok) {
      console.log('Error', data.message);
    }
    catch(error) {
      console.log(error);
    }
  }

  // setSelectedSource = (id: string) => {
  //   if (id !== this.selectedSource.id) {
  //     this.news = [];
  //     this.page = 1;
  //     this.selectedSource = this.sources.find(source => source.id === id);
  //     this.updateSelectedSource.emit(this.selectedSource);
  //   }
  // }
}
