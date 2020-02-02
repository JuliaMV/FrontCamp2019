import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const TOKEN = 'TOKEN';
const NAME = 'NAME';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  name: string | null = null;
  updateLogin: EventEmitter<boolean> = new EventEmitter();
  updateName: EventEmitter<string> = new EventEmitter();


  constructor(private http: HttpClient, private router: Router) { }

  showMessage = (message) => {
    if ((window as any).M && message) {
      (window as any).M.toast({html: message});
    }
  }

  setToken = (token: string): void => {
    localStorage.setItem(TOKEN, token);
  }

  setName = (name: string): void => {
    localStorage.setItem(NAME, name);
  }

  checkName = () => {
    this.name = localStorage.getItem(NAME);
    this.updateName.emit(this.name);
  }

  isLogged = () => {
    if (localStorage.getItem(TOKEN) !== null) {
      this.isLogin = true;
      this.updateLogin.emit(this.isLogin);
      this.name = localStorage.getItem(NAME);
      this.updateName.emit(this.name);
    }
  }


  register = (form) => {
    this.http
      .post('/api/auth/register', form, {})
      .subscribe((resp: { message?: string }) => {
        if (resp.message) {
          this.showMessage(resp.message);
        }
      }, error => {
        this.showMessage(error.error.message || error.message);
      });
  }

  login = (form) => {
    this.http
      .post('/api/auth/login', form, {})
      .subscribe((resp: { token?: string, message?: string }) => {
        this.isLogin = true;
        this.updateLogin.emit(this.isLogin);
        this.name = form.email;
        this.updateName.emit(this.name);
        this.setName(form.email);
        this.setToken(resp.token);
        if (resp.message) {
          this.showMessage(resp.message);
        }
        this.router.navigate(['/']);
      }, error => {
        this.showMessage(error.error.message || error.message);
      });
  }

  logout = () => {
    this.isLogin = false;
    this.updateLogin.emit(this.isLogin);
    this.name = null;
    this.updateName.emit(this.name);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(NAME);
  }

}
