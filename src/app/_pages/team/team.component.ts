
import { ErrorRegisterService } from '../../_services/error-register.service';

import { Router } from '@angular/router';
import { TeamService } from '../../_services/admin/team.service';

import { TimeSheetRecord } from '../../_models/timeSheetRecord.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OrganizationService } from '../../_services/organization.service';
import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IMyOptions } from 'mydaterangepicker';
import moment from 'moment';
import { AdminService } from '../../_services/admin/admin.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['team.component.css']
})
export class TeamComponent implements OnInit, AfterViewInit {

  @Output() currentTeamId = new EventEmitter()

  item: any = '' ;
  page: number = 1;
  spinerTrigger = false;
  editDescription: any;
  deleteTeamId = 0;
  timeSRecord: TimeSheetRecord[] | any;
  private myForm: FormGroup | any;
  teams: any[] = [];
  showTeam = false;
  format = 'x';
  format2 = "YYYY-MM-DD HH:mm:ss";
  showCustom = false;
  date = new Date();
  teamId = 0;
  editTeamId = 0;
  editTeamName = '';
  teamName = '';
  myMessage = '';
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  totalWorkingMints: any;
  totalWorkedMints: any;
  totalIdleTimecard: any;
  remainingWorkhours: any;
  activeWorkhours: any;
  disputedTime: any;
  editTeamForm: FormGroup
  str: string | any;
  currentSelectedTeam = 0

  statusList = [{ key: true, value: 'Active' }, { key: false, value: 'Disable' }]

  @Output() url = new EventEmitter();
  currentTeam: string = '';
  totalManualTime: any;
  status: any = false;
  userDashboard: boolean = false;
  userIdForDashboard: any = 0;
  selectedUser: any = '';
  selectedTeam: any;

  constructor(private location: Location, private org: OrganizationService, private fb: FormBuilder, private er: ErrorRegisterService,
    private as: AdminService, private ts: TeamService) {

    sessionStorage.setItem('currentTeamSelected', '');
    sessionStorage.setItem('currentUSerSelected', '');

    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO') as string);
      this.storedNames = c;
       }
    this.getTeam();

    this.date = new Date();

    this.myDateRangePickerOptions.disableSince!.year = this.date.getFullYear();
    this.myDateRangePickerOptions.disableSince!.month = this.date.getMonth() + 1;
    this.myDateRangePickerOptions.disableSince!.day = this.date.getDate() + 1;


