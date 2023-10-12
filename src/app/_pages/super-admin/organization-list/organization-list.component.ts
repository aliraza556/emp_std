import { ConfigService } from '../../../_services/config.service';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { SuperAdminService } from '../super-admin.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {

  allOrganizations: any[] = [];
  item = '';
  page: number = 1;
  selectedOrgId = 0;
  successTrigger: any | string = false;
  errorTrigger: any | string = false;
  loading = false;
  errorTitle: string = 'error';
  constructor(public saService: SuperAdminService, public errorService: ErrorRegisterService, public config: ConfigService) { }

  ngOnInit() {
    this.getOrganizations();
  }

  getOrganizations() {
    this.saService.getAllOrganization().subscribe((data: any )=> {
      this.allOrganizations = data.data;
    }, error => { });
  }
  setDeleteId(id: number) {
    this.selectedOrgId = id;
  }

  deleteItNow() {
    this.loading = true;
    this.saService.deleteOrganization(this.selectedOrgId).subscribe((data : any) => {
      console.log(data);

      if (data.success) {
        this.successTrigger = data.message;
        this.getOrganizations();

      }
      if (!data.success) {
        this.errorTrigger = data.message;
      }



    }, (error: any) => {
      let err = this.errorService.CompileErrorMessage(error, "ngOninit", this.config.dateFormat, "SuperAdmin");
      this.errorTrigger = err.errorMessage;

      this.errorTitle = err.errorTitle;

    });
  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }
}
