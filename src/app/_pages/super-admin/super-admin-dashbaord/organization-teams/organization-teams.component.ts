import { ConfigService } from '../../../../_services/config.service';
import { ErrorRegisterService } from '../../../../_services/error-register.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuperAdminService } from '../../super-admin.service';

@Component({
  selector: 'app-organization-teams',
  templateUrl: './organization-teams.component.html',
  styleUrls: ['./organization-teams.component.css']
})
export class OrganizationTeamsComponent implements OnInit {
  page: number = 1;
  orgId: any;
  loading: boolean = false;
  teamsList: any[] = [];
  myMessage: string = '';
  errorTrigger: boolean = false;
  errorTitle: string = '';
  successTrigger = false;
  item: string = '';
  spinerTrigger: boolean = false;  // For spinner triggering purpose



  constructor(public errorService: ErrorRegisterService, public config: ConfigService, public saService: SuperAdminService) { }

  ngOnInit() {
    this.orgId = JSON.parse(sessionStorage.getItem('currentOrgId')as string)
    this.getOrgTeams(this.orgId);
  }
  getOrgTeams(orgId: any) {
    this.loading = true;
    this.saService.getOrganizationTeams(orgId).subscribe((data: any) => {

      console.log(data);
      this.teamsList = data.data;
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

  setSelectedTeamName(name: any) {
    this.teamsList = name;
    console.log(name);
  }
}
