import { IMyDate } from '../timecard-3/timecard-3.component';
import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { IMyDpOptions, IMyOptions } from 'mydatepicker';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { DashboardService } from '../../../_services/dashboard.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../_services/config.service';
import moment from 'moment';

import { MultiUserTimecardService } from './multi-user-timecard.service';
import { environment } from '../../../../environments/environment';
declare var jquery: any; declare var $: any

@Component({
  selector: 'app-multi-user-timecard',
  templateUrl: './multi-user-timecard.component.html',
  styleUrls: ['./multi-user-timecard.component.css']
})
export class MultiUserTimecardComponent implements OnChanges, OnInit {
  @Input('inputUser') private inputUserId: any;
  currentUserId: any;
  timecardDetailList: any[] = [];
  timepicker1: any;
  serverIp = environment.serverIp;
  @ViewChild('modal_component') modal_component: any;
  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  @ViewChild('staticModal2') public staticModal2: ModalDirective | any;
  @ViewChild('staticModal3') public staticModal3: ModalDirective | any;
  public myForm: FormGroup | any;

  public userImage = '../../../../assets/img/userImage';
  storedNames: any = JSON.parse(localStorage.getItem("UTO") as string);
  // changeLog: any;
  ActivityStrength: any = 0;
  // imageIndex: any;
  selectedImageWeb: any;
  // fullImagePath: string;
  date = new Date();
  // imageEventList: any
  checkBox: any[] = [];
  checkBoxCount = false;
  format2 = "YYYY-MM-DD HH:mm:ss";
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  successTriggerModel: boolean = false;
  errorTriggerModel: boolean = false;
  public form: FormGroup;
  public disputed: FormControl;
  public disputedReply: FormControl;
  public disputedSettleComment: FormControl;
  ip = this.cs.ip;
  port = this.cs.port;
  public timecards: any[] = [];
  public timecardId: any = -1;
  dateSet: any;
  timecardCount = 0;
  firstTimecard = 0;
  lastTimecard = 0;
  changeClass = true;
  token_name = 'x-auth-token';
  token_value: string | any;
  format = 'x';
  noTimeCard = false;
  selectedImage: any;
  timecard: any[] | undefined;
  userTimeZone;
  totalMClick = 0;
  totalKClick = 0;
  myMessage: string | any;

  startDateTime2: any;
  endDateTime2: any;
  placeholder: any = '';


