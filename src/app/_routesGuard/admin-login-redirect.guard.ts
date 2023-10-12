import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthUserService } from './auth-user.service';

@Injectable()
export class AdminLoginRedirectGuard implements CanActivate {

  constructor(private user: AuthUserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.user.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/dashboard/admin-dashboard'], {});
      return false;
    }
  }
}
