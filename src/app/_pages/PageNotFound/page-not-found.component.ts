import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ErrorRegisterService } from '../../_services/error-register.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './page-not-found.component.html',
  styleUrls:['./page-not-found.component.css']

})
export class PageNotFoundComponent {
  @ViewChild('staticModal') public staticModal: ModalDirective | any;
  storedNames = JSON.parse(localStorage.getItem("UTO") as string);

  myMessage = '';
    token_value: string | any;
    sendToDashboard=false;

  constructor(private router: Router, private er: ErrorRegisterService) {
    if(this.storedNames){
this.validateLogin();
    }

  }
goToLogin(){
   this.router.navigate(['login']);
}
goToDashboard(){
   this.router.navigate(['dashboard']);
}
   validateLogin() {
    this.token_value = this.storedNames.token;

    if (!this.storedNames) {
      this.router.navigate(['login']);
    }
    if(this.storedNames){
this.sendToDashboard=true;
    }
  }



}
