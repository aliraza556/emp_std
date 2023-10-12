import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorRegisterService } from '../../../../_services/error-register.service';
@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',

})
export class LogoutComponent {

  constructor(private router: Router, private er: ErrorRegisterService) {
    this.er.deleteNotifications();
      localStorage.clear();
      sessionStorage.clear();
        this.router.navigate(['login']);
   }
  }