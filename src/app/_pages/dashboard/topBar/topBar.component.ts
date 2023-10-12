import { ConfigService } from '../../../_services/config.service';
import * as decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import 'rxjs/add/operator/map';

declare var jquery: any; declare var $: any;
@Component({
  selector: 'topBar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.css']

})
export class TopBarComponent implements OnInit {
  popUpList: any[];
  cahngeValue = false;
  userName = "dummay name";
  user_mail;

  ip=this.configService.ip;
  port=this.configService.port;

  admin_side = false;
  storedNames: any=JSON.parse(localStorage.getItem("UTO") as string);

  // token_name = 'UTO';
  token_value: string | any;
  manager_role: boolean = false;
  employee_role: boolean = false;
  myMessage: string | any;
  errorTrigger: boolean = false;
  admin_role: boolean = false;
  super_role=false;
  token: any;
  // @Output() value: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private er: ErrorRegisterService, private router: Router,public configService:ConfigService) {

    this.togglefunction();
    if (localStorage.getItem('UTO')) {

      let c: any = JSON.parse(localStorage.getItem('UTO') as string);
      this.storedNames = c;
      this.token = this.storedNames.token;

    }


    this.errorList = this.er.getError();
    this.popUpList = this.er.getPopUpMessages();



    let jwt = decode(this.token);

    for (var i = 0; i < jwt.roles.length; i++) {
      if (jwt.roles[i] == 'ROLE_ADMIN') {
        this.admin_side = true;
        this.admin_role = true;

        // break;
      }
      else if (jwt.roles[i] == 'ROLE_SYPER_ADMIN') {
        this.super_role = true;
        // break;

      }

      else if (jwt.roles[i] == 'ROLE_MANAGER') {
        this.manager_role = true;
        // break;

      }
      else if (jwt.roles[i] == 'ROLE_EMPLOYEE') {
        this.employee_role = true;
        // break;
      }
      else if (!jwt.roles) {
        this.myMessage = "User role is not avaiable"
        this.errorTrigger = true;
      }
    }
    // this.admin_side = true;
    if (!this.storedNames || this.storedNames == null) {
      this.validateLogin();
    }
    else {
      this.user_mail = this.storedNames.userMail;
      this.er.currentName.subscribe((data: string) => {

        if (data !== "")
          this.userName = data
        else {
          this.userName = this.storedNames.userName;
        }
      });

    }

  }


  ngOnInit() {
    this.er.currentName.subscribe((data: string) => {


      if (data !== "")
        this.userName = data
      else {
        this.userName = this.storedNames.userName;
      }
    });
  }


  togglefunction() {
    $(document).ready(function () {

      $("#toggle-btn").click(function () {
        let w = $(window).width();

        if (w <= 1024) {
          $("#page").toggleClass("active-sm");
          $("#side-navbar").toggleClass("show-sm");
        }
        else {
          $("#page").toggleClass("active");
          $("#side-navbar").toggleClass("shrink");

        }


        $("span.mobileSpan").toggleClass('no-display');
        $("#noPadding").toggleClass('noPadding');


      });

    });
  }

  errorList: string[] = [];
  errorCount(c: number) {
    if (c <= 0) {
      return false;
    }
    else
      return true;

  }


  ngOnInt() {

    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO') as string);
      this.storedNames = c;
       }


  }

  validateLogin() {
    this.storedNames = JSON.parse(localStorage.getItem("UTO") as string);

    this.token_value = this.storedNames;

    if (!this.token_value || this.token_value == null) {
      this.router.navigate(['login']);
    }
  }


}
