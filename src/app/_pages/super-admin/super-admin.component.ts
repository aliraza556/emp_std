import { ConfigService } from '../../_services/config.service';
import { ErrorRegisterService } from '../../_services/error-register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../../_services/organization.service';
import 'rxjs/add/operator/filter'

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  str = '';
  storedNames: any = '';
  organizationName: any = '';
  errorTitle: string = '';
  errorTrigger: boolean = false;
  myMessage: string = '';
  succesTrigger = false;

  constructor(public router: Router, public org: OrganizationService, public errorService: ErrorRegisterService,public config:ConfigService) {
    this.storedNames = JSON.parse(localStorage.getItem("UTO") as string);
    this.router.events.subscribe(data => {
      var d: any = data
      this.str = d.url.split("/");
    });



  }

  ngOnInit() {

    let id = this.storedNames.organizationId;
    this.org.getOrganization(id).subscribe((data: { data: { name: any; }; }) => {

      this.organizationName = data.data.name

    },
        (error: any) => {
        let err = this.errorService.CompileErrorMessage(error, "ngOninit", this.config.dateFormat, "SuperAdmin");
        this.myMessage = err.errorMessage;
        this.errorTrigger = true;
        this.errorTitle = err.errorTitle;

      });
  }

}
