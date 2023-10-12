import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { RegisterModel } from '../_models/register.model';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(private http: HttpClient, private cs: ConfigService) { }

    public register(user: any) {
        let body = user;
        let headers = new HttpHeaders(this.cs.headerWithoutToken());
        let _url = this.cs.urlBuilder(this.cs.signup);
        return this.http.post(_url, body, { headers: headers })
            .pipe(map(this.extractData));
    }

    private extractData(res: any) {
        if (res.status == 200) {
            return { "message": "Successfully submitted" };
        } else {
            return res;
        }
    }

    _getTimezoneID() {
        let headers = new HttpHeaders(this.cs.headerWithoutToken());
        let str = this.cs.urlBuilder('/common/timezone');
        return this.http.get(str, { headers: headers }).pipe(map((response: any) => response));
    }
}
