import { Component, Input, SimpleChanges } from '@angular/core';
import { MultiUserDashboardService } from './multi-user-dashboard.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../_services/config.service';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import moment from 'moment';
import 'rxjs/add/operator/map';

import { DashboardContentService } from '../../../_services/dashboard-content.service';

@Component({
  selector: 'app-multi-user-dashboard',
  templateUrl: './multi-user-dashboard.component.html',
  styleUrls: ['./multi-user-dashboard.component.css']
})
export class MultiUserDashboardComponent {


  @Input('userIdForDashboard') inputUserId: any;
  userTimeZone: any;
  changeClass = false;
  storedNames: any = JSON.parse(localStorage.getItem("UTO") as string);
  labelDashboard = ['app1', 'app2', 'app3', 'app4', 'app5'];
  valueDashboard = [0, 0, 0, 0, 0];
  day = Date.now();
  format = 'x';
  format2 = "YYYY-MM-DD HH:mm:ss";
  wDuration: number[] = [];
  wDate: string[] = [];
  successTrigger: boolean = false;
  errorTrigger: boolean = false;

  userId: any = 0;

  totalWorkingMints: any = 0;
  totalWorkedMints: any = 0;
  totalIdleTimecard: any = 0;
  remainingWorkhours: any = 0;
  activeWorkhours: any = 0;
  disputedTime: any = 0;
  totalManualTime: any = 0;

  n2: any = 0;
  n1: any = 0;
  n4: any = 0;
  n3: any = 0;

  public ActiveHourChartData: any[] = [0, 0, 0];
  myMessage = '';
  duration: string = "Today";
  showLoading: boolean = false;
  // token_value: ;
  // token_name = 'x-auth-token';
  // @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private service: MultiUserDashboardService,

    private router: Router, private cs: ConfigService,

    private dashContentService: DashboardContentService,

