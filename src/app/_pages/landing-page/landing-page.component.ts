import { Component, OnInit } from '@angular/core';
import { ScrollToService } from 'ng2-scroll-to-el';


declare var jquery: any; declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public bg_image = require('../../../assets/img/bg-image1.jpg');
  storedNames: any;
  constructor(private scrollService: ScrollToService) {

    if (localStorage.getItem('UTO')) {
      let c: any = JSON.parse(localStorage.getItem('UTO') as string);
      this.storedNames = c;
       }
  }

  scrollToTop(element: string | HTMLElement) {
    this.scrollService.scrollTo(element);
  }
  ngOnInit() {
  }
  goTo(location: string): void {

    window.location.hash = location;
  }

}
