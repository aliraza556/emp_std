import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private http: HttpClient, private cs: ConfigService) { }

    getOrganization(id: string) {
        let headers = new HttpHeaders(this.cs.headerWithToken());
        let _url = this.cs.urlBuilder(`/org/${id}`);
        return this.http.get(_url, { headers: headers }).pipe(map((response: any) => response));
    }

    updateOrganization(id: string, values: any) {
        let body = JSON.stringify(values);
        let headers = new HttpHeaders(this.cs.headerWithToken());
        let _url = this.cs.urlBuilder(`/org/${id}`);
        return this.http.put(_url, body, { headers: headers }).pipe(map((response: any) => response));
    }

    getOrganizationTeam(id: string) {
        let headers = new HttpHeaders(this.cs.headerWithToken());
        let _url = this.cs.urlBuilder(`/team/org/${id}`);
        return this.http.get(_url, { headers: headers }).pipe(map((response: any) => response));
    }

    getTeamTimeSheet(id: string, startDate: string, endDate: string) {
        let headers = new HttpHeaders(this.cs.headerWithToken());
        let _url = this.cs.urlBuilder(`/timesheet/team/${id}?start_date=${startDate}&end_date=${endDate}`);
        return this.http.get(_url, { headers: headers }).pipe(map((response: any) => response));
    }

    getSpecificTimesheet(id: string, sDate: string) {
        let _url = this.cs.urlBuilder(`/timesheet/team/${id}?interval=${sDate}`);
        let headers = new HttpHeaders(this.cs.headerWithToken());
        return this.http.get(_url, { headers: headers }).pipe(map((res: any) => res));
    }
}
