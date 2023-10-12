import { Location } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
// import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']



})
export class NotificationComponent implements AfterViewInit {
  errorList:string[] = [];
  popUpList: any[];
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  constructor(private er: ErrorRegisterService, private _router: Router, private location: Location) {
    // this.validateLogin();

    this.errorList = this.er.getError();
    this.popUpList = this.er.getPopUpMessages();

  }

  token_value: any;
  @ViewChild('staticModal') public staticModal: ModalDirective | any;


  myMessage = 'Error List is Empty';
  popError(i: number) {
    this.errorList.splice(i, 1);
  }
  popList(i: number) {
    this.popUpList.splice(i, 1);
  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }

  storedNames = JSON.parse(localStorage.getItem("UTO") as string);

  validateLogin() {
    this.token_value = this.storedNames.token;

    if (!this.token_value) {
      this._router.navigate(['login']);
    }
  }

  ngAfterViewInit() {
    this.location.replaceState('/notification')
  }


}
