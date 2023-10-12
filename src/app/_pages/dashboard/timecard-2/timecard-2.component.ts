import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Component, ViewChild, SimpleChanges, Input, AfterViewInit } from '@angular/core';
import { DashboardService } from '../../../_services/dashboard.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../../../_services/config.service';
import moment from 'moment';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { ModalDirective } from "ng2-bootstrap/modal";
import { IMyDpOptions } from 'mydatepicker';


export interface IMyDate {
  year: number;
  month: number;
  day: number;
}

export interface Model {
  date: any,
  filter: string
}
@Component({
  selector: 'timecard-2',
  templateUrl: './timecard-2.component.html',
  styleUrls: ['./timecard-2.component.css']
})

export class Timecard2Component implements AfterViewInit {


  timecardDetailList: any[] = [];
  serverIp = environment.serverIp;
  @ViewChild('modal_component') modal_component: any;
  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  @ViewChild('staticModal2') public staticModal2: ModalDirective | any;
  @ViewChild('staticModal3') public staticModal3: ModalDirective | any;

  public userImage = '../../../../assets/img/userImage';


  storedNames: any = JSON.parse(localStorage.getItem("UTO")as string);
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

  public form: FormGroup;
  public disputed: FormControl;
  public disputedReply: FormControl;
  public disputedSettleComment: FormControl;

  // screenShot = this.cs.screenShot;
  // webCam = this.cs.webCam;
  ip = this.cs.ip;
  port = this.cs.port;
  // public myInterval: number = 1500;
  // public slides: any[] = [];
  // public activeSlideIndex: number;
  // public noWrapSlides: boolean = false;
  public timecards: any[] = [];
  // public imagesList = [];

  // public timeStamp: Date[] = [];
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
  // selelctedOs;
  timecard: any[] | any;
  userTimeZone: any;
  // fullPath = "./1.jpg";
  // triggerk = false;
  // dateNow;
  totalMClick = 0;
  totalKClick = 0;
  myMessage: string | any;



