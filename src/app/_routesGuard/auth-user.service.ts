
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthUserService {
  public user: any = false;

  isLoggedIn(): boolean {
    
    if (localStorage.getItem('UTO')) {
      this.user = true
    }

    if (this.user) {
      return true;

    }
    else {
      return false;
    }
  }


}
