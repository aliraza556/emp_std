import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginModel } from '../../_models/login.interface';
import { LoginService } from '../../_services/login.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { ConfigService } from '../../_services/config.service';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';


// import { Observable } from 'rxjs/Observable';

import moment from 'moment';
import { ErrorRegisterService } from '../../_services/error-register.service';
import { RecoverPasswordService } from '../../_services/recover-password.service';
import { EmailValidator, EqualPasswordsValidator } from '../../validators';
@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['reset-password.component.css'],
  providers: [RecoverPasswordService, LoginService, ConfigService, EmailValidator, EqualPasswordsValidator],
})
export class ResetPasswordComponent {
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  public form: FormGroup;
  format2 = "YYYY-MM-DD HH:mm:ss";
  public email: FormControl;
  public password: FormControl | any;
  public login: LoginModel | any; // our model
  constructor(private _recoverPassword: RecoverPasswordService,
    private router: Router, private cs: ConfigService, fb: FormBuilder, private er: ErrorRegisterService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],

    });

    this.email = this.form.controls['email'] as FormControl;


  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }

  myMessage = '';
  changeClass = false;
  tokenKey = 'x-auth-token';
  ngOnInit() {
    // this.login = {
    //   email: 'ejazsidhu@gmail.com',
    //   password: 'admin'
    // }
  }

  public onSubmit(values: any) {


    if (this.form.valid) {
      let model = {
        email: this.form.value.email,

      }

      this.changeClass = true;
      this._recoverPassword.recoverPassword(model.email).subscribe(
          (data: { message: string; success: boolean; data: null; }) => {

          this.changeClass = false;

          this.myMessage = data.message;

          if (data.success === false && data.data === null) {

            this.myMessage = data.message;
            // this.successTrigger
            this.errorTrigger=true;

            // this.staticModal.show();
          }
          else if (data.success === true) {
            this.myMessage = data.message;
            this.successTrigger = true;
          }



          //else if (data.success===true && data.message==="")
          //this.router.navigate(['dashboard']);
        },
          (error: any) => {

          this.changeClass = false;
          let m = moment().format(this.format2);

          let err = this.er.CompileErrorMessage(error, "getTotalWorrkingHoursStats()", m, "service dashboard-content-2");
          this.er.updateErrorList(err.errorDetail);
          this.myMessage = err.errorMessage;
          this.errorTrigger = true;

        });

    }
  }

}
