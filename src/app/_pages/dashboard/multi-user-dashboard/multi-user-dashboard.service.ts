import { Injectable } from '@angular/core';
import { ConfigService } from '../../../_services/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MultiUserDashboardService {

    constructor(private _http: HttpClient, private cs: ConfigService) {}

    private buildUrl(endpoint: string, id: string, sDate: string): string {
        // Implement your URL building logic here
        return this.cs.urlBuilder(`/dashboard/${id}/${endpoint}?interval=${sDate}`);
    }

    private getHeaders(): HttpHeaders {
        // Get headers from your ConfigService or define them here
        return new HttpHeaders(this.cs.headerWithToken());
    }

    getApplicationStats(id: string, sDate: string): Observable<any> {
        return this._http.get(this.buildUrl('application/stats', id, sDate), { headers: this.getHeaders() })
            .pipe(map(res => res));
    }

    getWorkingHours(id: string, sDate: string): Observable<any> {
        return this._http.get(this.buildUrl('workinghours/stats', id, sDate), { headers: this.getHeaders() })
            .pipe(map(res => res));
    }

    getWorkingHoursCustom(id: string, sDate: string): Observable<any> {
        return this._http.get(this.buildUrl('workinghours/stats', id, sDate), { headers: this.getHeaders() })
            .pipe(map(res => res));
    }

    getTotalWorkMinutes(id: string, sDate: string): Observable<any> {
        return this._http.get(this.buildUrl('summary/', id, sDate), { headers: this.getHeaders() })
            .pipe(map(res => res));
    }

}
