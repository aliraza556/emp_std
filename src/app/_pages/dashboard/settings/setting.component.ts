
import { Component, Input, ViewChild, OnChanges, SimpleChanges, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap';
import { SettingsService } from '../../../_services/setting.service';

import 'rxjs/add/operator/map';
import { ErrorRegisterService } from "../../../_services/error-register.service";
import moment from 'moment';

@Component({
  selector: 'settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [SettingsService],

})
export class SettingComponent implements OnChanges {

  @Input('inputUser') private inputUserId: any;
  token_value: any;
  changeClass: boolean | any;
  selectRadio: any;//ProductivitySetting;
  format2 = "YYYY-MM-DD HH:mm:ss";
  storedNames: any = JSON.parse(localStorage.getItem("UTO") as string);
  myMessage = 'Setting Page';

  id: any;//= this.storedNames.userID;
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  valueCheck = false;
  valueHolder = 0;


  @ViewChild('staticModal') public staticModal: ModalDirective | any;

  constructor(private service: SettingsService, private er: ErrorRegisterService, private _router: Router,
    public route: ActivatedRoute
  ) {

    // this.route.params.subscribe(params => {
    //   this.id = params['id']
    // });
    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO')as string);
      this.storedNames = c;
    }

    this.id = sessionStorage.getItem('userId')

    // this.id = this.inputUserId;
    this.token_value = this.storedNames.token;
    this.validateLogin();
  }
  validateLogin() {
    this.token_value = this.storedNames.token;

    if (!this.token_value) {
      this._router.navigate(['login']);
    }
  }
  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.id = changes.inputUserId.currentValue;
    // this.getUserProductivitySettingData();
  }

  // public wCam = [
  //   { value: true, display: 'Enable' },
  //   { value: false, display: 'Disable' }
  // ];
  // public bCams = [
  //   { value: true, display: 'Enable' },
  //   { value: false, display: 'Disable' }
  // ];
  // public sShot = [
  //   { value: true, display: 'Enable' },
  //   { value: false, display: 'Disable' }
  // ];
  // public wBlur = [
  //   { value: true, display: 'Enable' },
  //   { value: false, display: 'Disable' }
  // ];
  public timeIntervalList = [

    { value: 5, display: 5 },
    { value: 10, display: 10 },
    { value: 15, display: 15 },
    { value: 20, display: 20 },

  ];
  public activitiesFrequencyList = [

    { value: 5, display: 5 },
    { value: 10, display: 10 },
    { value: 15, display: 15 },
    { value: 20, display: 20 },

  ];
  public screeshotBlurFrequncyList = [

    { value: 0, display: 0 },
    { value: 1, display: 1 },
    { value: 2, display: 2 },
    { value: 3, display: 3 },
    { value: 4, display: 4 },
    { value: 5, display: 5 },

  ];
  public screenshotsFrequencyList = [

    { value: 0, display: 'Disabled' },
    { value: 1, display: 'Enable' },

  ];
  public webcamShotFrequencyList = [

    { value: 0, display: 'Disabled' },
    { value: 1, display: 'Enable' },


  ];
  onActivityChange1(event: Event) {

    event.preventDefault();
    this.selectRadio.activityCount = this.selectRadio.activityCount;


  }
  // onActivityChange(event) {


  // }
  ngOnInit() {
    this.selectRadio = {
      webcamShotFrequency: this.webcamShotFrequencyList[0].value,
      screenshotBlurLevel: this.screeshotBlurFrequncyList[0].value,
      screenshotFrequency: this.screenshotsFrequencyList[0].value,
      timecardInterval: this.timeIntervalList[0].value,
      activitiesFrequency: this.activitiesFrequencyList[0].value,
    }
    this.getUserProductivitySettingData();

  }
  getUserProductivitySettingData() {


    this.service.getUserProductivitySettings(this.id).subscribe(
        (data: { data: { timecardInterval: any; activityCount: any; screenshotCount: any; webcamCount: any; screenshotBlurLevel: any; }; }) => {

        this.changeClass = false;
        this.selectRadio = {
          timecardInterval: data.data.timecardInterval,
          activitiesFrequency: data.data.activityCount,
          screenshotFrequency: data.data.screenshotCount,
          webcamshotFrequency: data.data.webcamCount,
          screenshotBlurLevel: data.data.screenshotBlurLevel,
        }

      },
        (error: { status: number; statusText: string; }) => {


        if (error.status === 0) {
          let m = moment().format('S SS SSS');
          this.myMessage = 'Unable to connect to Server...!!';
          this.er.updateErrorList('settings:  ' + this.myMessage + m);
          this.errorTrigger = true;
          // this.staticModal.show();
        }
        if (error.status == 500) {
          let m = moment().format('S SS SSS');
          this.myMessage = error.statusText;
          this.errorTrigger = true;
          // this.staticModal.show();
          this.er.updateErrorList('settings:  ' + this.myMessage + m);
        }
        // else{
        //    this.er.updateErrorList("settings:  " + this.myMessage);
        // }

      });

  }
  onSubmit(value: any): void {
    // this.changeClass = true;
    let payload = {
      activitiesFrequency: value.activitiesFrequency,
      // applicationCaptureEnabled: true,
      screenshotFrequency: value.screenshotFrequency,
      screenshotBlurFrequency: value.screenshotBlurFrequency,
      timecardInterval: value.timecardInterval,
      webcamshotFrequency: value.webcamshotFrequency
    };



    this.service.changeProductivitySettings(this.id, JSON.stringify(payload)).subscribe(
        (data: { data: null; success: boolean; message: string; }) => {

        this.changeClass = false;
        if (data.data === null && data.success === false) {
          this.myMessage = data.message;
          this.er.UpdatePopUpMessageList('settings:  ' + this.myMessage);
          this.successTrigger = true;
          window.scrollTo(0, 0)
        }
        else {
          let m = moment().format('S SS SSS');
          this.myMessage = data.message;
          this.er.UpdatePopUpMessageList('settings:  ' + this.myMessage + m);
          this.successTrigger = true;


        }
        setTimeout(() => {
          this.successTrigger = false;
        }, 10000);

      },
        (error: { message: string; }) => {

        let m = moment().format(this.format2);

        let err: any = this.er.CompileErrorMessage(error, "OnSubmit()", m, "Prodictivity Settings");
        this.er.updateErrorList(err);
        this.myMessage = error.message;
        this.errorTrigger = true;
      });
  }
}
