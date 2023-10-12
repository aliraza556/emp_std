
import { TeamService } from '../../../_services/admin/team.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ErrorRegisterService } from '../../../_services/error-register.service';

@Component({
  selector: 'create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  public teamForm: FormGroup
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  myMessage = '';
  format2 = "YYYY-MM-DD HH:mm:ss";
  loading = false;
  constructor(private fb: FormBuilder, private ts: TeamService, private er: ErrorRegisterService) {

    this.teamForm = this.fb.group({
      teamName: ['', Validators.compose([Validators.required])],
      teamDescription: ['', Validators.compose([Validators.required])]
    });


  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }

  ngOnInit() {
  }

  onSubmit(m: { teamDescription: any; teamName: any; }) {
    this.loading = true;
    let modal = {
      description: m.teamDescription,
      active: false,
      name: m.teamName
    }

    this.ts.addNewTeam(modal).subscribe((data: any) => {
      this.myMessage = "Team is created successfully";
      this.successTrigger = true;
      this.loading = false;
      this.teamForm.reset();

    }, (error: any) => {

      let m = moment().format(this.format2);
      let err = this.er.CompileErrorMessage(error, "OnSubmit()", m, "Create-team");
      this.er.updateErrorList(err.errorDetail);
      this.myMessage = err.errorMessage;
      this.errorTrigger = true;
      this.loading = false;

    });

  }

}
