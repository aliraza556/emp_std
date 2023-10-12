import { ConfigService } from '../../../../_services/config.service';
import { ErrorRegisterService } from '../../../../_services/error-register.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuperAdminService } from '../../super-admin.service';

@Component({
  selector: 'app-organization-members',
  templateUrl: './organization-members.component.html',
  styleUrls: ['./organization-members.component.css']
})
export class OrganizationMembersComponent implements OnInit {
  page: number = 1;
  orgId: any;
  item = '';
  memebersList: any[] = [];
  myMessage: string | any;
  errorTrigger: boolean = false;
  successTrigger: boolean = false;
  errorTitle: string | any;
  loading = false;
  constructor(private route: ActivatedRoute, public saService: SuperAdminService, public errorService: ErrorRegisterService, public config: ConfigService) { }

  ngOnInit() {
    this.orgId = JSON.parse(sessionStorage.getItem('currentOrgId') as string);
    this.getOrgMemebrs(this.orgId);
  }
  setSelectedUserName(name: string) {
    // this.selectedUser = name;
    sessionStorage.setItem('currentUSerSelected', '');
    sessionStorage.setItem('currentUSerSelected', name);
  }
  getOrgMemebrs(orgId: any) {
    this.loading = true;
    this.saService.getOrganizationMembers(orgId).subscribe((data: any) => {

      console.log(data);
      this.memebersList = data.data;
      this.loading = false;
    }, (error: any) => {
      let err = this.errorService.CompileErrorMessage(error, "getOrgMemebrs", this.config.dateFormat, "Organization-members");
      this.myMessage = err.errorMessage;
      this.errorTrigger = true;
      this.errorTitle = err.errorTitle;


    });
  }

  setAlertOff() {
      this.errorTrigger = false;
      this.successTrigger = false;
  }
}
