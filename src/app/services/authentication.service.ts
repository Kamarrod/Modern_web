import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { timer } from 'rxjs';

import { User } from '../shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser')!) || null
    );
    this.user = this.userSubject.asObservable();
    timer(100).subscribe(() => {
      this.refreshTokens();
    });
    interval(30 * 1000).subscribe(() => {
      this.refreshTokens();
    });
  }

  login(username: string, password: string) {
    // var formData: FormData = new FormData();
    // formData.append('username', username);
    // formData.append('password', password);
    var formData = {
      username: username,
      password: password,
    };
    return this.http
      .post<any>('https://localhost:5000/api/authentication/login', formData, {
        withCredentials: true,
      })
      .pipe(
        map((user) => {
          //console.log('Response from login API:', user);

          if (!user['accessToken']) {
            //console.log('Authentication failed');
            this.userSubject.next(null);
            return throwError(() => 'AuthError');
          } else {
            //console.log('Authentication successful. Saving to localStorage.');
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.userSubject.next(user);
            //console.log(user);
            return user;
          }
        })
      );
  }

  private refreshAccessToken(currentUser: User, reloading: boolean) {
    console.log('start of executin refreshAccessToken');
    // console.log(currentUser)
    const formData = {
      accesstoken: currentUser.accessToken,
      refreshtoken: currentUser.refreshToken,
    };
    // console.log(formData)
    this.http
      .post<any>('https://localhost:5000/api/token/refresh', formData, {
        withCredentials: true,
      })
      .subscribe({
        next: (user) => {
          console.log('start real Refresh Access');
          // console.log(user)
          const old_access_token = currentUser.accessToken;
          console.log(old_access_token == user.accessToken);
          currentUser.accessToken = user.accessToken;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.userSubject.next(currentUser);
          console.log('end real Refresh Access');
          if (reloading) location.reload();
        },
        error: () => {
          console.log('Logout in access');
          this.logout();
        },
        complete: () => {
          console.log('complete access Observable');
        },
      });
    console.log('end of executin refreshAccessToken');
  }
  private refreshRefreshToken(currentUser: User) {
    const formData = {
      accesstoken: currentUser.accessToken,
      refreshtoken: currentUser.refreshToken,
    };
    return this.http
      .post<any>('https://localhost:5000/api/token/refresh', formData, {
        withCredentials: true,
      })
      .subscribe({
        next: (user) => {
          //var values = atob(user);
          currentUser.refreshToken = user.refreshtoken;
          currentUser.accessToken = user.accesstoken;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.userSubject.next(currentUser);
        },
        error: () => {
          this.logout();
        },
      });
  }
  refreshTokens(reloading = false) {
    const today = new Date();
    const currentUser = this.userValue;
    console.log(currentUser);
    if (!currentUser) return;
    console.log('Refresh start');
    if (today > currentUser.update_date) {
      this.refreshRefreshToken(currentUser);
    } else {
      this.refreshAccessToken(currentUser, reloading);
    }
    console.log('Refresh end');
  }

  register(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    roles: []
  ) {
    var formData = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      roles: [],
    };

    return this.http
      .post<any>('https://localhost:5000/api/authentication', formData, {
        withCredentials: true,
      })
      .pipe(
        map((user) => {
          if (!user['accessToken']) {
            this.userSubject.next(null);
            return throwError(() => 'AuthError');
          } else {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
          }
        })
      );
  }
  public get userValue(): User | null {
    return this.userSubject.value;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
