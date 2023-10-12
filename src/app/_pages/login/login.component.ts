import * as decode from 'jwt-decode';
import { EqualPasswordsValidator } from '../../validators';
import { Component } from '@angular/core';
import { LoginModel } from '../../_models/login.interface';
import { LoginService } from '../../_services/login.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../_services/config.service';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { EmailValidator } from '../../validators';
import { ErrorRegisterService } from '../../_services/error-register.service';
// import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService, ConfigService, EmailValidator, EqualPasswordsValidator],
})
export class LoginComponent {

  // @ViewChild('staticModal') public staticModal: ModalDirective;
  // @ViewChild('modal_component') modal_component: any;
  format2 = "YYYY-MM-DD HH:mm:ss";
  employee_role: boolean = false;
  manager_role: boolean = false;
  admin_role: boolean = false;
  super_role: boolean = false;
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  public form: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public login: LoginModel | any; // our model
  errorTitle: string = '';
  constructor(private errorService: ErrorRegisterService,
    private _loginService: LoginService, private router: Router,
    private configService: ConfigService, fb: FormBuilder,

  ) {
    localStorage.clear();

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required])],
    });

    this.email = this.form.controls['email'] as FormControl;
    this.password = this.form.controls['password'] as FormControl;
  }
  myMessage = '';
  changeClass = false;
  tokenKey = 'x-auth-token';

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }


  public onSubmit(values: any) {


    if (this.form.valid) {
      let model = {
        email: this.form.value.email,
        password: this.form.value.password
      }

      this.changeClass = true;
      this._loginService.loginUser(model).subscribe(
          (data: { success: boolean; message: string; data: { token: any; userName: string; userId: any; email: any; timezone: any; organizationId: any; }; }) => {

          if (!data.success) {
            this.myMessage = data.message;
            this.errorTrigger = true;
            this.changeClass = false;
          }

          let jwt: any = '';
          jwt = decode(data.data.token);
          if (!data.success) {
            this.myMessage = data.message;
            this.successTrigger = true;
            // this.staticModal.show();
          }
          // if (data.success === false) {
          //   this.myMessage = data.message;
          //   this.successTrigger = true;
          // }
          // else if (data.data.token) {
          // }

          this.errorService.setUserName(data.data.userName)

          let lsObject = {
            userID: data.data.userId,
            userMail: data.data.email,
            userName: data.data.userName,
            token: data.data.token,
            timeZone: data.data.timezone,
            admin_role: this.admin_role,
            manager_role: this.manager_role,
            employee_role: this.employee_role,
            organizationId: data.data.organizationId
          }


          localStorage.setItem("UTO", JSON.stringify(lsObject));
          if (jwt !== '') {
            for (var i = 0; i < jwt.roles.length; i++) {
              if (jwt.roles[i] == 'ROLE_ADMIN') {
                this.admin_role = true;
                this.changeClass = false;
                this.router.navigate(['dashboard/admin-dashboard']);
                // setTimeout(() => {
                // }, 100);
                // break;
              }

              if (jwt.roles[i] == 'ROLE_SUPER_ADMIN') {
                this.super_role = true;
                this.changeClass = false;
                this.router.navigate(['dashboard/super-admin']);
                // setTimeout(() => {

                // }, 100);
              }
              else if (jwt.roles[i] == 'ROLE_MANAGER') {
                this.manager_role = true;
                this.changeClass = false;
                this.router.navigate(['dashboard']);

                // setTimeout(() => {

                // }, 100);

                // break;

              }
              else if (jwt.roles[i] == 'ROLE_EMPLOYEE') {
                this.employee_role = true;
                this.changeClass = false;
                this.router.navigate(['dashboard']);
                // setTimeout(() => {

                // }, 100);
              }


              else if (!jwt.roles) {
                this.myMessage = "User role is not avaiable"
                this.errorTrigger = true;
              }

            }
          }
          setTimeout(() => {
            this.successTrigger = false;
          }, 5000);

        },
          (error: any) => {

          this.changeClass = false;
          let err = this.errorService.CompileErrorMessage(error, "onsubmit", this.configService.dateFormat, "login");
          this.myMessage = err.errorMessage;
          this.errorTrigger = true;
          this.errorTitle = err.errorTitle;


        });

    }
  }



}
