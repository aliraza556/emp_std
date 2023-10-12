import { Location } from '@angular/common';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { EditProfileService } from '../../../../_services/edit-profile.service';
import { ErrorRegisterService } from '../../../../_services/error-register.service';
import moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';

import 'rxjs/add/operator/map';
import { RegisterService } from '../../../../_services/register.service';
@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [EditProfileService, RegisterService]

})
export class EditProfileComponent implements AfterViewInit {
  timezoneData: any;
  format2 = "YYYY-MM-DD HH:mm:ss";
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  storedNames: any= JSON.parse(localStorage.getItem("UTO") as string);

  myMessage = '';
  token_name = 'x-auth-token';
  token_value: any;//= this.storedNames.token;
  changeClass = false;
  id: any //= this.storedNames.userID;
  // userName = this.storedNames.userName;

  email: any;// = this.storedNames.userMail
  tZone: any;//= this.storedNames.timeZone;
  timezoneId = "(GMT-12:00) Etc/GMT+12";

  constructor(public _registerService: RegisterService, fb: FormBuilder, private location: Location,
    private router: Router, private _editProfile: EditProfileService, private er: ErrorRegisterService
  ) {

    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO') as string);
      this.storedNames = c;
       }
    this.token_value = this.storedNames.token;
    this.id = this.storedNames.userID;
    this.userName = this.storedNames.userName;

    this.email = this.storedNames.userMail
    this.tZone = this.storedNames.timeZone;


    this.validateLogin();
    this.getNewVlues();
    this.getTimezoneID();

    this.form = fb.group({
      'userMail': [{ value: this.email, disabled: true }, Validators.compose([Validators.required, Validators.minLength(4)])],
      'userName': [this.userName, Validators.compose([Validators.required, Validators.minLength(4)])],
      'timezone': ['Asia/Karachi', Validators.compose([Validators.required])],


    });
    this.userMail = this.form.controls['userMail'] as FormControl;
    this.userName = this.form.controls['userName'] as FormControl;
    this.timezone = this.form.controls['timezone'] as FormControl;


  }
  getNewVlues() {
    this.id = this.storedNames.userID;
    // if(this.er.currentName!==''){

    // }


    this.userName = this.storedNames.userName;

    this.email = this.storedNames.userMail
    this.tZone = this.storedNames.timeZone;

  }
  getTimezoneID() {

    this._registerService._getTimezoneID().subscribe(
        (data: { data: any; message: string; }) => {

        this.timezoneData = data.data;
        this.myMessage = data.message;
        ;

      },
        (error: any) => {
        this.changeClass = false;
        let m = moment().format(this.format2);

        let err = this.er.CompileErrorMessage(error, "getTimezone()", m, "Edit-Profile");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });

  }

  public form: FormGroup;
  public userName: FormControl;
  public timezone: FormControl;
  public userMail: FormControl;
  // public timezoneID:AbstractControl;

  public submitted: boolean = false;


  navigateToDashboard() {
    this.router.navigate(['../dashboard']);
  }

  validateLogin() {
    this.token_value = this.storedNames.token;

    if (!this.token_value) {
      this.router.navigate(['login']);
    }
  }
  public onSubmit(values: any): void {
    this.changeClass=true
    this.token_value = this.storedNames.token;
    this.submitted = true;

    if (this.form.valid) {


      this._editProfile.editProfile(this.id, values.userName, values.timezone).subscribe(
          (data: { data: { timezone: any; message: string; } | null; success: boolean; }) => {
          this.er.setUserName(values.userName)

          // let er = new ErrorRegisterService();
          // let router: Router;
          // let topBar = new TopBarComponent(er, router);
          // topBar.ngOnInt()

          this.changeClass = false;

          if (data.data) {
            let newUserObject = {
              userID: this.storedNames.userID,
              userMail: this.email,
              token: this.token_value,
              timeZone: data.data.timezone,
              userName: values.userName,
              admin_role: this.storedNames.admin_role,
              manager_role: this.storedNames.manager_role,
              epmoyee_role: this.storedNames.employee_role,
              organizationId: this.storedNames.organizationId


            }

            localStorage.setItem("UTO", JSON.stringify(newUserObject));
            // var storedNamess = JSON.parse(localStorage.getItem("UTO"));

            this.myMessage = data.data.message

          }
          let m = moment().format(this.format2);

          if (data.success) {
            // this.er.setUserName(values.userName)
            this.myMessage = 'User profile successfully updated';
            this.er.UpdatePopUpMessageList(m + 'edit profile:' + this.myMessage);
            this.successTrigger = true;
            window.scrollTo(0, 0);
            // setTimeout(() => {
            //   location.reload();
            // }, 3000);
          }
          if (data.data === null && data.success === false) {
            this.er.UpdatePopUpMessageList(m + ' edit profile:' + this.myMessage);
            this.successTrigger = true;
          }

          // this.er.getUserName().subscribe(d=>{

          // })
          setTimeout(() => {
            this.successTrigger = false;
          }, 10000);

        },
          (error: any) => {
          this.changeClass = false;
          let m = moment().format(this.format2);

          let err = this.er.CompileErrorMessage(error, "OnSubmit()", m, "Edit-Profile");
          this.er.updateErrorList(err.errorDetail);
          this.myMessage = err.errorMessage;
          this.errorTrigger = true;

        });
    }
  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }

  ngAfterViewInit() {
    this.location.replaceState('/edit-profile')
  }

}
