import { BillingService } from '../billing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {

  public dailyBilling: any[] = [];
  public totalBilling: any;

  constructor(public billingService: BillingService) { }

  ngOnInit() {
    this.getBillingDetail();
  }

  getBillingDetail() {
    this.billingService.getBilling().subscribe((data: { data: { dailyBilling: any[]; }; }) => {
      this.totalBilling = data.data;

      this.dailyBilling = data.data.dailyBilling;

    }, (error: any) => { });
  }


  getHours(h: any) {
    return this.billingService.getfinalTime(h);
  }

  roundNumber(n: any) {

    // var num: number = Math.round(n)

    return n.toFixed(2);

  }

}
