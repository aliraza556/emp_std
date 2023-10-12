import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from './config.service';
import  moment from 'moment';
import { HttpWrapperService } from './http-wrapper/http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(
      private _http: HttpClient,
      private cs: ConfigService,
      private http_wrapper: HttpWrapperService
  ) {}

  getUserInfo(
      id: string,
      key: string,
      getKey: string,
      date: string,
      filter: string
  ): Observable<any> {
    const date1 = moment.utc(date).format("YYYY-MM-DD");
    const _url = this.cs.urlBuilder(`/timecard/list/${id}?date=${date1}&filter=${filter}`);
    return this.http_wrapper.get_wrapper(_url);
  }

  changeWebCamSetting(w: boolean, b: boolean): void {
    const body = { webCam: w, blurCam: b };
    const jsonBody = JSON.stringify(body);
    const _url = this.cs.urlBuilder('webCam/settings');
    this.http_wrapper.post_wrapper(_url, jsonBody);
  }

  deleteTimecard(id: string | string[], token_value: string): Observable<any> {
    let _url = this.cs.urlBuilder('/timecard/');
    if (Array.isArray(id)) {
      _url += id.join(",");
    } else {
      _url += id;
    }
    return this.http_wrapper.delete_wrapper(_url);
  }

  disputeComment(
      id: string,
      dAction: string,
      dComment: string
  ): Observable<any> {
    const body = { action: dAction, comments: dComment };
    const jsonBody = JSON.stringify(body);
    const _url = this.cs.urlBuilder(`/timecard/dispute/${id}`);
    return this.http_wrapper.post_wrapper(_url, jsonBody);
  }
}
