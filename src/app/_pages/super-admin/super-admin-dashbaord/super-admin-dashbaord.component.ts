import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-super-admin-dashbaord',
  templateUrl: './super-admin-dashbaord.component.html',
  styleUrls: ['./super-admin-dashbaord.component.css']
})
export class SuperAdminDashbaordComponent implements OnInit {

  orgId: number | any;
  sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

       this.orgId = params['id']; // (+) converts string 'id' to a number

       sessionStorage.setItem('currentOrgId',JSON.stringify(this.orgId));
    });

    console.log(this.orgId)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
