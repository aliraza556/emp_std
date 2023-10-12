import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { AuthUserService } from './auth-user.service';

@Injectable()
export class NotLoginAuthGuard implements CanActivate {

  constructor(private user: AuthUserService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,    state: RouterStateSnapshot):  boolean {

      if (!this.user.isLoggedIn()) {

        // this.user.isLoggedIn();
        return true;

      }
      else {
        this.router.navigate(['/dashboard'], {


        });

      }
    return false;
  }
}
//
