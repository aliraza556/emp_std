import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TeamService {
        constructor(private cs: ConfigService, private http: HttpClient) { }

        postCompnaydetail(data: any): Observable<any> {
                const jsonBody = JSON.stringify(data);
                const _url = this.cs.urlBuilder("/org/signup");
                const headers = new HttpHeaders(this.cs.headerWithToken());
                return this.http
                    .post(_url, jsonBody, { headers: headers })
                    .pipe(map(res => res));
        }

        addNewTeam(data: any): Observable<any> {
                const jsonBody = JSON.stringify(data);
                const _url = this.cs.urlBuilder("/team/");
                const headers = new HttpHeaders(this.cs.headerWithToken());
                return this.http
                    .post(_url, jsonBody, { headers: headers })
                    .pipe(map(res => res));
        }

        getTeam(id: string): Observable<any> {
                const _url = this.cs.urlBuilder("/team/" + id);
                const headers = new HttpHeaders(this.cs.headerWithToken());
                return this.http
                    .get(_url, { headers: headers })
                    .pipe(map(res => res));
        }

        deleteTeam(id: string): Observable<any> {
                const _url = this.cs.urlBuilder("/team/" + id);
                const headers = new HttpHeaders(this.cs.headerWithToken());
                return this.http
                    .delete(_url, { headers: headers })
                    .pipe(map(res => res));
        }

        cancelInvite(id: string): Observable<any> {
                const _url = this.cs.urlBuilder("/member/invite/" + id);
                const headers = new HttpHeaders(this.cs.headerWithToken());
                return this.http
                    .delete(_url, { headers: headers })
                    .pipe(map(res => res));
        }

        updateTeam(id: string, data: any): Observable<any> {
                const jsonBody = JSON.stringify(data);
                const _url = this.cs.urlBuilder("/team/" + id);
                const headers = new HttpHeaders(this.cs.headerWithToken());
                return this.http
                    .put(_url, jsonBody, { headers: headers })
                    .pipe(map(res => res));
        }
}