  //next previous date
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    showInputField: false,
    showClearDateBtn: false,
    alignSelectorRight: true,

    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }
  };
  //next previous date
  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false

    // disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }
  };


  todaydate = new Date();
  // Initialized to specific date (09.10.2018).
  public model = { date: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth() + 1, day: this.todaydate.getDate() }, filter: "all" };

  public constructor(private er: ErrorRegisterService,

                     private _service: DashboardService, private _router: Router,
                     private cs: ConfigService, private formBuilder: FormBuilder,
                     private multiUserTimecarService: MultiUserTimecardService
  ) {
    this.placeholder = this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day
    // this.startDateTime2 = new Date().toISOString();
    // this.endDateTime2 = new Date().toISOString();

    let d = new Date();
    let dd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.currentUserId = sessionStorage.getItem('userId') //changes.inputUserId.currentValue;
    let id = sessionStorage.getItem('userId')//changes.inputUserId.currentValue;
    this.userTimeZone = this.storedNames.timeZone;
    this.getTimecardList(id, dd, "all");

    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO')as string);
      this.storedNames = c;
    }
    this.form = this.formBuilder.group({
      'disputed': ['', Validators.compose([Validators.minLength(4)])],
      'disputedReply': ['',],
      'disputedSettleComment': ['']
    });
    this.disputed = this.form.controls["disputed"] as FormControl;
    this.disputedReply = this.form.controls["disputedReply"] as FormControl;
    this.disputedSettleComment = this.form.controls["disputedSettleComment"] as FormControl;

  }

  convertTimeFormat(time: { match: (arg0: RegExp) => any[]; }) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    // alert(sHours + ":" + sMinutes + ':00');
    return sHours + ":" + sMinutes + ':00';
  }

  ngOnInit() {

    $(document).ready(() => {

      $('#timepicker1').timepicker();
      $('#timepicker2').timepicker();

      this.startDateTime2 = $('#timepicker1').val();
      this.endDateTime2 = $('#timepicker2').val();

      // $('#timepicker1').on('change', function () {
      //   this.startDateTime2 = $('#timepicker1').val();
      // });

      // $('#timepicker2').on('change', function () {
      //   this.endDateTime2 = $('#timepicker2').val();
      //   // alert("end time " + this.endDateTime2);

      // });

      // this.startDateTime2 = $('#timepicker1').val();
      // this.endDateTime2 = $('#timepicker2').val();

    });
    this.myForm = this.formBuilder.group({
      selectedDate: [new Date(), Validators.required],
      // startDateTime: ['', Validators.required],
      // endDateTime: ['', Validators.required],
      // myDateRange: ['', Validators.required],
      title: ['', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    // let d = new Date();
    // let dd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    // this.dateSet = dd;
    // let ttt = d.getMonth() + 1 + '' + '_' + d.getDate() + '_' + d.getFullYear();

    // this.currentUserId = sessionStorage.getItem('uerId') //changes.inputUserId.currentValue;
    // let id = sessionStorage.getItem('uerId')//changes.inputUserId.currentValue;
    // this.userTimeZone = this.storedNames.timeZone;
    // this.getTimecardList(id, dd, "all");
  }

  getLatestTimecards() {
    let d = new Date();
    // this.validateLogin();
    let dd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    let id = this.currentUserId;//this.inputUserId.currentValue;
    this.getTimecardList(id, dd, "all");


  }


  onDisputeFormSubmit(id: any, form: { disputed: string; disputedReply: string; disputedSettleComment: string; }, action: string) {

    let comment = '';

    if (form.disputed != '') {
      comment = form.disputed;

    }
    else if (form.disputedReply != '') {
      comment = form.disputedReply;

    }
    else if (form.disputedSettleComment != '') {
      comment = form.disputedSettleComment;

    }

    let date = this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day;
    this._service.disputeComment(id, action, comment).subscribe(
        (data: { message: any; }) => {

          this.successTrigger = true;
          this.myMessage = data.message;
          let userId = this.currentUserId;//this.storedNames.userID
          this.getTimecardList(userId, date, "all");
          window.scrollTo(0, 0);
          setTimeout(() => { this.successTrigger = false }, 5000);

        },
        (error: any) => {
          window.scrollTo(0, 0);
          let m = moment().format(this.format2);

          let err = this.er.CompileErrorMessage(error, "onDisputeFormSubmit()", m, "multiTimtcard");
          this.er.updateErrorList(err.errorDetail);
          this.myMessage = err.errorMessage;
          this.errorTrigger = true;
        });


  }

  previousData(d: any) {

    this.changeClass = true;
    let year, days, month;
    if (d.date.month == 1 && d.date.day == 1) {
      year = d.date.year - 1;
    } else {
      year = d.date.year;
    }
    year = d.date.year;
    if (d.date.day == 1) {
      month = d.date.month - 1;

    } else {
      month = d.date.month;
    }
    if (d.date.day == 1) {
      let monthOfDay = new Date(d.date.year, d.date.month - 1, 0).getDate();

      days = monthOfDay;

    }
    else {
      days = d.date.day - 1;
    }

    if (d.date.date != undefined) {
      this.model = { date: { year: d.date.date.year, month: d.date.date.month, day: d.date.date.day - 1 }, filter: d.filter };
    } else {
      this.model = { date: { year: year, month: month, day: days }, filter: d.filter };

    }

    var hd: IMyDate[] = [this.model.date];
    this.myDatePickerOptions.highlightDates = hd;

    this.placeholder = this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day


    this.onSubmit(this.model.date, this.model.filter);

  }
  nextData(d: any) {
    this.changeClass = true;


    let monthOfDay = new Date(d.date.year, d.date.month, 0).getDate();
    let year, days, month;
    if (d.date.month == 12 && d.date.day == monthOfDay) {
      year = d.date.year + 1;
    } else {
      year = d.date.year;
    }
    year = d.date.year;
    if (d.date.day == monthOfDay) {
      month = d.date.month + 1;

    } else {
      month = d.date.month;
    }
    if (d.date.day == monthOfDay) {
      // let monthOfDay=new Date(d.date.year,d.date.month-1,0).getDate();

      days = 1;
      // days=d.date.day-1;
    }
    else {
      days = d.date.day + 1;
    }
    if (d.date.date != undefined) {
      this.model = { date: { year: d.date.date.year, month: d.date.date.month, day: d.date.date.day + 1 }, filter: d.filter };
    } else {
      this.model = { date: { year: year, month: month, day: days }, filter: d.filter };

    }
    var hd: IMyDate[] = [this.model.date];
    this.myDatePickerOptions.highlightDates = hd;

    this.placeholder = this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day

    // this.model = { date: { year: year, month: month, day: days }, filter: d.filter };

    // this.onSubmit(this.model);
    this.onSubmit(this.model.date, this.model.filter);

    // days=testDate.subtract(1,'days');
    // this.model={ date: { year:year , month:month , day:days} };


  }
  onSubmitFilter(model: any) {



    let d = model;
    if (d.date.date != undefined) {
      this.model = { date: { year: d.date.date.year, month: d.date.date.month, day: d.date.date.day }, filter: d.filter };
    } else {
      this.model = { date: { year: d.year, month: d.month, day: d.days }, filter: d.filter };

    }

    this.placeholder = this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day


    this.onSubmit(model.date, model.filter);

  }
  //next previous date
  public timedurration(tm: number, min: number, max: number) {
    if (tm >= min && tm <= max)
      return true;
    else
      return false;
  }


  actStrength(n: any) {

    return n.totalKeypressCount + n.totalMouseCount;
  }

  validateLogin() {
    this.token_value = this.storedNames.token;
    if (!this.token_value) {
      this._router.navigate(['login']);
    }
  }

  onSubmit(value: { year: any; month: any; day: any; date?: any; }, filter: string) {

    let d = value.date;
    this.changeClass = true;
    this.timecards = [];
    // let obj: any;
    let obj;
    if (d != undefined) {
      obj = { date: d.year + '.' + d.month + '.' + d.day, filter: filter }
      this.model = { date: { year: d.year, month: d.month, day: d.day }, filter: filter };
    }
    else {
      obj = { date: value.year + '.' + value.month + '.' + value.day, filter: filter }
      this.model = { date: { year: value.year, month: value.month, day: value.day }, filter: filter };

    }
    this.placeholder = this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day


    // if (value.date.date == undefined) {
    //   obj = { date: value.date.year + '.' + value.date.month + '.' + value.date.day, filter: value.filter }
    //   this.model = { date: { year: value.date.year, month: value.date.month, day: value.date.day }, filter: value.filter };
    // }
    // else {
    //   obj = { date: value.date.date.year + '.' + value.date.date.month + '.' + value.date.date.day, filter: value.filter }
    //   this.model = { date: { year: value.date.date.year, month: value.date.date.month, day: value.date.date.day }, filter: value.filter };

    // }

    // this.validateLogin();

    let id = this.currentUserId//this.inputUserId;
    this.getTimecardList(id, obj.date, obj.filter);
  }

  returnOnlyActivityEvent(obj: any) {
    let newObj = [];
    for (let r of obj) {
      if (r.eventType === 'ACTIVITY_EVENT')
        newObj.push(r);
    }
    return newObj;
  }

  getTimecardList(id: string | any, date: string, filter: string) {
    this.token_value = this.storedNames.token;
    this._service.getUserInfo(id, 'x-auth-token', this.token_value, date, filter).subscribe(
        (data: { data: any[]; }) => {
          this.changeClass = false
          this.noTimeCard = false;
          this.timecards = data.data;
          if (this.timecards.length == 0) {
            this.noTimeCard = true;
          }

          let res = this.removeDObject(data.data);

          for (let timecardIndex = 0; timecardIndex < res.length; timecardIndex++) {
            let imageEvents = res[timecardIndex].imageEvents;
            let finalImageEvents = new Array<any>(2)
            let counterWebcam = 0;
            let counterScreenshot = 0;
            for (let imageEventIndex = 0; imageEventIndex < imageEvents.length; imageEventIndex++) {
              if (imageEvents[imageEventIndex].eventType == 'WEB_CAM_EVENT' && counterWebcam == 0) {
                finalImageEvents[0] = (imageEvents[imageEventIndex]);
                counterWebcam = 1;
              }



              if (imageEvents[imageEventIndex].eventType == 'SCREEN_SHOT_EVENT' && counterScreenshot == 0) {
                finalImageEvents[1] = (imageEvents[imageEventIndex]);
                counterScreenshot = 1;
              }

            }

            res[timecardIndex].imageEvents = finalImageEvents;
          }
          this.timecards = res;

          this.timecardCount = this.timecards.length;

          this.firstTimecard = this.timecards[0];
          this.lastTimecard = this.timecards[this.timecards.length - 1];


        },
        (error: any) => {
          this.changeClass = false
          // let err = this.er.CompileErrorMessage(error, "onsubmit", this.cs.dateFormat, "login");

          //    this.modal_component.showPopUp(err.errorAlert, err.errorMessage);
          // this.modal_component.showPopUp('success', err.errorMessage);
          // this.modal_component.showPopUp('warning', err.errorMessage);

          let m = moment().format(this.format2);

          let err = this.er.CompileErrorMessage(error, "getTimecardList()", m, "dashboard-content-2");
          this.er.updateErrorList(err.errorDetail);
          this.myMessage = err.errorMessage;
          this.errorTrigger = true;
        });
  }

  setSelectedImage(image: any) {

    this.selectedImage = image;
    //this.imageIndex = i;
  }
  public removeDObject(things: any[]): any[] {
    const obj: {[key: string]: any} = {};

    for (var i = 0, len = things.length; i < len; i++)
      obj[things[i]['id']] = things[i];

    things = new Array();
    for (const key in obj)
      things.push(obj[key]);
    return things;
  }
  setSelectedImageWeb(image: any) {
    this.selectedImageWeb = image;
  }

  navigate(forward: any) {
    var index = this.timecards.indexOf(this.selectedImage) + (forward ? 1 : -1);
    if (index >= 0 && index < this.timecards.length) {
      this.selectedImage = this.timecards[index];
    }


  }

  onchecked(e: Event, n: any) {
    // Type assertion that e.target is HTMLInputElement
    const target = e.target as HTMLInputElement;

    if (target.checked && !this.checkBox.includes(n)) {
      this.checkBox.push(n);
      this.checkBoxCount = true;
    }
    else if (!target.checked && this.checkBox.includes(n)) {
      const index = this.checkBox.indexOf(n);

      // Ensure the item is found before trying to splice it
      if (index > -1) {
        this.checkBox.splice(index, 1);
      }
    }

    if (this.checkBox.length === 0) {
      this.checkBoxCount = false;
    }
  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
    this.errorTriggerModel = false;
    this.successTriggerModel = false;
  }

  cancleDelete() {
    // this.checkBox.pop();
    this.timecardDetailList = [];
    // this.checkBoxCount = false;
  }
  deleteBulkSetMessage() {

    this.timecardDetail();

    this.myMessage = "Do you want to delete following timecard(s)?";
  }
  DeleteAllTimecard() {

    if (this.checkBox.length > 0) {
      //calling delte service

      this.OndeleteTimecardBulk(this.checkBox);

      for (var k = 0; k < this.checkBox.length; k++) {
        for (var i = 0; i < this.timecards.length; i++) {
          if (this.timecards[i].id == this.checkBox[k]) {

            this.checkBox.splice(k, 1);
            this.timecards.splice(k, 1);
            break;
          }
        }
      }
    }
    this.checkBoxCount = false;


    // let id = this.storedNames.userID;
    // let date = this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day;
    // this.getTimecardList(id, date, this.model.filter);

    // this.checkBoxCount = false;


  }

  OndeleteTimecard() {

    this.token_value = this.storedNames.token;
    this._service.deleteTimecard(this.timecardId, this.token_value).subscribe(
        (data: { message: any; }) => {
          let id = this.currentUserId//this.storedNames.userID;

          // for (var i = 0; i < this.timecards.length; i++)

          //   if (this.timecards[i].id === this.timecardId) {
          //     this.timecards.splice(i, 1);
          //     // break;
          //   }

          // let id = this.storedNames.userID;
          let date = this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day;
          this.getTimecardList(id, date, this.model.filter);

          this.checkBoxCount = false;

          this.myMessage = data.message;
          this.successTrigger = true;
          // this.staticModal.show();
          setTimeout(() => {
            this.successTrigger = false;
          }, 10000);


        },
        (error: any) => {
          let m = moment().format(this.format2);
          let err = this.er.CompileErrorMessage(error, "OndeleteTimecard()", m, "MultiTimecard");
          this.er.updateErrorList(err.errorDetail);
          this.myMessage = err.errorMessage;
          this.errorTrigger = true;

        });


  }

  OndeleteTimecardBulk(checkBox: any[]) {

    this.changeClass = true;

    this.token_value = this.storedNames.token;

    if (this.checkBox.length > 0) {
      this._service.deleteTimecard(checkBox, this.token_value).subscribe(
          (data: { message: any; }) => {

            for (var i = 0; i < this.checkBox.length; i++) {
              if (this.checkBox.length > 0) {
                for (var k = 0; k < this.timecards.length; k++) {
                  if (this.timecards[k].id === this.checkBox[i]) {

                    this.checkBox.splice(i, 1);
                    this.timecards.splice(i, 1);
                    break;

                  }
                }
              }
            }
            let id = this.currentUserId//this.storedNames.userID;
            let date = this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day;
            this.getTimecardList(id, date, this.model.filter);

            this.checkBoxCount = false;


            // this.getTimecardList();

            this.myMessage = data.message;
            this.successTrigger = true;

            this.changeClass = false;

            setTimeout(() => {
              this.successTrigger = false;
            }, 10000);

          },
          (error: any) => {
            this.changeClass = false
            // let err = this.er.CompileErrorMessage(error, "onsubmit", this.cs.dateFormat, "login");

            // this.modal_component.showPopUp(err.errorAlert, err.errorMessage);
            let m = moment().format(this.format2);
            let err = this.er.CompileErrorMessage(error, "OndeleteTimecardBulk", m, "multiTimecard");
            this.er.updateErrorList(err.errorDetail);
            this.myMessage = err.errorMessage;
            this.errorTrigger = true;

          });
    }
  }

  timecardDetail() {

    this.timecardDetailList = [];


    this.timecards.forEach(e => {
      let count = 0
      this.checkBox.forEach(cb => {
        if (cb === e.id) {

          this.timecardDetailList.push(e);
        }
      });
    });
  }
  calculateTotalTime(timecards: any[]) {
    let count = 0;

    timecards.forEach(e => {

      count += e.timecardDuration;

    });

    var finalCount = this.cs.getfinalTime(count);

    return finalCount;



  }
  refreshTimecardList() {
    this.changeClass = true;

    let id = this.currentUserId;//this.storedNames.userID;
    let dateNow = this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day
    this.getTimecardList(id, dateNow, this.model.filter);

  }


  // add manual time
  public myDateRangePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    inline: false,
  };

  onCustomClick(values: any) {

    this.startDateTime2 = $('#timepicker1').val();
    this.endDateTime2 = $('#timepicker2').val();


    var start = this.convertTimeFormat(this.startDateTime2);
    var end = this.convertTimeFormat(this.endDateTime2);
    // let customFormat = "YYYY-MM-DDThh:mm:ss";
    let msDate = moment(values.selectedDate.date.year + "-" + values.selectedDate.date.month + "-" + values.selectedDate.date.day).format('YYYY-MM-DD');
    // let meDate = moment(values.selectedDate.date.year + "-" + values.selectedDate.date.month + "-" + values.selectedDate.date.day).format('yyyy MM DD');

    let sDate = msDate + "T" + start;
    let eDate = msDate + "T" + end;
    this.placeholder = this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day

    let payload = JSON.stringify({ startDateTime: sDate, endDateTime: eDate, title: values.title });

    this.multiUserTimecarService.postManualTimecard(this.currentUserId, payload).subscribe((data: { success: any; message: any; }) => {

      if (data.success) {
        this.myMessage = data.message;
        this.successTriggerModel = true;
        this.myForm.reset();
      }
      else if (!data.success) {
        this.myMessage = data.message;
        this.errorTriggerModel = true;
      }
      this.changeClass = false;
      this.getLatestTimecards();
    }, (error: any) => {
      this.changeClass = false;

      let m = moment().format(this.format2);
      let err = this.er.CompileErrorMessage(error, "postManualTimecard()", m, "multiTimecard");
      this.er.updateErrorList(err.errorDetail);
      this.myMessage = err.errorMessage;
      this.errorTriggerModel = true;

    });
  }

  returnInPercentage(n: number) {
    return n + 10 + "%";
  }


}
