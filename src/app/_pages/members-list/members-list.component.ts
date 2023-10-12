import { ErrorRegisterService } from '../../_services/error-register.service';
import { AdminService } from '../../_services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../_services/config.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  spinerTrigger: boolean = false;
  allUsers: any[] = [];
  myMessage: string = '';

  errorTrigger: boolean = false;
  selectedUser: any;
  page: any | string = '';
  item = '';


  constructor(public as: AdminService, public config: ConfigService, public er: ErrorRegisterService) { }

  ngOnInit() {
    this.getAllUser();
  }
  setSelectedUserName(name: string) {
    // this.selectedUser = name;
    sessionStorage.setItem('currentUSerSelected', '');
    sessionStorage.setItem('currentUSerSelected', name);
  }


  getAllUser() {
    this.spinerTrigger = true;

    this.as.getOrgAllUsers().subscribe((data: { data: any[]; }) => {

      this.spinerTrigger = false;
      this.allUsers = data.data;

    },
        (error: any) => {
        let err = this.er.CompileErrorMessage(error, "getAllUser()", this.config.dateFormat, "Admin-Dashboard");
        this.er.updateErrorList(err.errorDetail);
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
      });
  }

}