  //next previous date
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    showInputField: false,
    showClearDateBtn: false,
    alignSelectorRight: true,
    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 },

  };
  todaydate = new Date()
  // Initialized to specific date (09.10.2018).
  public model = { date: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth() + 1, day: this.todaydate.getDate() }, filter: "all" };
  IsAsminRole: any;
  placeholder: string = '';

  public constructor(private er: ErrorRegisterService, private fb: FormBuilder,

    private _service: DashboardService, private _router: Router,
    private cs: ConfigService, private location: Location
  ) {
    this.placeholder = this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day

    this.form = fb.group({
      'disputed': ['', Validators.compose([Validators.minLength(4)])],
      'disputedReply': ['',],
      'disputedSettleComment': ['']
    });

    this.disputed = this.form.controls["disputed"] as FormControl;
    this.disputedReply = this.form.controls["disputedReply"] as FormControl;
    this.disputedSettleComment = this.form.controls["disputedSettleComment"]as FormControl;

    // this.Onscroll();

  }

  ngOnInit() {
    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO')as string);
      this.storedNames = c;
    }
    let d = new Date();

    this.IsAsminRole = this.storedNames.admin_role;

    // this.model = { date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() } }

    // this.validateLogin();
    let dd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.dateSet = dd;
    let ttt = d.getMonth() + 1 + '' + '_' + d.getDate() + '_' + d.getFullYear();
    // let ssDate = moment(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()).add(1, 'month').format(this.format);
    // let sDate = moment(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()).add(1, 'month');
    let id = this.storedNames.userID;

    // this.dateNow = ttt;
    this.userTimeZone = this.storedNames.timeZone;
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
        let userId = this.storedNames.userID
        this.getTimecardList(userId, date, "all");
        window.scrollTo(0, 0);
        setTimeout(() => { this.successTrigger = false }, 5000);

      },
        (error: any) => {
        window.scrollTo(0, 0);
        let m = moment().format(this.format2);

        let err = this.er.CompileErrorMessage(error, "onDisputeFormSubmit()", m, "Timecard-2");
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

  // public myDatePickerOptions: IMyOptions2 = {
  //   // other options...


  //   dateFormat: 'dd.mm.yyyy',
  //   showTodayBtn: true,
  //   showClearDateBtn: false,
  //   disableSince: { year: 0o0, month: 0, day: 0 },
  //   editableDateField: false,
  //   inline: false,
  //   indicateInvalidDate: true,
  //   showInputField: true,
  //   // todayBtnTxt: 'Today',


  // };
  // bulkDel = false;
  // today = new Date();
  // // this.today.getMonth() + 1 + '.' + this.today.getDate() + '.' + this.today.getFullYear();

  // model: Model = {
  //   mydate: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() }
  //   , filter: "all"
  // };

  calculateTotalTime(timecards: any[]) {
    let count = 0;

    timecards.forEach(e => {

      count += e.timecardDuration;

    });

    var finalCount = this.cs.getfinalTime(count);

    return finalCount;



  }

  actStrength(n: any) {

    return n.totalKeypressCount + n.totalMouseCount;
  }
  // deleteTimecard(id) {

  //   this.myMessage = "Do you want to delete this timecard?";
  //   this.staticModal2.show();
  //   this.timecardId = id;
  // }



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
    // this.model.date = { year: this.model.date.year, month: this.model.date.month, day: this.model.date.day }

    // if (value.date.date == undefined) {
    //   obj = { date: value.date.year + '.' + value.date.month + '.' + value.date.day, filter: value.filter }
    //   this.model = { date: { year: value.date.year, month: value.date.month, day: value.date.day }, filter: value.filter };
    // }
    // else {
    //   obj = { date: value.date.date.year + '.' + value.date.date.month + '.' + value.date.date.day, filter: value.filter }
    //   this.model = { date: { year: value.date.date.year, month: value.date.date.month, day: value.date.date.day }, filter: value.filter };

    // }

    // this.validateLogin();

    let id = this.storedNames.userID;
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

  getTimecardList(id: any, date: string, filter: string) {
    this.changeClass = true;

    this.token_value = this.storedNames.token;
    this._service.getUserInfo(id, 'x-auth-token', this.token_value, date, filter).subscribe(
        (data: { data: any[]; }) => {

        this.changeClass = false;

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
    var obj: {[key: string]: any} = {};

    for (var i = 0, len = things.length; i < len; i++)
      obj[things[i]['id']] = things[i];

    things = new Array();
    for (var key in obj)
      things.push(obj[key]);
    return things;
  }
  setSelectedImageWeb(image: any) {
    this.selectedImageWeb = image;
  }

  navigate(forward: any) {
    const index = this.timecards.indexOf(this.selectedImage) + (forward ? 1 : -1);
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
        let id = this.storedNames.userID;

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
        let err = this.er.CompileErrorMessage(error, "OndeleteTimecard()", m, "timecard-2");
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
          // TODO: ejaz add the logic to hide those timecards

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
          let id = this.storedNames.userID;
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

          let err = this.er.CompileErrorMessage(error, "onsubmit", this.cs.dateFormat, "timecard2");

          this.modal_component.showPopUp(err.errorAlert, err.errorMessage);
          let m = moment().format(this.format2);
          // let err = this.er.CompileErrorMessage(error, "OndeleteTimecardBulk", m, "timecard-2");
          // this.er.updateErrorList(err.errorDetail);
          // this.myMessage = err.errorMessage;
          // this.errorTrigger = true;

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

  refreshTimecardList() {
    this.model
    let d: any = this.model.date

    this.changeClass = true;

    let id = this.storedNames.userID;
    let dateNow
    // if(this.model.date.date !=undefined){

    // }


    dateNow = this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day;
    if (dateNow == 'undefined-undefined-undefined') {
      dateNow = d.formatted//d.date.year + "-" + d.date.month + "-" + d.date.day;
    }
    this.getTimecardList(id, dateNow, this.model.filter);

  }

  ngAfterViewInit() {
    this.location.replaceState('/timecards')
  }

  returnInPercentage(n: number) {
    return n+10 + "%";
  }
}
