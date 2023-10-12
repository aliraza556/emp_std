import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  totalMembers:number=1;

  constructor() { }

  ngOnInit() {
  }

}
