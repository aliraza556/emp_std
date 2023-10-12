
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { DashboardContentService } from '../../../_services/dashboard-content.service';
import { ConfigService } from '../../../_services/config.service';
import { MultiUserDashboardService } from '../multi-user-dashboard/multi-user-dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '../../../../../node_modules/@angular/common';
import { MultiUserDashboardComponent } from '../multi-user-dashboard/multi-user-dashboard.component';
// import 'rxjs/add/operator/filter'
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-user-dashboard-details',
  templateUrl: './user-dashboard-details.component.html',
  styleUrls: ['./user-dashboard-details.component.css']
})
export class UserDashboardDetailsComponent implements OnInit {

  userIdForDashboard: any = 0;
  selectedUser: any = '';
  currentTeamName
  teamId: any = 0;
  currentPage = 'dashboard'
  str: string[] | any;

  constructor(private route: ActivatedRoute, private location: Location, public router: Router) {
    this.router.events
        .pipe(
            filter((event: any) => event instanceof NavigationEnd)
        )
      .subscribe((event: any) => {
        console.log(event.url);
        this.str = event.url.split("/");
        console.log(this.str)
        this.currentPage = this.str[this.str.length - 1];
        if (this.currentPage.length > 4) { this.getRouterActive(this.currentPage); }
        else {
          this.currentPage = 'dashboard'
          this.getRouterActive('dashboard')


        }
      });
    // console.log(location.path())
    let tId;
    this.route.params.subscribe(params => {
      tId = params['id']
      sessionStorage.setItem('userId', tId);
    });
    this.selectedUser = sessionStorage.getItem('currentUSerSelected');
    this.currentTeamName = sessionStorage.getItem('currentTeamSelected');
    this.userIdForDashboard = tId;
  }

  ngOnInit() {

    this.teamId = sessionStorage.getItem('tId');

    var str: string = this.router.url;
    this.str = str.split("/");
    // console.log(this.str)

  }
  ngAfterViewInit() {
    // this.location.replaceState('/admin/userDetails/' + this.userIdForDashboard)
  }

  MoveTo(url: any) {

    // this.router.navigate[(url)];
    var ser: MultiUserDashboardService;
    var cs: ConfigService;
    var dSerice: DashboardContentService;
    var er: ErrorRegisterService;


    // @ts-ignore
    var d = new MultiUserDashboardComponent(ser, this.router, cs, dSerice, er)
    d.getAppStats(this.userIdForDashboard, "today");

    d.getWorkHoursStats(this.userIdForDashboard, "today");
    d.getTotalWorrkingHoursStats(this.userIdForDashboard, "today");
    d.duration = "Today";
  }


  getRouterActive(path: string) {

    if (this.currentPage == path) {
      return true;
    }
    else {
      return false;
    }


  }
}
//
