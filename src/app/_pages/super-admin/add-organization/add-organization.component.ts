import { ConfigService } from '../../../_services/config.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../../_services/register.service';
import { TeamService } from '../../../_services/admin/team.service';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { EmailValidator, EqualPasswordsValidator } from '../../../validators';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {

  myMessage: string = '';
  changeClass: boolean = false;
  successTrigger: boolean = false;
  errorTrigger: boolean= false;
  timezoneData: any = [];
  public adminSignupform: FormGroup;
  format2 = "YYYY-MM-DD HH:mm:ss";
  constructor(public config:ConfigService,private fb: FormBuilder, public _registerService: RegisterService, private tserice: TeamService, private er: ErrorRegisterService) {
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

        let err = this.er.CompileErrorMessage(error, "getTimezonrID()", this.config.dateFormat, "Add-organization");
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
      this.getTimezoneID()
      window.scrollTo(0, 0);

    },
        (error: any) => {

        this.changeClass = false;

        let err = this.er.CompileErrorMessage(error, "OnSubmit()", this.config.dateFormat, "Add-organization");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
        window.scrollTo(0, 0);
      });
  }


}
