import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../_services/config.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadTrackerService {

  constructor(
      private cs: ConfigService,
      private http: HttpClient
  ) {}

  getTrackerVersion(): Observable<any> {
    const url = this.cs.urlBuilder('/common/version/latest');
    const headers = new HttpHeaders(this.cs.headerWithToken());

    return this.http.get<any>(url, { headers }).pipe(
        map(res => {
             res.json()
          return res;
        })
    );
  }
}
