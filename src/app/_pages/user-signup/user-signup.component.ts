import { UserService } from '../../_services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../_services/register.service';
import { EmailValidator, EqualPasswordsValidator } from '../../validators';
import { ActivatedRoute, Params } from '@angular/router';
import moment from 'moment';
import { ErrorRegisterService } from '../../_services/error-register.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  email: any;
  myMessage: string = "";
  loginLink = false;

  changeClass: boolean = false;
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  timezoneData: any = [];
  verificationKey = '';

  format2 = "YYYY-MM-DD HH:mm:ss";

  public userSignupform: FormGroup;

  constructor(private us: UserService, private fb: FormBuilder,
    public _registerService: RegisterService, private activatedRoute: ActivatedRoute, private er: ErrorRegisterService) {
    this.getTimezoneID();

    this.userSignupform = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
      timezone: ['Asia/Karachi', Validators.compose([Validators.required])],
      license: [false, Validators.requiredTrue],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    }, {
        validator: EqualPasswordsValidator.validate('newPassword', 'repeatPassword')
      });

  }
  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }

  ngOnInit() {


    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.verificationKey = params['invite_key'];
      this.email = params['email'];


      this.userSignupform = this.fb.group({
        firstName: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        email: [this.email, Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
        timezone: ['Asia/Karachi', Validators.compose([Validators.required])],
        license: [false, Validators.requiredTrue],
        newPassword: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {
          validator: EqualPasswordsValidator.validate('newPassword', 'repeatPassword')
        });

    });


  }

  getTimezoneID() {

    this._registerService._getTimezoneID().subscribe(
        (data: { data: any; }) => {
        this.timezoneData = data.data;

      },
        (error: any) => {
        this.changeClass = false;
        let m = moment().format(this.format2);
        let err = this.er.CompileErrorMessage(error, "getTimezoneID()", m, "User-signupComponent");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });

  }


  public onSubmit(values: { firstName: any; email: any; newPassword: any; timezone: any; }) {


    let model = {

      name: values.firstName,
      email: values.email,
      password: values.newPassword,
      timezone: values.timezone,

    }



    this.us.addNewUser(model, this.verificationKey, this.email).subscribe((data: { success: boolean; }) => {

          if (data.success == false) {
        this.myMessage = "No invitation found";
        this.errorTrigger = true;
      }

      else if (data.success == true) {
        this.loginLink = true;
        this.myMessage = "User successfully registered.";

        this.successTrigger = true
      }

      window.scrollTo(0, 0);
      this.userSignupform.reset();


    }, (error: any) => {

      window.scrollTo(0, 0);
      let m = moment().format(this.format2);
      let err = this.er.CompileErrorMessage(error, "getTimezoneID()", m, "User-signupComponent");
      this.er.updateErrorList(err.errorDetail);
      this.myMessage = err.errorMessage;
      this.errorTrigger = true;

    });


  }


}
