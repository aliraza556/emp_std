import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';


@Component({
  selector: 'app-notification-alerts',
  templateUrl: './notification-alerts.component.html',
  styleUrls: ['./notification-alerts.component.css']
})
export class NotificationAlertsComponent implements OnInit {

  myMessage: string = '';
  @ViewChild('SuccesModal') SuccesModal!: ModalDirective;
  @ViewChild('ErrorModal') ErrorModal!: ModalDirective;
  @ViewChild('WarningModal') WarningModal!: ModalDirective;

  constructor() { }

  ngOnInit() {
  }


  showPopUp(name: string, message: string = ''): void {

    this.myMessage = message;
    if (name == 'error')
      this.ErrorModal.show();
    else if (name == 'success')
      this.SuccesModal.show();
    else if (name == 'warning')
      this.WarningModal.show();


    setTimeout(() => {
      this.ErrorModal.hide();
      this.SuccesModal.hide();
      this.WarningModal.hide();
    }, 5000);
  }

  hidePopUp(name: string): void {

    if (name == 'error')
      this.ErrorModal.hide();
    else if (name == 'success')
      this.SuccesModal.hide();
    else if (name == 'warning')
      this.WarningModal.hide();
  }

}
