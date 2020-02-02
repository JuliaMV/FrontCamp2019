import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  updateLogin: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) { }

  showMessage = (message) => {
    if ((window as any).M && message) {
      (window as any).M.toast({html: message});
    }
  }

  setToken = (token: string): void => {
    localStorage.setItem(TOKEN, token);
  }


  isLogged = () => {
    if (localStorage.getItem(TOKEN) !== null) {
      this.isLogin = true;
      this.updateLogin.emit(this.isLogin);
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
    localStorage.removeItem(TOKEN);
  }

}