    private er: ErrorRegisterService) {
    this.showLoading = true;

    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO') as string);
      this.storedNames = c;
    }

    this.userId = sessionStorage.getItem('userId');
    console.log("user id from constructor", this.userId);
    this.getAppStats(this.userId, "today");
    // this.userTimeZone = this.storedNames.timeZone;
    this.getWorkHoursStats(this.userId, "today");
    this.getTotalWorrkingHoursStats(this.userId, "today");
    this.duration = "Today";

  }


  ngOnChanges(changes: SimpleChanges) {
    // this.userId = changes.inputUserId.currentValue;
    this.userId = sessionStorage.getItem('uerId')
    console.log('onchanges', this.userId);
    // this.getAppStats(this.userId, "today");
    // // this.userTimeZone = this.storedNames.timeZone;
    // this.getWorkHoursStats(this.userId, "today");
    // this.getTotalWorrkingHoursStats(this.userId, "today");
    // this.duration = "Today";
  }

  refreshData() {


    var str = this.duration;
    if (str !== 'Today') {

      str = str.slice(5);

    }

    this.getAppStats(this.userId, str);
    // this.userTimeZone = this.storedNames.timeZone;
    this.getWorkHoursStats(this.userId, str);
    this.getTotalWorrkingHoursStats(this.userId, str);
    // this.duration = "Today";

  }



  //calling service currunt date
  getAppStats(id: any, sDate: string) {
    this.changeClass = true;


    // let token_value = this.storedNames.token;
    // token_value = window.localStorage.getItem(this.token_name);
    this.service.getApplicationStats(id, sDate).subscribe(
        (data: { data: any; }) => {
        this.errorTrigger = false;
        this.labelDashboard = [];
        this.valueDashboard = [];
        for (let dat of data.data) {
          this.labelDashboard.push(dat.processName);
          // this.valueDashboard.push(dat.duration);

          if (dat.duration > 60) {
            let n = (Math.round(dat.duration / 3) * 3) % 60
            this.valueDashboard.push(dat.duration);
          }
          else {
            this.valueDashboard.push(Math.round((dat.duration) * 100) / 100);
          }
        }

        setTimeout(() => {
          this.successTrigger = false;
        }, 10000);

        this.changeClass = false

      },
        (error: any) => {
        let m = moment().format(this.format2);
        let err = this.er.CompileErrorMessage(error, "getAppstats()", m, "multidashboar");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;

      });
  }
  getAppStatsCustom(id: any, sDate: any) {
    this.changeClass = true;


    let token_value = this.storedNames.token;
    // token_value = window.localStorage.getItem(this.token_name);
    this.dashContentService.getApplicationStatsCustom(id, sDate).subscribe(
        (data: { data: any; }) => {


        this.labelDashboard = [];
        this.valueDashboard = [];
        for (let dat of data.data) {
          this.labelDashboard.push(dat.processName);
          // this.valueDashboard.push(dat.duration);

          if (dat.duration > 60) {
            let n = (Math.round(dat.duration / 3) * 3) % 60
            this.valueDashboard.push(dat.duration);
          }
          else {
            this.valueDashboard.push(Math.round((dat.duration) * 100) / 100);
          }
        }

        setTimeout(() => {
          this.successTrigger = false;
        }, 10000);
        this.changeClass = false

      },
        (error: any) => {
        let m = moment().format(this.format2);
        let err = this.er.CompileErrorMessage(error, "getAppstats()", m, "multiUserDashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;

      });
  }

  //calling work hours sevice current date
  getWorkHoursStats(id: any, sDate: string) {
    this.changeClass = true

    // let token_value = this.storedNames.token;
    // this.token_value = window.localStorage.getItem('x-auth-token');
    this.service.getWorkingHours(id, sDate).subscribe(
        (data: { data: any; }) => {
        this.wDate = [];
        this.wDuration = [];
        for (let w of data.data) {
          //converting unix timstamp into date
          this.wDate.push(moment.utc(w.date).format("YYYY-MM-DD"));

          if (w.duration >= 60) {
            let n = (Math.round(w.duration));
            this.wDuration.push(w.duration);
          }
          else {
            this.wDuration.push(Math.round((w.duration) * 100) / 100);
          }

        }

        this.changeClass = false

      },
        (error: any) => {

        let m = moment().format(this.format2);
        let err = this.er.CompileErrorMessage(error, "getWorkingStats()", m, "multiUserDashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;;
        this.errorTrigger = true;


      }
    );

  }
  getWorkHoursStatsCustom(id: any, sDate: any) {

    // this.showLoading = true;
    let token_value = this.storedNames.token;
    // this.token_value = window.localStorage.getItem('x-auth-token');
    this.dashContentService.getWorkingHoursCustom(id, sDate).subscribe(
        (data: { data: any; }) => {

        this.wDate = [];
        this.wDuration = [];
        for (let w of data.data) {
          //converting unix timstamp into date
          this.wDate.push(moment.utc(w.date).format("YYYY-MM-DD"));

          if (w.duration >= 60) {
            let n = (Math.round(w.duration));
            this.wDuration.push(w.duration);
          }
          else {
            this.wDuration.push(Math.round((w.duration) * 100) / 100);
          }

        }
        // this.showLoading = false;
      },
        (error: any) => {

        let m = moment().format(this.format2);
        let err = this.er.CompileErrorMessage(error, "getWorkingStats()", m, "multiUserDashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;;
        this.errorTrigger = true;

      }
    );

  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }

  getfinalTime(time: any) {
    let i = '+';
    if (time < 0) {
      i = '-'
      time = Math.abs(time);
    }
    let h: any = Math.floor(time / 60);
    let m: any = time % 60;
    if (h >= 100)
      var formattedHours = ("0" + h).slice(-3);
    else
      formattedHours = ("0" + h).slice(-2);


    var formattedMiints = ("0" + m).slice(-2);
    if (i == '-') {
      return i + ' ' + formattedHours + ':' + formattedMiints;
    } else
      return formattedHours + ':' + formattedMiints;

  }


  //calling service currunt date for getting total mintes
  getTotalWorrkingHoursStats(id: any, sDate: string) {
    this.changeClass = true

    // let token_value = this.storedNames.token;
    // token_value = window.localStorage.getItem(this.token_name);
    this.service.getTotalWorkMinutes(id, sDate).subscribe(
        (data: { data: { totalManual: any; totalMinutes: any; totalWorked: any; totalIdle: any; totalDisputed: any; activeWorkingHours: any; remainingWorkingHours: any; }; }) => {


        this.totalManualTime = data.data.totalManual;
        this.totalWorkingMints = data.data.totalMinutes;
        this.totalWorkedMints = data.data.totalWorked;
        this.totalIdleTimecard = data.data.totalIdle;
        this.disputedTime = data.data.totalDisputed;
        this.activeWorkhours = data.data.activeWorkingHours//this.totalWorkedMints - this.totalIdleTimecard;
        this.remainingWorkhours = data.data.remainingWorkingHours//this.totalWorkingMints - this.activeWorkhours;
        this.n1 = this.activeWorkhours;

        this.n2 = this.remainingWorkhours;
        this.n3 = this.totalWorkingMints;
        this.n4 = this.totalIdleTimecard;

        // converting into hours and mints
        this.totalManualTime = this.getfinalTime(this.totalManualTime);
        this.totalWorkingMints = this.getfinalTime(this.totalWorkingMints);
        this.totalWorkedMints = this.getfinalTime(this.totalWorkedMints);
        this.totalIdleTimecard = this.getfinalTime(this.totalIdleTimecard);
        this.disputedTime = this.getfinalTime(this.disputedTime);
        this.activeWorkhours = this.getfinalTime(this.activeWorkhours);//this.totalWorkedMints - this.totalIdleTimecard;
        this.remainingWorkhours = this.getfinalTime(this.remainingWorkhours);

        this.ActiveHourChartData = [this.n1, this.n3, this.n4];
        this.showLoading = false;
      },
        (error: any) => {


        let m = moment().format(this.format2);
        this.showLoading = false;

        let err = this.er.CompileErrorMessage(error, "getTotalWorrkingHoursStats()", m, "multiUserDashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;


      });


  }
  getTotalWorrkingHoursStatsCustom(id: any, sDate: any) {

    // this.showLoading = true;
    let token_value = this.storedNames.token;
    // token_value = window.localStorage.getItem(this.token_name);
    this.dashContentService.getTotalWorkMintesCustom(id, sDate).subscribe(
        (data: { data: { totalMinutes: any; totalWorked: any; totalIdle: any; totalDisputed: any; activeWorkingHours: any; remainingWorkingHours: any; }; }) => {



        this.totalWorkingMints = data.data.totalMinutes;
        this.totalWorkedMints = data.data.totalWorked;
        this.totalIdleTimecard = data.data.totalIdle;
        this.disputedTime = data.data.totalDisputed;
        this.activeWorkhours = data.data.activeWorkingHours//this.totalWorkedMints - this.totalIdleTimecard;
        this.remainingWorkhours = data.data.remainingWorkingHours//this.totalWorkingMints - this.activeWorkhours;
        this.n1 = this.activeWorkhours;

        this.n2 = this.remainingWorkhours;
        this.n3 = this.totalWorkingMints;
        this.n4 = this.totalIdleTimecard;

        // converting into hours and mints

        this.totalWorkingMints = this.getfinalTime(this.totalWorkingMints);
        this.totalWorkedMints = this.getfinalTime(this.totalWorkedMints);
        this.totalIdleTimecard = this.getfinalTime(this.totalIdleTimecard);
        this.disputedTime = this.getfinalTime(this.disputedTime);
        this.activeWorkhours = this.getfinalTime(this.activeWorkhours);//this.totalWorkedMints - this.totalIdleTimecard;
        this.remainingWorkhours = this.getfinalTime(this.remainingWorkhours);

        this.ActiveHourChartData = [this.n1, this.n3, this.n4];
        this.showLoading = false;
      },
        (error: any) => {


        let m = moment().format(this.format2);
        this.showLoading = false;

        let err = this.er.CompileErrorMessage(error, "getTotalWorrkingHoursStats()", m, "multiUserDashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;


      });


  }

  onTodayClicked(today: any): void {
    this.showLoading = true;
    let id;

    if (this.userId) {
      id = this.userId;
    } else {
      id = this.storedNames.userID
    }
    let todayDate = moment(this.day).format(this.format);
    this.getAppStats(id, "today");
    this.getWorkHoursStats(id, "today");
    this.getTotalWorrkingHoursStats(id, "today");
    this.duration = "Today"
  }
  onWeekClicked(week: any): void {
    this.showLoading = true;
    let id;

    if (this.userId) {
      id = this.userId;


    } else {
      id = this.storedNames.userID
    }
    this.getAppStats(id, "week");
    this.getWorkHoursStats(id, "week");
    this.getTotalWorrkingHoursStats(id, "week");
    this.duration = "This Week"

  }
  onMonthClicked(month: any): void {
    this.showLoading = true;
    let id;

    if (this.userId) {
      id = this.userId;


    } else {
      id = this.storedNames.userID
    }
    this.getAppStats(id, "month");
    this.getWorkHoursStats(id, "month");
    this.getTotalWorrkingHoursStats(id, "month");
    this.duration = "This Month"

  }
  onCustomClicked(custom: any): void {
    this.showLoading = true;

    let id;
    this.duration = "from " + moment.utc(custom.startDate).format("YYYY-MM-DD") + "-to-" + moment.utc(custom.endDate).format("YYYY-MM-DD");

    if (this.userId) {
      id = this.userId;


    } else {
      id = this.storedNames.userID
    }
    this.getAppStatsCustom(id, custom);
    this.getWorkHoursStatsCustom(id, custom);
    this.getTotalWorrkingHoursStatsCustom(id, custom);

  }

}
