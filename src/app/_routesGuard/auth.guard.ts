import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { AuthUserService } from './auth-user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public flag = false;

  constructor(private user: AuthUserService, private router: Router) {

    this.flag = this.user.isLoggedIn();

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.flag) {
      // this.user.isLoggedIn();
      return true;

    }
    else {
      this.router.navigate(['/login'], {
        // queryParams:{
        //   return:state.url
        // }
      });
      // this.user.isLoggedIn();
      return false;
    }
  }
}
