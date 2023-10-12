import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../../_services/config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MultiUserTimecardService {

  constructor(private _http: HttpClient, private cs: ConfigService) { }

  postManualTimecard(id: any, payload: any): Observable<any> {
    const _url = this.cs.urlBuilder('/timecard/' + id + '/manual');
    const headers = new HttpHeaders(this.cs.headerWithToken());
    return this._http
        .post(_url, payload, { headers })
        .pipe(map(res => res));
  }
}
