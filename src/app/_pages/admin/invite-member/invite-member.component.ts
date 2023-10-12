
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '../../../validators';
import moment from 'moment';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { AdminService } from '../../../_services/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.css']
})
export class InviteMemberComponent implements OnInit {

  myMessage: any;
  roles: any;
  teams: any;
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  invitationForm: FormGroup;
  LoadingSpiner = false;
  format2 = "YYYY-MM-DD HH:mm:ss";
  constructor(public router: Router, private fb: FormBuilder, private as: AdminService, private er: ErrorRegisterService) {

    this.invitationForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
      teamId: ['', Validators.required],
      roleId: ['', Validators.required]

    });
  }

  ngOnInit() {
    this.getAllTeams();
    this.getUSerRoles();
    this.invitationForm.reset();
    this.successTrigger = false;
    this.errorTrigger = false;
  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }

  getAllTeams() {

    this.as.getTeamsByOrgAllUsers().subscribe((data: { data: any; }) => {

      this.teams = data.data;

    },
        (error: any) => {
        let m = moment().format(this.format2);

        let err = this.er.CompileErrorMessage(error, "getAllTeams()", m, "Invite-member");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });
  }

  getUSerRoles() {
    this.as.getAllUsersRoles().subscribe((data: { data: any; }) => {

      this.roles = data.data;

    }, (error: any) => {

      let m = moment().format(this.format2);

      let err = this.er.CompileErrorMessage(error, "getUSerToles()", m, "Invite-member");
      this.er.updateErrorList(err.errorDetail);
      this.myMessage = err.errorMessage;
      this.errorTrigger = true;
    });
  }

  onSubmit(m: any) {
    this.LoadingSpiner = true

    this.as.postInvitation(JSON.stringify(m)).subscribe((data: { message: any; }) => {
      this.LoadingSpiner = false;

      this.myMessage = data.message;
      this.invitationForm.reset();
      this.successTrigger = true;
      // this.router.navigate(['/dashboard/admin-dashboard/members'])
    },
        (error: any) => {

        this.LoadingSpiner = false;
        let m = moment().format(this.format2);

        let err = this.er.CompileErrorMessage(error, "onSubmit()", m, "Invite-member");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });
  }



}
