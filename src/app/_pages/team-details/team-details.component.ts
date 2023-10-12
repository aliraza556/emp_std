import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';
import { OrganizationService } from '../../_services/organization.service';
import { ErrorRegisterService } from '../../_services/error-register.service';
import { AdminService } from '../../_services/admin/admin.service';
import { TeamService } from '../../_services/admin/team.service';

import moment from 'moment';
import { TimeSheetRecord } from '../../_models/timeSheetRecord.model';
import { Location } from '../../../../node_modules/@angular/common';
import { ConfigService } from '../../_services/config.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  item: any = '';
  page: number = 1;

  spinerTrigger = false;
  editDescription: any;
  deleteTeamId: any = 0;
  timeSRecord: TimeSheetRecord[] | any;
  private myForm: FormGroup | any;
  teams: any[] = [];
  showTeam = false;
  format = 'x';
  format2 = "YYYY-MM-DD HH:mm:ss";
  showCustom = false;
  date = new Date();
  teamId: any = 0;
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
  currentSelectedTeam = 0;
  statusList = [{ key: true, value: 'Active' }, { key: false, value: 'Disabled' }]
  public myDateRangePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    inline: false,
    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }

  };
  storedNames: any;
  status: any;
  totalManualTime: string | any;
  userDashboard: boolean = false;
  userIdForDashboard: any = 0;
  selectedUser: any = '';
  currentTeamName: string | null = '';

  constructor(private route: ActivatedRoute,
    private org: OrganizationService, private fb: FormBuilder,
    private er: ErrorRegisterService, private location: Location,
    public config: ConfigService,
    private as: AdminService, private ts: TeamService, private router: Router) {
    // sessionStorage.setItem('currentTeamSelected','');
    sessionStorage.setItem('currentUSerSelected', '');

    this.spinerTrigger = true

    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO') as string);
      this.storedNames = c;
    }
    // this.getTeam();

    this.date = new Date();

    this.myDateRangePickerOptions.disableSince!.year = this.date.getFullYear();
    this.myDateRangePickerOptions.disableSince!.month = this.date.getMonth() + 1;
    this.myDateRangePickerOptions.disableSince!.day = this.date.getDate() + 1;


    this.editTeamForm = this.fb.group({
      teamName: [this.editTeamName, Validators.compose([Validators.required])],
      teamDescription: [this.editDescription, Validators.compose([Validators.required])],
      status: [this.status]

    });


    let tId : any;
    this.route.params.subscribe(params => {

      tId = params['id']
    })
    sessionStorage.setItem('tId', '');
    sessionStorage.setItem('tId', tId);

    this.setEditTeamId(tId);
    this.setDeleteTeamId(tId)

    this.getAllTeamTimeSheet(tId);
  }

  ngOnInit() {
    this.currentTeamName = sessionStorage.getItem('currentTeamSelected');
    this.selectedUser = sessionStorage.getItem('currentUSerSelected');

    this.myForm = this.fb.group({
      myDateRange: ['', Validators.required]
    });
  }
  showCustomCalender() {
    this.showCustom = !this.showCustom;
  }

  setDateRange(): void {
    // Set date range (today) using the setValue function
    let date = new Date();
    this.myForm.setValue({
      myDateRange: {
        beginDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        },
        endDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }
  clearDateRange(): void {
    // Clear the date range using the setValue function
    this.myForm.setValue({ myDateRange: '' });
  }

  setEditTeamId(id: number | any) {

    this.editTeamId = id;

    this.ts.getTeam(id).subscribe((data: { data: { name: string; description: any; active: any; }; }) => {

      this.editTeamName = data.data.name;

      this.editDescription = data.data.description;
      this.status = data.data.active;

      this.editTeamForm = this.fb.group({
        teamName: [this.editTeamName, Validators.compose([Validators.required])],
        teamDescription: [this.editDescription, Validators.compose([Validators.required])],
        status: [this.status]

      });
    },
        (error: any) => {
        let m = moment().format(this.format2);
        let err = this.er.CompileErrorMessage(error, "DeleteNow()", m, "team");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });

  }

  setDeleteTeamId(id: number | any) {
    this.deleteTeamId = id;
  }

  deleteItNow() {

    if (this.deleteTeamId)
      this.ts.deleteTeam(this.deleteTeamId).subscribe(
          (data: { message: string; }) => {

          this.myMessage = data.message;
          this.successTrigger = true;
          // this.redirectToThisPage();
          setTimeout(() => {
            this.router.navigate(['/dashboard/admin-dashboard/teams']);
            this.successTrigger = false;


          }, 4000);
        }, (error: any) => {
          let m = moment().format(this.format2);

          let err = this.er.CompileErrorMessage(error, "DeleteNow()", m, "TeamComponent");
          this.er.updateErrorList(err.errorDetail);
          this.myMessage = err.errorMessage;
          this.errorTrigger = true;
        })
  }

  emitUserId(id: any) {
    this.userIdForDashboard = id;
  }

  showUserDashboard() {
    this.userDashboard = !this.userDashboard;
  }

  getAllTeamTimeSheet(id: number | any) {

    this.teamId = id;
    let date = new Date();
    // let startDate: any = moment.utc(date).format("YYYY-MM-DD");;
    // let endDate: any = moment.utc(date).format("YYYY-MM-DD");;
    this.org.getSpecificTimesheet(id, "today").subscribe((data: { data: any; }) => {

      this.spinerTrigger = false
      // this.timeSRecord=data.data;
      let t = this.timeSheetModified(data.data);

      this.teams.forEach(e => {

        if (e.id == id) {
          this.teamName = e.name;
        }

      });

      this.timeSRecord = t;
      this.spinerTrigger = false

    }, (error: any) => {
      this.spinerTrigger = false
    });

    this.showTeam = true;
  }

  getSpecificTeamsheet(n: any) {

    this.spinerTrigger = true;
    this.showCustom = false;
    this.org.getSpecificTimesheet(this.teamId, n).subscribe((data: { data: any; }) => {

      let t = this.timeSheetModified(data.data);

      this.timeSRecord = t;
      this.showTeam = true;
      this.spinerTrigger = false;
    }, (error: any) => {
        this.spinerTrigger = false
      });

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
  timeSheetModified(timesheets: any) {

    let finalTimeSArray: any[] = [];


    timesheets.forEach((n: { totalManual: any; totalMinutes: any; totalWorked: any; totalIdle: any; totalDisputed: any; activeWorkingHours: any; remainingWorkingHours: any; user: any; }) => {

      this.totalManualTime = this.getfinalTime(n.totalManual);
      this.totalWorkingMints = this.getfinalTime(n.totalMinutes)//n.totalMinutes;
      this.totalWorkedMints = this.getfinalTime(n.totalWorked)//n.totalWorked;
      this.totalIdleTimecard = this.getfinalTime(n.totalIdle)// n.totalIdle;
      this.disputedTime = this.getfinalTime(n.totalDisputed)//n.totalDisputed;
      this.activeWorkhours = this.getfinalTime(n.activeWorkingHours);//n.totalWorked - n.totalIdle)//this.totalWorkedMints - this.totalIdleTimecard;
      // let activeMints = n.totalWorked - n.totalIdle;
      this.remainingWorkhours = this.getfinalTime(n.remainingWorkingHours);//n.totalMinutes - activeMints)// this.totalWorkingMints - this.activeWorkhours;
      let obj = {
        user: n.user,
        totalMinutes: this.totalWorkingMints,
        totalWorked: this.totalWorkedMints,
        totalIdle: this.totalIdleTimecard,
        totalDisputed: this.disputedTime,
        totalRemainingTime: this.remainingWorkhours,
        totalManualTime: this.totalManualTime
      }
      finalTimeSArray.push(obj);
    });
    return finalTimeSArray;
  }
  setSelectedUserName(name: string) {
    this.selectedUser = name;
    sessionStorage.setItem('currentUSerSelected', '');
    sessionStorage.setItem('currentUSerSelected', name);
  }

  ngAfterViewInit() {
    this.location.replaceState('/admin/teamDetails/' + this.teamId)
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
      this.router.navigate(['/dashboard/admin-dashboard/teams']);

      setTimeout(() => {
        this.successTrigger = false;
      }, 3000);
    }, (error: any) => {

      // this.changeClass = false;
      let err = this.er.CompileErrorMessage(error, "onsubmit", this.config.dateFormat, "team-details");
      this.myMessage = err.errorMessage;
      this.errorTrigger = true;
      // let m = moment().format(this.format2);
      // if (error.status === 0) {
      //   this.myMessage = 'Unable to connect to Server...!!';
      //   this.errorTrigger = true;

      // }
      // else if (error.status === 500) {

      //   this.myMessage = 'internal server erorr';
      //   this.errorTrigger = true;

      // }
      // else if (error.status === 400) {

      //   this.myMessage = error.message;
      //   this.errorTrigger = true;

      // }
      // else if (error.status === 401) {

      //   this.myMessage = error.statusText;
      //   this.errorTrigger = true;

      // }
    });

  }


  onCustomClick(values: any): void {
    this.spinerTrigger = true;
    if (this.myForm.valid && (this.myForm.value.myDateRange.beginDate !== null || this.myForm.value.myDateRange.endDate.valid)) {
      let bMonth = this.myForm.value.myDateRange.beginDate.month;
      let bDay = this.myForm.value.myDateRange.beginDate.day;
      let bYear = this.myForm.value.myDateRange.beginDate.year;

      let eMonth = this.myForm.value.myDateRange.endDate.month;
      let eDay = this.myForm.value.myDateRange.endDate.day;
      let eYear = this.myForm.value.myDateRange.endDate.year;

      let startDate = moment.utc(bYear + '-' + bMonth + '-' + bDay).format("YYYY-MM-DD");;
      let endDate = moment.utc(eYear + '-' + eMonth + '-' + eDay).format("YYYY-MM-DD");;

      this.org.getTeamTimeSheet(this.teamId, startDate, endDate).subscribe((data: { data: any; }) => {
        let t = this.timeSheetModified(data.data);

        this.timeSRecord = t;

        this.showTeam = true;
        this.spinerTrigger = false;

        // this.teams.forEach(team => {
        //   team.members.forEach(tMember => {

        //     this.timeSRecord.forEach(tSR => {

        //       if (tSR.userId == tMember.userId) {
        //         tSR.member = tMember;

        //       }

        //     });

        //   });


        // });

      }, (error: any) => { });

    }

  }

    setAlertOff() {
      this.errorTrigger = false;
      this.successTrigger = false;
    }
}
