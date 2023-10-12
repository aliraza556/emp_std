import { ErrorRegisterService } from '../../_services/error-register.service';
import { Component} from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { ErrorModel } from '../../_models/errors.model';
import { Router } from '@angular/router';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService],
})
export class DashboardComponent {

  popUpList: any[];
  errorList: any[];
  changeClass: boolean | any;

  constructor(private service: DashboardService, private router: Router,
     private er: ErrorRegisterService) {
    // this.validateLogin();
    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO') as string);
      this.storedNames = c;
    }
    // JSON.parse(localStorage.getItem("UTO"));
    this.errorList = this.er.getError();

    this.popUpList = this.er.getPopUpMessages();

    //
  }


  changeClasss(n: boolean) {

    this.changeClass = n;
    //  this.changeClass=!this.changeClass;

  }
  errorCount(c: number) {
    if (c == 0) {
      return false;
    }
    else
      return true;

  }

  storedNames: any;// = JSON.parse(localStorage.getItem("UTO"));


  errorModel: ErrorModel[] = [];
  token_value: string | any;
  myMessage = '';

  ngOnInit() {

    // this.validateLogin();

  }
  validateLogin() {

    this.token_value = this.storedNames;

    if (!this.token_value || this.token_value == null) {
      this.router.navigate(['login']);
    }
  }

}
