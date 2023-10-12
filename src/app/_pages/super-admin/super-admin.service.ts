import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../_services/config.service';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class SuperAdminService {

  constructor(public cs: ConfigService, public http: HttpClient) { }

  getAllOrganization():Observable<Object> {

    let headers = new HttpHeaders(this.cs.headerWithToken());
    let str = this.cs.urlBuilder('/org/');
    return this.http.get(str, { headers: headers });
  }



  getOrganizationMembers(orgId: string) {
    let headers = new HttpHeaders(this.cs.headerWithToken());
    let strUrl = '/member/org/' + orgId;
    let str = this.cs.urlBuilder(strUrl);
    return this.http.get(str, { headers: headers });
  }

  getOrganizationTeams(orgId: string) {
    let headers = new HttpHeaders(this.cs.headerWithToken());
    let strUrl = '/team/org/' + orgId;
    let str = this.cs.urlBuilder(strUrl);
    return this.http.get(str, { headers: headers });
  }


  deleteOrganization(orgId: string | number) {

    let headers = new HttpHeaders(this.cs.headerWithToken());
    let strUrl = '/org/' + orgId;
    let str = this.cs.urlBuilder(strUrl);
    return this.http.delete(str, { headers: headers });

  }
}
