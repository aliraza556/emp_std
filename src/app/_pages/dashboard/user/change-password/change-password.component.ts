import { Location } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../../validators';
import { ModalDirective } from 'ng2-bootstrap';
import { ChangePasswordService } from '../../../../_services/changePassword.service';
import { ErrorRegisterService } from '../../../../_services/error-register.service';
import moment from 'moment';
import 'rxjs/add/operator/map';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [EmailValidator, EqualPasswordsValidator, ChangePasswordService],

})
export class ChangePasswordComponent implements AfterViewInit {

  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  storedNames: any= JSON.parse(localStorage.getItem("UTO") as string);
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  format2 = "YYYY-MM-DD HH:mm:ss";

  myMessage = '';
  _oldPass = '';
  _newPass = '';
  token_name = 'x-auth-token';
  token_value: string | any;
  id: any//= this.storedNames.userID;
  public form: FormGroup;
  public oldPassword: FormControl;
  public newPassword: FormControl;
  public repeatPassword: FormControl;
  public passwords: FormGroup;

  public submitted: boolean = false;
  changeClass = false;
  constructor(fb: FormBuilder,
    private _changePassword: ChangePasswordService, private location: Location,
    private router: Router, private er: ErrorRegisterService) {
      if (localStorage.getItem('UTO')) {
        let c: any = JSON.parse(localStorage.getItem('UTO') as string);
        this.storedNames = c;
         }

    this.id = this.storedNames.userID;
    this.validateLogin();
    this.form = fb.group({
      'oldPassword': ['', Validators.compose([Validators.required])],
      'passwords': fb.group({
        'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('newPassword', 'repeatPassword') })
    });
    this.oldPassword = this.form.controls['oldPassword'] as FormControl;
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.newPassword = this.passwords.controls['newPassword'] as FormControl;
    this.repeatPassword = this.passwords.controls['repeatPassword'] as FormControl;

  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }
  validateLogin() {
    this.token_value = this.storedNames.token;

    if (!this.token_value) {
      this.router.navigate(['login']);
    }
  }

  public onSubmit(values: { oldPassword: string; passwords: { newPassword: string; }; }): void {
    this.token_value = this.storedNames.token;
    // this.token_value = window.localStorage.getItem(this.token_name);
    this.submitted = true;
    if (this.form.valid) {

      this._oldPass = values.oldPassword;
      this._newPass = values.passwords.newPassword;
      this.changeClass = true;
      this._changePassword.changePassword(this.id, this._oldPass, this._newPass, this.token_name, this.token_value).subscribe(
          (data: { data: null; success: boolean; message: string; }) => {
          this.form.reset();
          this.changeClass = false;
          let m = moment().format(this.format2);
          if (data.data === null && data.success === false) {
            this.myMessage = data.message;
            this.er.UpdatePopUpMessageList(m + ' change password:' + this.myMessage);
            this.successTrigger = true;
          }
          else {
            this.myMessage = data.message;
            this.er.UpdatePopUpMessageList(m + " change password:" + this.myMessage);
            this.successTrigger = true;
          }

          setTimeout(() => {
            this.successTrigger = false;
          }, 10000);
        },
          (error: any) => {
          this.changeClass = false;
          let m = moment().format(this.format2);

          let err = this.er.CompileErrorMessage(error, "onSubmit()", m, "change-password");
          this.er.updateErrorList(err.errorDetail);
          this.myMessage = err.errorMessage;
          this.errorTrigger = true;



        });




    }

  }
  ngAfterViewInit() {
    this.location.replaceState('/change-password')
  }

}
