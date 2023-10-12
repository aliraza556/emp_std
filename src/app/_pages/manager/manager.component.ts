import { Component, OnInit } from '@angular/core';
import  moment from 'moment';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  format2 = "YYYY-MM-DD HH:mm:ss";
  myMessage = '';
  constructor() { }
  showError() {
    this.myMessage = 'An error occurred!';
    this.errorTrigger = true;
  }

  // Example method to set a success message and trigger the success alert
  showSuccess() {
    this.myMessage = 'Operation was successful!';
    this.successTrigger = true;
  }
  ngOnInit() {

  }
  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }
}
