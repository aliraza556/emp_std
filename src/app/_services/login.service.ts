import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {ConfigService} from './config.service';

@Injectable()
export class LoginService {

     constructor(private http: HttpClient,private cs:ConfigService) { }

    loginUser(values: { email: any; password: any; }) {
        let body = JSON.stringify(values);
        let headers  = new HttpHeaders(this.cs.headerWithoutToken());
        let _url=this.cs.urlBuilder(this.cs.login);

        return this.http.post(_url, body, { headers: headers }).pipe(map((res: any) => res));
    }
}
