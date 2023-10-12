import { ConfigService } from '../../../_services/config.service';

import { Router } from '@angular/router';
import { TeamService } from '../../../_services/admin/team.service';
import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { OrganizationService } from '../../../_services/organization.service';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { OrganizationModel } from '../../../_models/organization.model';
import moment from 'moment';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { AdminService } from '../../../_services/admin/admin.service';

import { Location } from '@angular/common';
import 'rxjs/add/operator/filter'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  item: any = '';
  //initializing p to one
  page: number = 1;

  //#region  variables
  cancleInviteId: any;
  format2 = "YYYY-MM-DD HH:mm:ss";
  inviteUser: any;
  showPendingTeamUser = false;
  teamName = '';
  teamsPendingUsers: any = [];
  PendingUsers: any = [];
  myMessage: any;
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  form: FormGroup;
  displayName: AbstractControl;
  showUsers = true;
  showPendingUser = false;
  userIdForDashboard = 0;
  spinerTrigger = true;
  orgId: any;
  teams: any = [];
  allUsers: any = []
  storedNames: any =JSON.parse(localStorage.getItem("UTO") as string);
  selectedUser: any = '';
  userDashboard: boolean = false;
  currentTeam: any = '';
  str: string[] | any;

  //#endregion

  //#region constructor
  constructor(public router: Router, public as: AdminService,
    public org: OrganizationService, public fb: FormBuilder,
    public ts: TeamService, public er: ErrorRegisterService,

    public location: Location,
    public config: ConfigService

  ) {
    sessionStorage.setItem('currentTeamSelected', '');
    sessionStorage.setItem('currentUSerSelected', '');
    // this.router.navigateByUrl["/dashboard/admin-dashboard"]
    // location.go('/');
    this.form = this.fb.group({
      'displayName': ['', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(4)])]
    });
    this.displayName = this.form.controls['displayName'];

    if (localStorage.getItem("UTO")) {

      let c: any = JSON.parse(localStorage.getItem("UTO") as string);
      this.storedNames = c;
    }


  }
  // #endregion
  ngAfterViewInit() {
    // this.location.replaceState('/admin/members')
  }

  // setUrl(name) {
  //   // this.location.replaceState(name)
  //   // this.currentTeam=name;
  // }

  setSelectedUserName(name: string) {
    this.selectedUser = name;
    sessionStorage.setItem('currentUSerSelected', '');
    sessionStorage.setItem('currentUSerSelected', name);
  }

  ngOnInit() {

    this.getRouter();
    var str: string = this.router.url;
    this.str = str.split("/");

    // this.getAllTeams();
    // this.getOrg();
    this.getAllPeningUsers();
  }

  getAllPeningUsers() {
    this.as.getAllPendingUsers().subscribe((data: { data: any; }) => {

      // console.log('pending user list : ', data)
      this.PendingUsers = data.data;
    },
        (error: any) => {
        let err = this.er.CompileErrorMessage(error, "getAllPendingUsers()", this.config.dateFormat, "pending-Member-list");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });
  }

  getRouter() {

    this.router.events.subscribe(data => {
      var d: any = data
      this.str = d.url.split("/");
    });

  }



  showUserFunction() {
    this.showUsers = true;
    this.showPendingUser = false;
    this.inviteUser = false;

  }
  showUserDashboard() {
    this.userDashboard = !this.userDashboard;
  }
  hideUserFunction() {
    this.showUsers = false;
    this.showPendingUser = true;
    this.inviteUser = false;
  }
  showInvite() {
    this.inviteUser = true;
    this.showPendingUser = false;
  }
  emitUserId(id: any) {
    this.userIdForDashboard = id;
  }

  // getOrg() {
  //   let id = this.storedNames.organizationId;
  //   this.org.getOrganization(id).subscribe(data => {

  //     this.orgId = data.data.id

  //     this.form = this.fb.group({
  //       'displayName': [data.data.name, Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(4)])]
  //     });
  //     this.displayName = this.form.controls['displayName'];

  //   },
  //     error => {

  //       let m = moment().format(this.format2);

  //       let err = this.er.CompileErrorMessage(error, "getOrg()", m, "Admin-Dashboard");
  //       this.er.updateErrorList(err.errorDetail);
  //       this.myMessage = err.errorMessage;
  //       this.errorTrigger = true;

  //     });

  // }


  getPendingUserbyTeam(id: any) {

    this.as.getAllPendingInvitesOfTeam(id).subscribe((data: { data: any; }) => {

      this.teamsPendingUsers = data.data;
      // this.teamName = this.teamsPendingUsers;

      this.teamsPendingUsers.forEach((element: { team: { id: any; name: string; }; }) => {

        if (element.team.id == id) {
          this.teamName = element.team.name;
        }

      });
      this.showPendingTeamUser = true;
    },
        (error: any) => {
        let m = moment().format(this.format2);

        let err = this.er.CompileErrorMessage(error, "getPendingUserbyTeam()", m, "Admin-Dashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;

      });
  }


  // setUrlValue(url) {
  //
  //   // this.teamName = url;
  // }

  // getAllTeams() {

  //   this.as.getTeamsByOrgAllUsers().subscribe(data => {

  //     this.teams = data.data;

  //   },
  //     error => {
  //       let m = moment().format(this.format2);
  //       let err = this.er.CompileErrorMessage(error, "getAllTeams()", m, "Admin-Dashboard");
  //       this.er.updateErrorList(err.errorDetail);
  //       this.myMessage = err.errorMessage;
  //       this.errorTrigger = true;
  //     });
  // }

  // getAllPeningUsers() {

  //   this.as.getAllPendingUsers().subscribe(data => {

  //     this.PendingUsers = data.data;



  //   },
  //     error => {

  //       let m = moment().format(this.format2);

  //       let err = this.er.CompileErrorMessage(error, "getAllPendingUsers()", m, "Admin-Dashboard");
  //       this.er.updateErrorList(err.errorDetail);
  //       this.myMessage = err.errorMessage;
  //       this.errorTrigger = true;


  //     });
  // }


  onSubmit(m: { displayName: string; }) {
    let n: string = m.displayName;

    //   var date = new Date();
    // var dateTime = moment.utc(date).format("DD-MM-YYYY");
    let org: OrganizationModel = {
      id: 0,
      name: m.displayName,

    }

    this.org.updateOrganization(this.orgId, org).subscribe((data: { message: any; }) => {


      this.myMessage = data.message;
      this.successTrigger = true;

    },
        (error: any) => {
        let m = moment().format(this.format2);

        let err = this.er.CompileErrorMessage(error, "OnSubmit()", m, "Admin-Dashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });



  }
  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }
  setCancelInviteId(id: any) {
    this.cancleInviteId = id;
  }

  cancelInvite() {
    let id = this.cancleInviteId

    this.ts.cancelInvite(id).subscribe(
        (data: { message: any; }) => {

        this.myMessage = data.message;
        this.successTrigger = true;
        // this.getAllPeningUsers();
        // this.router.navigateByUrl("dashboard/team");



      }, (error: any) => {
        let m = moment().format(this.format2);

        let err = this.er.CompileErrorMessage(error, "cancleInvite()", m, "Admin-dashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;

      });

  }

}
