import { ErrorRegisterService } from '../../_services/error-register.service';
import { OrganizationModel } from '../../_models/organization.model';
import { ModalDirective } from 'ng2-bootstrap';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { OrganizationService } from '../../_services/organization.service';
import { ConfigService } from '../../_services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import  moment from 'moment';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit {
  orgId: any;
  myMessage = '';

  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  @ViewChild('staticModal') public staticModal: ModalDirective | any;

  storedNames :any=JSON.parse(localStorage.getItem("UTO") as string);
  public form: FormGroup;
  displayName: FormControl ;
  changeClass: boolean | any;
  errorTitle: string | any;

  constructor(public org: OrganizationService, private fb: FormBuilder,public config:ConfigService,public errorService:ErrorRegisterService) {
    this.storedNames = JSON.parse(localStorage.getItem('UTO')as string);


    this.form = this.fb.group({
      'displayName': ['', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(4)])]
    });
    this.displayName = this.form.controls['displayName'] as FormControl ;

  }
  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }
  ngOnInit() {
    this.getOrg();

  }

  getOrg() {
    let id = this.storedNames.organizationId;
    this.org.getOrganization(id).subscribe((data: { data: { id: any; name: any; }; }) => {

      // this.OrganizationName = data.data;
      this.orgId = data.data.id

      this.form = this.fb.group({
        'displayName': [data.data.name, Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(4)])]
      });
      this.displayName = this.form.controls['displayName'] as FormControl ;

    },
        (error: any) => {

        this.changeClass = false;
        let err = this.errorService.CompileErrorMessage(error, "onsubmit", this.config.dateFormat, "organizations");
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
        this.errorTitle=err.errorTitle;

      });
  }

  onSubmit(m: { displayName: string; }) {
    let n: string = m.displayName;

    //   var date = new Date();
    // var dateTime = moment.utc(date).format("DD-MM-YYYY");
    let org: OrganizationModel = {
      id: 0,
      name: m.displayName,
      // lowerName: n.toLowerCase()
    }

    this.org.updateOrganization(this.orgId, org).subscribe((data: { message: string; }) => {

      this.myMessage = data.message;

      this.successTrigger = true;
      setTimeout(() => {
        this.successTrigger = false;
      }, 10000);
    },
        (error: any) => {

        this.changeClass = false;
        let err = this.errorService.CompileErrorMessage(error, "onsubmit", this.config.dateFormat, "organization");
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
        this.errorTitle=err.errorTitle;

      });
  }
}
