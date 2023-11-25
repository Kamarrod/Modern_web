import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from '../shared/helpers';
import { finalize } from 'rxjs/operators';
import { interval } from 'rxjs';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  private refreshingToken: boolean = false;
  //private refreshSubject: BehaviorSubject<string | null>;

  // constructor(private http: HttpClient) {
  //   this.refreshSubject = new BehaviorSubject<string | null>(null);
  //   timer(100).subscribe(() => {
  //     this.refreshTokens();
  //   });
  //   interval(30 * 1000).subscribe(() => {
  //     this.refreshTokens();
  //   });
}

// get refreshToken(): Observable<string | null> {
//   return this.refreshSubject.asObservable();
// }
//   private refreshAccessToken(currentUser: User, reloading: boolean) {
//     console.log('start of executin refreshAccessToken');
//     // console.log(currentUser)
//     const formData = {
//       access_token: currentUser.accessToken,
//     };
//     // console.log(formData)
//     this.http
//       .post<any>(
//         'https://localhost:5000/api/authentication/refresh',
//         formData,
//         { withCredentials: true }
//       )
//       .subscribe({
//         next: (user) => {
//           console.log('start real Refresh Access');
//           // console.log(user)
//           const old_access_token = currentUser.accessToken;
//           console.log(old_access_token == user.accessToken);
//           currentUser.accessToken = user.accessToken;
//           localStorage.setItem('currentUser', JSON.stringify(currentUser));
//           this.userSubject.next(currentUser);
//           console.log('end real Refresh Access');
//           if (reloading) location.reload();
//         },
//         error: () => {
//           console.log('Logout in access');
//           this.logout();
//         },
//         complete: () => {
//           console.log('complete access Observable');
//         },
//       });
//     console.log('end of executin refreshAccessToken');
//   }
//   private refreshRefreshToken(currentUser: User) {
//     const formData = {
//       access_token: currentUser.accessToken,
//     };
//     return this.http
//       .post<any>(
//         'https://localhost:5000/api/authentication/refresh',
//         formData,
//         { withCredentials: true }
//       )
//       .subscribe({
//         next: (user) => {
//           currentUser.refreshToken = user.refresh_token;
//           currentUser.accessToken = user.accessToken;
//           localStorage.setItem('currentUser', JSON.stringify(currentUser));
//           this.userSubject.next(currentUser);
//         },
//         error: () => {
//           this.logout();
//         },
//       });
//   }
//   refreshTokens(reloading = false) {
//     const today = new Date();
//     // console.log('First')
//     const currentUser = this.userValue;
//     // console.log(User)
//     // console.log(currentUser)
//     // console.log('Second')
//     if (!currentUser) return;
//     console.log('Refresh start');
//     // today.setMinutes(today.getMinutes() + Date.)
//     if (today > currentUser.refresh_token.update_date) {
//       // this.refreshAccessToken()
//       this.refreshRefreshToken(currentUser);
//     } else {
//       this.refreshAccessToken(currentUser, reloading);
//     }
//     console.log('Refresh end');
//   }
// }

// Метод для обновления токена
// refresh(): Observable<string | null> {
//   if (!this.refreshingToken) {
//     this.refreshingToken = true;
//     return this.http
//       .post<any>('https://localhost:5000/api/authentication/refresh', {})
//       .pipe(
//         switchMap((newToken) => {
//           if (!newToken['accessToken']) {
//             // Если обновление не удалось (например, из-за истечения срока действия refresh token),
//             // очищаем localStorage и уведомляем об ошибке
//             localStorage.removeItem('currentUser');
//             return throwError(() => 'TokenRefreshError');
//           }
//           // Обновление токена успешно, сохраняем новый токен и уведомляем компоненты
//           localStorage.setItem('currentUser', JSON.stringify(newToken));
//           this.refreshSubject.next(newToken['accessToken']);
//           return this.refreshToken;
//         }),
//         catchError((error) => {
//           // В случае ошибки при обновлении токена, также очищаем localStorage и уведомляем об ошибке
//           localStorage.removeItem('currentUser');
//           this.refreshSubject.next(null);
//           return throwError(() => 'TokenRefreshError');
//         }),
//         finalize(() => {
//           this.refreshingToken = false;
//         })
//       );
//   } else {
//     // Если уже идет процесс обновления токена, возвращаем текущий Observable
//     return this.refreshToken;
//   }
// }
//}
