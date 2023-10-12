import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { ModalDirective } from "ng2-bootstrap";
import { DashboardService } from '../../../_services/dashboard.service';
import { IMyOptions } from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../../../_services/config.service';
export interface IMyDate {
  year: number;
  month: number;
  day: number;
}
export interface Model{
  mydate:any,
  filter:string
}
@Component({
  selector: 'timecard-3',
  templateUrl: './timecard-3.component.html',
  styleUrls: ['./timecard-3.component.css']
})

export class Timecard3Component implements OnInit {
  ActivityStrength: number | any;
  imageIndex: any;
changeClass=true;
today = new Date();
  src: any;
  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  @ViewChild('staticModal2') public staticModal2: ModalDirective | any;
  storedNames = JSON.parse(localStorage.getItem("UTO")as string);

  myMessage: string | any;
  public constructor(private er: ErrorRegisterService, private _service: DashboardService, private _router: Router, private cs: ConfigService) {
    let date = new Date();

    this.myDatePickerOptions.disableSince!.year = date.getFullYear();
    this.myDatePickerOptions.disableSince!.month = date.getMonth() + 1;
    this.myDatePickerOptions.disableSince!.day = date.getDate() + 1;
  }
screenShot = this.cs.screenShot;
  webCam = this.cs.webCam;
  ip = this.cs.ip;
  port = this.cs.port;
  public myInterval: number = 1500;
  public slides: any[] = [];
  // public activeSlideIndex: number;
  public noWrapSlides: boolean = false;
  public timecards: any[] = [];
  public imagesList = [];
  public pcName = [];
  public osName = [];
  public timeStamp: Date[] | any = [];
  public timecardId: any = -1;