    this.editTeamForm = this.fb.group({
      teamName: [this.editTeamName, Validators.compose([Validators.required])],
      teamDescription: [this.editDescription, Validators.compose([Validators.required])],
      status: [this.status]

    });

  }

  setSelectedUserName(name: any) {
    this.selectedUser = name;
  }
  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }
  // emitUserId(id) {
  //   this.userIdForDashboard = id;
  // }

  // setDeleteTeamId(id) {
  //   this.deleteTeamId = id;
  // }
  getUrlValue() {

    this.url.emit(this.str);
  }
  // deleteItNow() {

  //   if (this.deleteTeamId)
  //     this.ts.deleteTeam(this.deleteTeamId).subscribe(
  //       data => {

  //         this.myMessage = data.message;
  //         this.successTrigger = true;
  //         this.redirectToThisPage();

  //         setTimeout(() => {
  //           this.successTrigger = false;
  //         }, 5000);
  //       }, error => {
  //         let m = moment().format(this.format2);

  //         let err = this.er.CompileErrorMessage(error, "DeleteNow()", m, "TeamComponent");
  //         this.er.updateErrorList(err.errorDetail);
  //         this.myMessage = err.errorMessage;
  //         this.errorTrigger = true;
  //       })
  // }

  toggleShowTeam() {
    this.userDashboard = false;
    this.showTeam = false;//!this.showTeam;
    this.currentTeam = '';
    this.selectedUser = '';
    this.location.replaceState('dashboard/team');

  }
  showUserDashboard() {
    this.userDashboard = !this.userDashboard;
  }

  setUserDashboardOff() {
    this.userDashboard = false;
    this.selectedUser = '';
  }

  // setEditTeamId(id) {

  //   this.editTeamId = id;

  //   this.ts.getTeam(id).subscribe(data => {

  //     this.editTeamName = data.data.name;

  //     this.editDescription = data.data.description;
  //     this.status = data.data.active;

  //     this.editTeamForm = this.fb.group({
  //       teamName: [this.editTeamName, Validators.compose([Validators.required])],
  //       teamDescription: [this.editDescription, Validators.compose([Validators.required])],
  //       status: [this.status]

  //     });
  //   },
  //     error => {
  //       let m = moment().format(this.format2);
  //       let err = this.er.CompileErrorMessage(error, "DeleteNow()", m, "team");
  //       this.er.updateErrorList(err.errorDetail);
  //       this.myMessage = err.errorMessage;
  //       this.errorTrigger = true;
  //     });

  // }
  // showCustomCalender() {
  //   this.showCustom = !this.showCustom;
  // }

  storedNames: any;//= JSON.parse(localStorage.getItem("UTO"));



  redirectToThisPage() {

    this.getTeam();
  }

  onSubmitEditForm(m: { teamDescription: any; status: any; teamName: any; }) {
    let id: any = this.editTeamId;
    let modal = {
      description: m.teamDescription,
      active: m.status,
      name: m.teamName
    }


    this.ts.updateTeam(id, modal).subscribe((data: { message: string; }) => {

      this.myMessage = data.message;
      this.successTrigger = true;
      this.redirectToThisPage();


      setTimeout(() => {
        this.successTrigger = false;
      }, 3000);
    }, (error: { status: number; message: string; statusText: string; }) => {
      let m = moment().format(this.format2);
      if (error.status === 0) {
        this.myMessage = 'Unable to connect to Server...!!';
        this.errorTrigger = true;

      }
      else if (error.status === 500) {

        this.myMessage = 'internal server erorr';
        this.errorTrigger = true;

      }
      else if (error.status === 400) {

        this.myMessage = error.message;
        this.errorTrigger = true;

      }
      else if (error.status === 401) {

        this.myMessage = error.statusText;
        this.errorTrigger = true;

      }
    });

  }
  public myDateRangePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    inline: false,
    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }

  };

  // setDateRange(): void {
  //   // Set date range (today) using the setValue function
  //   let date = new Date();
  //   this.myForm.setValue({
  //     myDateRange: {
  //       beginDate: {
  //         year: date.getFullYear(),
  //         month: date.getMonth() + 1,
  //         day: date.getDate()
  //       },
  //       endDate: {
  //         year: date.getFullYear(),
  //         month: date.getMonth() + 1,
  //         day: date.getDate()
  //       }
  //     }
  //   });
  // }

  // clearDateRange(): void {
  //   // Clear the date range using the setValue function
  //   this.myForm.setValue({ myDateRange: '' });
  // }

  // onCustomClick(values): void {
  //   this.spinerTrigger = true;
  //   if (this.myForm.valid && (this.myForm.value.myDateRange.beginDate !== null || this.myForm.value.myDateRange.endDate.valid)) {
  //     let bMonth = this.myForm.value.myDateRange.beginDate.month;
  //     let bDay = this.myForm.value.myDateRange.beginDate.day;
  //     let bYear = this.myForm.value.myDateRange.beginDate.year;

  //     let eMonth = this.myForm.value.myDateRange.endDate.month;
  //     let eDay = this.myForm.value.myDateRange.endDate.day;
  //     let eYear = this.myForm.value.myDateRange.endDate.year;

  //     let startDate = moment.utc(bYear + '-' + bMonth + '-' + bDay).format("YYYY-MM-DD");;
  //     let endDate = moment.utc(eYear + '-' + eMonth + '-' + eDay).format("YYYY-MM-DD");;

  //     this.org.getTeamTimeSheet(this.teamId, startDate, endDate).subscribe(data => {
  //       let t = this.timeSheetModified(data.data);

  //       this.timeSRecord = t;

  //       this.showTeam = true;
  //       this.spinerTrigger = false;

  //       // this.teams.forEach(team => {
  //       //   team.members.forEach(tMember => {

  //       //     this.timeSRecord.forEach(tSR => {

  //       //       if (tSR.userId == tMember.userId) {
  //       //         tSR.member = tMember;

  //       //       }

  //       //     });

  //       //   });


  //       // });

  //     }, error => { });

  //   }

  // }

  ngOnInit() {
    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO') as string);
      this.storedNames = c;
       }
    // this.myForm = this.fb.group({
    //   myDateRange: ['', Validators.required]
    // });
  }
  getTeam() {
    this.spinerTrigger = true;
    let id = this.storedNames.organizationId;
    this.as.getTeamsByOrgAllUsers().subscribe((data: { data: any[]; }) => {
      this.teams = data.data;
      this.spinerTrigger = false;


      this.showTeam = false;
    },
        (error: any) => {
        let m = moment().format(this.format2);
        let err = this.er.CompileErrorMessage(error, "getTeams()", m, "team");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
        this.spinerTrigger = false;
      });

  }
  // getAllTeamTimeSheet(id) {

  //   this.teamId = id;
  //   let date = new Date();
  //   let startDate: any = moment.utc(date).format("YYYY-MM-DD");;
  //   let endDate: any = moment.utc(date).format("YYYY-MM-DD");;
  //   this.org.getSpecificTimesheet(id, "today").subscribe(data => {

  //     // this.timeSRecord=data.data;
  //     let t = this.timeSheetModified(data.data);

  //     this.teams.forEach(e => {

  //       if (e.id == id) {
  //         this.teamName = e.name;

  //       }

  //     });

  //     this.timeSRecord = t;
  //     // this.showTeam = true;
  //     // let count = 0;


  //     // this.teams.forEach(team => {

  //     //   this.teamName = team;
  //     //   team.members.forEach(tMember => {
  //     //     this.timeSRecord.forEach(tSR => {
  //     //       if (tSR.userId == tMember.userId) {
  //     //         tSR.member = tMember;
  //     //       }
  //     //     });
  //     //   });
  //     // });
  //   }, error => { });

  //   this.showTeam = true;
  // }

  // getSpecificTeamsheet(n: any) {

  //   this.spinerTrigger = true;
  //   this.showCustom = false;
  //   this.org.getSpecificTimesheet(this.teamId, n).subscribe(data => {

  //     let t = this.timeSheetModified(data.data);

  //     this.timeSRecord = t;
  //     this.showTeam = true;
  //     this.spinerTrigger = false;
  //     // let count = 0;

  //     // this.teams.forEach(team => {


  //     //   team.members.forEach(tMember => {

  //     //     this.timeSRecord.forEach(tSR => {

  //     //       if (tSR.userId == tMember.userId) {
  //     //         tSR.member = tMember;

  //     //       }

  //     //     });

  //     //   });

  //     //   // count = count + 1;

  //     // });

  //   },
  //     error => { });

  // }

  // getfinalTime(time: any) {
  //   let i = '+';
  //   if (time < 0) {
  //     i = '-'
  //     time = Math.abs(time);
  //   }
  //   let h: any = Math.floor(time / 60);
  //   let m: any = time % 60;
  //   if (h >= 100)
  //     var formattedHours = ("0" + h).slice(-3);
  //   else
  //     formattedHours = ("0" + h).slice(-2);


  //   var formattedMiints = ("0" + m).slice(-2);
  //   if (i == '-') {
  //     return i + ' ' + formattedHours + ':' + formattedMiints;
  //   } else
  //     return formattedHours + ':' + formattedMiints;

  // }
  // timeSheetModified(timesheets) {

  //   let finalTimeSArray: any[] = [];


  //   timesheets.forEach(n => {

  //     this.totalManualTime = this.getfinalTime(n.totalManual);
  //     this.totalWorkingMints = this.getfinalTime(n.totalMinutes)//n.totalMinutes;
  //     this.totalWorkedMints = this.getfinalTime(n.totalWorked)//n.totalWorked;
  //     this.totalIdleTimecard = this.getfinalTime(n.totalIdle)// n.totalIdle;
  //     this.disputedTime = this.getfinalTime(n.totalDisputed)//n.totalDisputed;
  //     this.activeWorkhours = this.getfinalTime(n.activeWorkingHours);//n.totalWorked - n.totalIdle)//this.totalWorkedMints - this.totalIdleTimecard;
  //     // let activeMints = n.totalWorked - n.totalIdle;
  //     this.remainingWorkhours = this.getfinalTime(n.remainingWorkingHours);//n.totalMinutes - activeMints)// this.totalWorkingMints - this.activeWorkhours;
  //     let obj = {
  //       user: n.user,
  //       totalMinutes: this.totalWorkingMints,
  //       totalWorked: this.totalWorkedMints,
  //       totalIdle: this.totalIdleTimecard,
  //       totalDisputed: this.disputedTime,
  //       totalRemainingTime: this.remainingWorkhours,
  //       totalManualTime: this.totalManualTime
  //     }
  //     finalTimeSArray.push(obj);
  //   });
  //   return finalTimeSArray;
  // }


  setUrl(id: any, name: any) {
    this.str = `${name}/${id}`;
    // this.location.replaceState(this.str);
    this.currentTeam = name;

  }

  setSelectedTeamName(name: string) {
    this.selectedTeam = name;
    sessionStorage.setItem('currentTeamSelected', '');
    sessionStorage.setItem('currentTeamSelected', name);
  }
  ngAfterViewInit() {
    // this.location.replaceState('/admin/team')
  }

}

