import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { VerificationService } from '../../_services/verification.service';
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../validators';
import { ErrorRegisterService } from "../../../_services/error-register.service";

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import moment from 'moment';
import { ConfigService } from '../../../_services/config.service';
import { RecoverPasswordService } from '../../../_services/recover-password.service';
@Component({
  selector: 'passwd/reset',
  templateUrl: './add-new-password.component.html',

})
export class AddNewPasswordComponent implements OnInit {
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  triggerk: boolean = false;
  changeClass: boolean = false;
  showLoginLink = false;
  _newPass: any;
  _oldPass: string | any;
  token_value: any;

  public form: FormGroup;
  public oldPassword: FormControl;
  public newPassword: FormControl;
  public repeatPassword: FormControl;
  public passwords: FormGroup;
  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  myMessage = '';

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router
    , private http: HttpClient, fb: FormBuilder, private rps: RecoverPasswordService,
    private errorService: ErrorRegisterService, private configService: ConfigService) {

    this.form = fb.group({
      'oldPassword': ['admin', Validators.compose([Validators.required, Validators.minLength(4)])],
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
  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token_value = params['token'];


    });
  }

  public onSubmit(values: { passwords: { newPassword: any; }; }): void {
    // this.token_value = this.storedNames.token;
    // this.token_value = window.localStorage.getItem(this.token_name);
    // this.submitted = true;
    if (this.form.valid) {


      this._oldPass = '';

      this._newPass = values.passwords.newPassword;

      this.changeClass = true;

      this.rps.changePassword(this.token_value, this._oldPass, this._newPass, ).subscribe(
          (data: { success: boolean; message: string; }) => {

          this.changeClass = false;


          if (!data.success) {

            this.myMessage = data.message;
            // this.errorService.UpdatePopUpMessageList("add new password-" + this.myMessage + this.configService.dateFormat);
            this.errorTrigger = true;
          }
          else if (data.success) {
            this.myMessage = data.message;
            this.showLoginLink = true;
            this.successTrigger=true;
          }
          setTimeout(() => {
           this.successTrigger=false;
           this.errorTrigger=false;
          }, 5000);
        },
          (error: any) => {

          this.changeClass = false;

          let err = this.errorService.CompileErrorMessage(error, "onsubmit", this.configService.dateFormat, "login");
          this.myMessage = err.errorMessage;
          this.errorTrigger = true;


        });

    }

  }
}
