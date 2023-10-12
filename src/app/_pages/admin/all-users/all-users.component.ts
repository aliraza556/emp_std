import { ModalDirective } from 'ng2-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../_services/admin/admin.service';

export class UserModel {

  constructor(public firstName: string, public lastName: string, public email: string, public status: string
    , public userRole: {}) {

  }
}


@Component({
  selector: 'all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  // providers: [AdminService]

})
export class AllUsersComponent implements OnInit {
  userId: any;
  myMessage: string | any;
  userModel: UserModel;
  showForm = false;
  allUser: any;
  userRoles: any;

  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  @ViewChild('staticModal2') public staticModal2: ModalDirective | any;

  constructor(public ads: AdminService) {
    this.userModel = {
      firstName: '',
      lastName: '',
      email: '',
      userRole: {},
      status: 'PENDING'
    }
    this.getAllUsers();
    this.getAllUsersRoles();

  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }

  ngOnInit() {
  }

  deleteTimecard(user: any) {

    this.myMessage = "Do you want to delete this user " + user.firstName + " " + user.lastName + "?";
    // this.staticModal2.show();
    this.userId = user.id;

  }


  editForm(user: { roles: { code: any; }[]; firstName: any; lastName: any; email: any; status: any; }) {


    if (user.roles[0]) {
      this.userModel = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userRole: user.roles[0].code,
        status: user.status
      }
    }
    else {
      this.userModel = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userRole: 'NA',
        status: user.status
      }

    }


  }
  onSubmit(m: any) {

  }


  getAllUsers() {
    this.ads.getAllUsers().subscribe((data: { data: any; }) => {

      this.allUser = data.data;

    }, (error: any) => {

    });
  }

  showHideForms() {
    this.showForm = !this.showForm;
  }

  getAllUsersRoles() {
    this.ads.getAllUsersRoles().subscribe((data: { data: any; }) => {

      this.userRoles = data.data;


    }, (error: { status: number; message: string; statusText: any; }) => {
      if (error.status === 0) {
        this.myMessage = 'Unable to connect to Server...!!';
        this.errorTrigger = true;

      }
      else if (error.status === 500) {

        this.myMessage = 'internal server erorr \n' + error.message;
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

}
