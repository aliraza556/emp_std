import { TeamService } from '../../_services/admin/team.service';
import { ConfigService } from '../../_services/config.service';
import { AdminService } from '../../_services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ErrorRegisterService } from '../../_services/error-register.service';

@Component({
  selector: 'app-pending-members-list',
  templateUrl: './pending-members-list.component.html',
  styleUrls: ['./pending-members-list.component.css']
})
export class PendingMembersListComponent implements OnInit {
  PendingUsers: any[] = [];
  myMessage: string = '';
  errorTrigger: boolean = false;
  cancleInviteId: any;
  successTrigger: boolean | any;

  constructor(public as: AdminService, public config: ConfigService, public er: ErrorRegisterService,public ts:TeamService) { }

  ngOnInit() {
    this.getAllPeningUsers();
  }

  getAllPeningUsers() {
    this.as.getAllPendingUsers().subscribe((data: { data: any[]; }) => {

      console.log('pending user list : ',data)
      this.PendingUsers = data.data;
    },
        (error: any) => {
        let err = this.er.CompileErrorMessage(error, "getAllPendingUsers()", this.config.dateFormat, "pending-Member-list");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });
  }
  setCancelInviteId(id: any) {
    this.cancleInviteId = id;
  }

  cancelInvite() {
    let id = this.cancleInviteId

    this.ts.cancelInvite(id).subscribe(
        (data: { message: string; }) => {

        this.myMessage = data.message;
        this.successTrigger = true;
        this.getAllPeningUsers();
        // this.router.navigateByUrl("dashboard/team");



      }, (error: any) => {
        // let m = moment().format(this.format2);

        let err = this.er.CompileErrorMessage(error, "cancleInvite()", this.config.dateFormat, "Admin-dashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;

      });

  }
}
