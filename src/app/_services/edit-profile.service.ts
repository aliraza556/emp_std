import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EditProfileService {
    constructor(private http: HttpClient, private cs: ConfigService) {}

    editProfile(userId: string, _fName: string, timezone: string): Observable<any> {
        const body = JSON.stringify({ name: _fName, timezone: timezone });

        // Ensure that headers are set using HttpHeaders
        let headers = new HttpHeaders(this.cs.headerWithToken());
        const _url = this.cs.urlBuilder('/user/profile');

        return this.http.put(_url, body, { headers: headers })
            .pipe(map(response => response));
    }
}
