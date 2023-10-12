
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../../../_services/organization.service';
import 'rxjs/add/operator/filter'
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  public str: any;
  organizationName: any;
  storedNames: any;


  constructor(public router: Router, public org: OrganizationService) { }

  ngOnInit() {
    // this.getRouter();
    this.storedNames = JSON.parse(localStorage.getItem("UTO") as string);

    var str: string = this.router.url;
    this.str = str.split("/");

    let id = this.storedNames.organizationId;
    this.org.getOrganization(id).subscribe((data: { data: { name: any; }; }) => {

      this.organizationName = data.data.name

    },
        (error: any) => {

      });
  }




getRouter() {
  // var str: string = '';
  this.router.events.subscribe(data => {
    var d: any = data
    this.str = d.url.split("/");


  });
  // this.str = '';
  // this.str = str.split("/");


}

}