   model: any = {
     date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() }

    }
  token_name = 'x-auth-token';
  token_value: string | any;
  format = 'x';
  noTimeCard = false;
  selectedImage: any;
  // selelctedOs;
  timecard: any[] | any;
  userTimeZone: any;
  fullPath = "./1.jpg";
  triggerk = false;
  dateNow: string | any;
  timecard1:any[] = [];
  timecard2:any[] = [];
  timecard3:any[] = [];
  timecard4:any[] = [];
  timecard5:any[] = [];
  timecard6:any[] = [];
  timecard7:any[] = [];
  timecard8:any[] = [];
  timecard9:any[] = [];
  timecard10:any[]= [];
  timecard11:any[]= [];
  timecard12:any[] = [];
  timecard13:any[] = [];
  timecard14:any[] = [];
  timecard15:any[] = [];
  timecard16:any[] = [];
  timecard17:any[] = [];
  timecard18:any[] = [];
  timecard19:any[] = [];
  timecard20:any[] = [];
  timecard21:any[] = [];
  timecard22:any[] = [];
  timecard23:any[] = [];
  timecard24:any[] = [];
  kCountTotal: number = 0;
  mCountTotal: number = 0;
  public timedurration(tm: number, min: number, max: number) {
    if (tm >= min && tm <= max)
      return true;
    else
      return false;

  }
  t: string | any;
  public myDatePickerOptions: IMyOptions = {
    // other options...


    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: true,
    showClearDateBtn: false,
    disableSince: { year: 0o0, month: 0, day: 0 },
    editableDateField: false,
    inline: false,
    indicateInvalidDate: true,
    showInputField: true,
    // todayBtnTxt: 'Today',


  };
   calculateMouseClicks(n: any) {

    let mCount = 0, wCount = 0;

    for (let e of n.activityEvents) {
      if (e.eventType === 'ACTIVITY_EVENT') {
        mCount += e.mouseClicksCount;
      }
    }
    for (let e of n.activityEvents) {
      if (e.eventType === 'ACTIVITY_EVENT') {
        wCount += e.mouseWheelCount;
      }
    }
    this.mCountTotal=mCount + wCount;
    return mCount + wCount;

  }
  activityStrnghtCount(n:any) {

    let mCount = 0, wCount = 0;let kpCount = 0;


    for (let e of n.activityEvents) {
      if (e.eventType === 'ACTIVITY_EVENT') {
        mCount += e.mouseClicksCount;
      }
    }
    for (let e of n.activityEvents) {
      if (e.eventType === 'ACTIVITY_EVENT') {
        wCount += e.mouseWheelCount;
      }
    }


    for (let e of n.activityEvents) {
      if (e.eventType === 'ACTIVITY_EVENT') {
        kpCount += e.keyPressCount;
      }
    }
    this.kCountTotal = kpCount;
    this.mCountTotal = mCount + wCount;

    return this.ActivityStrength = this.kCountTotal +(this.mCountTotal/20);

  }


  calculateKeyPress(n: any) {
    let kpCount = 0;
    for (let e of n.activityEvents) {
      if (e.eventType === 'ACTIVITY_EVENT') {
        kpCount += e.keyPressCount;
      }
    }
    this.kCountTotal=kpCount;
    return kpCount;
  }

  // today = new Date();
  // this.today.getMonth() + 1 + '.' + this.today.getDate() + '.' + this.today.getFullYear();

  // public model: Object = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() } };
  deleteTimecard(id: number) {

    this.myMessage = "Do you want to delete this timecard?";
    this.staticModal2.show();
    this.timecardId = id;
  }

  ngOnInit() {
    let d = new Date();

    this.validateLogin();

let dd= d.getFullYear()  + '-' + (d.getMonth() + 1 )+ '-' +  d.getDate();
    this.t = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
    let ttt = d.getMonth() + 1 + '' + '_' + d.getDate() + '_' + d.getFullYear();
    let sDate = moment(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()).add(1, 'month').format(this.format);
    let id = this.storedNames.userID;
    this.dateNow = ttt;
    this.userTimeZone = this.storedNames.timeZone;
    this.getTimecardList(id, dd,"all");

  }

  validateLogin() {
    this.token_value = this.storedNames.token;

    if (!this.token_value) {
      this._router.navigate(['login']);
    }
  }
  onSubmit(value:any) {

    let tt = value.date.year + '-' + value.date.month + '-' +value.date.day ;

    this.validateLogin();

    let id = this.storedNames.userID;
     this.getTimecardList(id, tt,"all");
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
    this.token_value = this.storedNames.token;
    this._service.getUserInfo(id, 'x-auth-token', this.token_value, date,filter).subscribe(
        (data: { data: never[]; }) => {
        this.changeClass=false;

        this.noTimeCard = false;
        this.timecards = data.data;
        if (this.timecards.length == 0) {
          this.noTimeCard = true;
        }
        let s = 'k';
        //TODO remove duplicate timecards logic
        let res = this.removeDObject(data.data);

        this.timecards = res as any[];
        for (let t of this.timecards) {

          let r = moment(t.timestamp).format(s);

          if (r === '1') {
            this.timecard1.push(t);
          }
          else if (r === '2') {
            this.timecard2.push(t);
          }
          else if (r === '3') {
            this.timecard3.push(t);
          }
          else if (r === '4') {
            this.timecard4.push(t);
          }
          else if (r === '5') {
            this.timecard5.push(t);
          }
          else if (r === '6') {
            this.timecard6.push(t);
          }
          else if (r === '7') {
            this.timecard7.push(t);
          }
          else if (r === '8') {
            this.timecard8.push(t);
          }
          else if (r === '9') {
            this.timecard9.push(t);
          }
          else if (r === '10') {
            this.timecard10.push(t);
          }
          else if (r === '11') {
            this.timecard11.push(t);
          }
          else if (r === '12') {
            this.timecard12.push(t);
          }
          else if (r === '13') {
            this.timecard13.push(t);
          }
          else if (r === '14') {
            this.timecard14.push(t);
          }
          else if (r === '15') {
            this.timecard15.push(t);
          }
          else if (r === '16') {
            this.timecard16.push(t);
          }
          else if (r === '17') {
            this.timecard17.push(t);
          }
          else if (r === '18') {
            this.timecard18.push(t);
          }
          else if (r === '19') {
            this.timecard19.push(t);
          }
          else if (r === '20') {
            this.timecard20.push(t);
          }
          else if (r === '21') {
            this.timecard21.push(t);
          }
          else if (r === '22') {
            this.timecard22.push(t);
          }
          else if (r === '23') {
            this.timecard23.push(t);
          }
          else if (r === '24') {
            this.timecard24.push(t);
          }

        }

      },
        (error: { status: number; statusText: any; }) => {

        if (error.status === 0) {
          let m = moment().format('S SS SSS');
          this.myMessage = 'Unable to connect to Server...!!';
          this.er.updateErrorList('Time Card: ' + this.myMessage + m);
          this.staticModal.show();
        }
        else if (error.status == 500) {
          let m = moment().format('S SS SSS');
          this.myMessage = error.statusText;
          this.er.updateErrorList('Time Card: ' + this.myMessage + m);
          this.staticModal.show();
        }
        else {
          let m = moment().format('S SS SSS');
          this.er.updateErrorList('time card url :null' + m);
          this.staticModal.show();
        }

      });
  }
  tm: string | any;
  setSelectedImage(image: any, i: any) {
    this.selectedImage = image;
    this.imageIndex=i;
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



  navigate(forward: any) {
    var index = this.timecards.indexOf(this.selectedImage) + (forward ? 1 : -1);
    if (index >= 0 && index < this.timecards.length) {
      this.selectedImage = this.timecards[index];
    }
  }
  OndeleteTimecard() {

    this.token_value = this.storedNames.token;
    this._service.deleteTimecard(this.timecardId, this.token_value).subscribe(
        (data: { message: any; }) => {
        let id = this.storedNames.userID;

        for (var i = 0; i < this.timecards.length; i++)

          if (this.timecards[i].id === this.timecardId) {
            this.timecards.splice(i, 1);
            break;
          }

        this.myMessage = data.message;
        this.triggerk = true;
        // this.staticModal.show();
        setTimeout(() => {
          this.triggerk = false;
        }, 10000);


      },
        (error: { status: number; statusText: any; }) => {

        if (error.status === 0) {
          let m = moment().format('S SS SSS');
          this.myMessage = 'Unable to connect to Server...!!';
          this.er.updateErrorList('Time Card: Delete ' + this.myMessage + m);
          this.staticModal.show();
        }
        else if (error.status == 500) {
          let m = moment().format('S SS SSS');
          this.myMessage = error.statusText;
          this.er.updateErrorList('Time Card:Delete ' + this.myMessage + m);
          this.staticModal.show();
        }
        else {
          let m = moment().format('S SS SSS');
          this.er.updateErrorList('time card url : Delete null' + m);
          this.staticModal.show();
        }

      });

  }
}
