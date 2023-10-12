import { ErrorRegisterService } from '../../../_services/error-register.service';
import { EqualPasswordsValidator } from '../../../validators';
import { EmailValidator } from '../../../validators';
import { RegisterService } from '../../../_services/register.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from '../../../_services/admin/team.service';
import moment from 'moment';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  myMessage: string = '';
  changeClass: boolean = false;
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  timezoneData: any = [];
  public adminSignupform: FormGroup;
  format2 = "YYYY-MM-DD HH:mm:ss";
  errorTitle: string='';
  constructor(private fb: FormBuilder, public _registerService: RegisterService, private tserice: TeamService, private er: ErrorRegisterService) {
    this.adminSignupform = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      // lastName: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(3)])],
      timezone: ['Asia/Karachi', Validators.compose([Validators.required])],
      companyName: ['', Validators.compose([Validators.required])],
      license: [false, Validators.requiredTrue],

      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
        validator: EqualPasswordsValidator.validate('newPassword', 'repeatPassword')
      });

  }
  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }
  ngOnInit() {
    this.getTimezoneID();
 }

  getTimezoneID() {

    this._registerService._getTimezoneID().subscribe(
        (data: { data: any; }) => {
        this.timezoneData = data.data;
      },
        (error: any) => {
        this.changeClass = false;
        let m = moment().format(this.format2);

        let err = this.er.CompileErrorMessage(error, "getTimezonrID()", m, "Admin-Dashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });

  }

  reload() {
    location.reload();
  }

  public onSubmit(values: { firstName: any; email: any; newPassword: any; timezone: any; companyName: any; }) {

    this.changeClass = true;


    let model = {
      admin: {
        name: values.firstName,
        email: values.email,
        password: values.newPassword,
        timezone: values.timezone,

      },
      organization: {
        name: values.companyName
      }
    }



    this.tserice.postCompnaydetail(model).subscribe((data: { message: string; }) => {
      this.changeClass = false;

      this.myMessage = data.message ;//+ "Please visit your mail for verification";
      this.successTrigger = true;
      this.adminSignupform.reset();
      // this.getTimezoneID()
      window.scrollTo(0, 0);

    },
        (error: any) => {

        this.changeClass = false;
        let m = moment().format(this.format2);
        let err = this.er.CompileErrorMessage(error, "OnSubmit()", m, "Admin-signup");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
        this.errorTitle=err.errorTitle
        window.scrollTo(0, 0);
      });
  }

}
