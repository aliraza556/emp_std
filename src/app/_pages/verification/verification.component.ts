import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VerificationService } from '../../_services/verification.service';
import { ModalDirective } from 'ng2-bootstrap';
import { LoginComponent } from '../login/login.component';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',

  providers: [VerificationService],

})
export class VerificationComponent implements OnInit {
  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  myMessage = '';
  showLoginLink = false;
  constructor(private activatedRoute: ActivatedRoute, private router: Router
    , private http: HttpClient, private verificationService: VerificationService) { }
  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let everification_id = params['everification_key'];

      this.verificationService.verifiyUser(everification_id).subscribe(
          (data: any) => {

          this.myMessage = data.message;
          this.showLoginLink = true;

          if (data.success === false) {
            this.showLoginLink = false;

            // this.staticModal.show();

          }



        },
          (error: any) => {

          this.myMessage = ' , ' + error.status;
          this.staticModal.show();

          if (error.status === 0) {
            this.staticModal.show();
            this.myMessage = "Unable to access to Server";
          }
          if (error.status === 500) {
            let body = error.text();
            this.staticModal.show();
            let bodyObject = JSON.parse(error);
            this.myMessage = ' , ' + error.status;
            this.myMessage += ' , ' + error.statusText;
            this.myMessage += ' , ' + bodyObject.exception;
          }
        });
    });
  }

}
