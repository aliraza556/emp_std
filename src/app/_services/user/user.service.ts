import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  addNewUser(data: any, key: string, email: string): Observable<any> {
    const jsonBody = JSON.stringify(data);
    const _url = this.cs.urlBuilder(`/member/signup?invite_key=${key}&email=${email}`);

    const headers = new HttpHeaders(this.cs.headerWithVerification());
    return this.http
        .post(_url, jsonBody, { headers: headers })
        .pipe(map(res => res));
  }
}
