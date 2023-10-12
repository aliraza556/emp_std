import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ChangePasswordService {

    constructor(private http: HttpClient, private cs: ConfigService) { }

    changePassword(
        userId: string,
        _oldPass: string,
        _newPass: string,
        tName: string,
        tValue: string
    ): Observable<any> {
        const body = JSON.stringify({ oldPassword: _oldPass, newPassword: _newPass });
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' }).set('x-auth-token', tValue);
        const _url = this.cs.urlBuilder('/user/changepassword');

        return this.http.post(_url, body, { headers: headers })
            .pipe(map(response => response));
    }
}
