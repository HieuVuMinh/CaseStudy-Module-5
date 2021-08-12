import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {map} from 'rxjs/operators';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // BehaviorSubject giống như đối tượng trong Angular để lắng nghe sự kiện thay đổi của Observable
  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(userName: string, password: string) {
    return this.http.post<any>(API_URL + 'login', {userName, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getCurrentUserValue() {
    return this.currentUserSubject.value;
  }
}
