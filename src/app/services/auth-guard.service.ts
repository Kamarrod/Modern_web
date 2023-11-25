import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService //private jwtHelper: JwtHelperService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if (user) {
      // check if route is restricted by role
      //if (user.accessToken) {
      //const userValue = atob(user['accessToken']);
      // const { roles } = route.data;
      // console.log(roles);
      // if (roles && !roles.includes(userValue['roles'])) {
      //   // role not authorized so redirect to home page
      //   this.router.navigate(['/']);
      //   return false;
      // }
      //}

      // authorized so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
