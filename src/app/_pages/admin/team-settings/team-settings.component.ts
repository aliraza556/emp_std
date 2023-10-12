import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from '../../../_services/admin/team.service';


@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.css']
})
export class TeamSettingsComponent implements OnInit, OnChanges {

  @Input('editTeamId') teamId: number | any;

  public teamForm: FormGroup | any
  successTrigger: boolean = false;
  errorTrigger: boolean = false;
  myMessage = '';
  format2 = "YYYY-MM-DD HH:mm:ss";

  constructor(private fb: FormBuilder, private ts: TeamService) { }

  ngOnChanges(change: SimpleChanges) {

    }

  ngOnInit() {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.compose([Validators.required])],
      teamDescription: [''],
      status: [false, Validators.requiredTrue]
    });
  }
  onSubmit(m: { teamDescription: any; status: any; teamName: any; }) {

    let modal = {
      description: m.teamDescription,
      active: m.status,
      name: m.teamName
    }
  }

  setAlertOff() {
    this.successTrigger = false;
    this.errorTrigger = false;
  }

}
