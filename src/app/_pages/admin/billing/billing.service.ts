import { ConfigService } from '../../../_services/config.service';
import { HttpWrapperService } from '../../../_services/http-wrapper/http-wrapper.service';
// import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BillingService {

  constructor(public cs: ConfigService, public http_wrapper: HttpWrapperService) { }

  getBilling() {
    let _url = this.cs.urlBuilder('/org/billing');
    return this.http_wrapper.get_wrapper(_url);
  }

  getfinalTime(time: any) {

    let formattedHours;
    let i = '+';

    if (time < 0) {
      i = '-'
      time = Math.abs(time);
    }
    let h: any = Math.floor(time / 60);
    let m: any = time % 60;
    if (h >= 100)
      {
        formattedHours = ('0' + h).slice(-3);
      }
    else
      formattedHours = ("0" + h).slice(-2);


    const formattedMiints = ('0' + m).slice(-2);
    if (i == '-') {
      return i + ' ' + formattedHours + ':' + formattedMiints;
    } else
      return formattedHours + ':' + formattedMiints;

  }

}
