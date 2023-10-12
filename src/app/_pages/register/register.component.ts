import { ConfigService } from '../../_services/config.service';
import { ErrorRegisterService } from '../../_services/error-register.service';
import { Component, ViewChild } from '@angular/core';
import { RegisterModel } from '../../_models/register.model';
import { RegisterService } from '../../_services/register.service';
import { ModalDirective } from 'ng2-bootstrap';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ChangePasswordService } from '../../_services/changePassword.service';
import { EqualPasswordsValidator, EmailValidator } from '../../validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],

  providers: [RegisterService, ChangePasswordService],
})
export class RegisterComponent {
  triggerk: boolean = false;
  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  public myMessage = '';
  public user: RegisterModel | any;
  public form: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public timezone: FormControl;
  public passwords: FormGroup;
  public newPassword: FormControl;
  public repeatPassword: FormControl;
  public companyName: FormControl;
  public mondayCBox: FormControl;
  public tuesdayCBox: FormControl;
  public wedCBox: FormControl;
  public thursdayCBox: FormControl;
  public fridayCBox: FormControl;
  public saturdayCBox: FormControl;
  public sundayCBox: FormControl;

  public timezoneData: any;

  changeClass = false;
  errorTrigger: boolean | any;



  constructor(public configService: ConfigService, public fb: FormBuilder, public _registerService: RegisterService, private router: Router, public errorService: ErrorRegisterService) {
    this.getTimezoneID();

    this.form = fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
      'timezone': ['', Validators.compose([Validators.required])],
      'companyName': ['', Validators.compose([Validators.required])],
      'mondayCBox': [false],
      'tuesdayCBox': [false],
      'wedCBox': [false],
      'thursdayCBox': [false],
      'fridayCBox': [false],
      'saturdayCBox': [false],
      'sundayCBox': [false],


      'passwords': fb.group({
        'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('newPassword', 'repeatPassword') })
    });

    this.firstName = this.form.controls['firstName'] as FormControl;
    this.lastName = this.form.controls['lastName'] as FormControl;
    this.email = this.form.controls['email'] as FormControl;
    this.timezone = this.form.controls['timezone'] as FormControl;
    this.companyName = this.form.controls['companyName'] as FormControl;
    this.mondayCBox = this.form.controls['mondayCBox'] as FormControl;
    this.tuesdayCBox = this.form.controls['tuesdayCBox'] as FormControl;
    this.wedCBox = this.form.controls['wedCBox'] as FormControl;
    this.thursdayCBox = this.form.controls['thursdayCBox'] as FormControl;
    this.fridayCBox = this.form.controls['fridayCBox'] as FormControl;
    this.saturdayCBox = this.form.controls['saturdayCBox'] as FormControl;
    this.sundayCBox = this.form.controls['sundayCBox'] as FormControl;
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.newPassword = this.passwords.controls['newPassword'] as FormControl;
    this.repeatPassword = this.passwords.controls['repeatPassword'] as FormControl;
  }


  ngOnInit() {

  }
  getTimezoneID() {

    this._registerService._getTimezoneID().subscribe(
        (data: { data: any; }) => {
        this.timezoneData = data.data;

      },
        (error: any) => {
        this.changeClass = false;
        let err = this.errorService.CompileErrorMessage(error, "onsubmit", this.configService.dateFormat, "login");

        this.myMessage = err.errorMessage;
        this.errorTrigger = true;

        // if (error.status === 0) {
        //   this.staticModal.show();
        //   this.myMessage = "Unable to access to Server";
        // }
        // if (error.status === 500) {

        //   let bodyObject = JSON.parse(error);
        //   this.myMessage = ' , ' + error.status;
        //   this.myMessage += ' , ' + error.statusText;
        //   this.myMessage += ' , ' + bodyObject.exception;
        //   this.staticModal.show();
        // }
      });

  }




  public onSubmit(values: any) {

    if (this.form.valid) {
      let model = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        timezone: this.form.value.timezone,
        monday: this.form.value.mondayCBox,
        tuesday: this.form.value.tuesdayCBox,
        wednesday: this.form.value.wedCBox,
        thursday: this.form.value.thursdayCBox,
        friday: this.form.value.fridayCBox,
        saturday: this.form.value.saturdayCBox,
        sunday: this.form.value.sundayCBox,
        companyName: this.form.value.companyName,
        password: this.form.value.passwords.newPassword,
        status: 'Pending'

      }

      this.changeClass = true;
      this._registerService.register(JSON.stringify(model)).subscribe(
          (data: { message: string; }) => {
          this.changeClass = false;

          this.myMessage = data.message + "\n" + "\n Go to your email account to verify.";
          this.triggerk = true;
          // this.staticModal.show();

          setTimeout(() => {
            this.triggerk = false;
            this.router.navigate(['login']);
          }, 7000);
        },
          (error: any) => {
          this.changeClass = false;
          let err = this.errorService.CompileErrorMessage(error, "onsubmit", this.configService.dateFormat, "login");

          this.myMessage = err.errorMessage;
          this.errorTrigger = true;

          // if (error.status === 0) {
          //   // this.staticModal.show();
          //   this.myMessage = "Unable to access to Server";
          //   this.triggerk = true;
          // }
          // if (error.status === 500) {

          //   let bodyObject = JSON.parse(error);
          //   this.myMessage = ' , ' + error.status;
          //   this.myMessage += ' , ' + error.statusText;
          //   this.myMessage += ' , ' + bodyObject.exception;
          //   this.triggerk = true;
          //   // this.staticModal.show();
          // }
        });
    }
  }
}
