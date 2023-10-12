import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecoverPasswordService {

    constructor(private http: HttpClient, private cs: ConfigService) { }

    recoverPassword(email: string) {
        let _url = this.cs.urlBuilder('/user/passwd/recover?email=' + email);
        return this.http.get(_url).pipe(map((res: any) => res));
    }

    changePassword(token_value: string, _oldPass: string, _newPass: string) {
        let body = JSON.stringify({ oldPassword: _oldPass, newPassword: _newPass });
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let _url = this.cs.urlBuilder('/user/passwd/reset?token=' + token_value);
        return this.http.post(_url, body, { headers: headers }).pipe(map((response: any) => response));
    }
}
