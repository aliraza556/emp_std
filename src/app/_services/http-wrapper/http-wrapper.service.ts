import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpWrapperService {

  constructor(private http: HttpClient, private configServic: ConfigService) { }

  get_wrapper(url: string): Observable<any> {
    const headers = new HttpHeaders(this.configServic.headerWithToken());
    return this.http
        .get(url, { headers: headers })
        .pipe(map(res => res));
  }

  post_wrapper(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders(this.configServic.headerWithToken());
    return this.http
        .post(url, body, { headers: headers })
        .pipe(map(res => res));
  }

  delete_wrapper(url: string): Observable<any> {
    const headers = new HttpHeaders(this.configServic.headerWithToken());
    return this.http
        .delete(url, { headers: headers })
        .pipe(map(res => res));
  }

  put_wrapper(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders(this.configServic.headerWithToken());
    return this.http
        .put(url, body, { headers: headers })
        .pipe(map(res => res));
  }
}
