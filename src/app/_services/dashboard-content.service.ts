import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from './config.service';
import { HttpWrapperService } from './http-wrapper/http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardContentService {

    constructor(
        private _http: HttpClient,
        private cs: ConfigService,
        private http_wrapper: HttpWrapperService
    ) {}

    getApplicationStats(id: string, sDate: string): Observable<any> {
        const _url = this.cs.urlBuilder(`/dashboard/my/application/stats?interval=${sDate}`);
        return this.http_wrapper.get_wrapper(_url);
    }

    getWorkingHours(id: string | number, sDate: string): Observable<any> {
        const _url = this.cs.urlBuilder(`/dashboard/my/workinghours/stats?interval=${sDate}`);
        return this.http_wrapper.get_wrapper(_url);
    }

    getTotalWorkMintes(id: string, sDate: string): Observable<any> {
        const _url = this.cs.urlBuilder(`/dashboard/my/summary/?interval=${sDate}`);
        return this.http_wrapper.get_wrapper(_url);
    }

    getWorkingHoursCustom(id: string | number, sDate: { startDate: string; endDate: string }): Observable<any> {
        const _url = this.cs.urlBuilder(`/dashboard/${id}/workinghours/stats?start_date=${sDate.startDate}&end_date=${sDate.endDate}`);
        return this.http_wrapper.get_wrapper(_url);
    }

    getApplicationStatsCustom(id: string, sDate: { startDate: string, endDate: string }): Observable<any> {
        const _url = this.cs.urlBuilder(`/dashboard/${id}/application/stats?start_date=${sDate.startDate}&end_date=${sDate.endDate}`);
        return this.http_wrapper.get_wrapper(_url);
    }

    getTotalWorkMintesCustom(id: string, sDate: { startDate: string, endDate: string }): Observable<any> {
        const _url = this.cs.urlBuilder(`/dashboard/${id}/summary?start_date=${sDate.startDate}&end_date=${sDate.endDate}`);
        return this.http_wrapper.get_wrapper(_url);
    }
}
