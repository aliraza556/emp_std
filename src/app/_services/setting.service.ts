import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private _http: HttpClient, private cs: ConfigService) { }

  getUserProductivitySettings(id: string) {
    var api = '/member/productivity/' + id;
    let _url = this.cs.urlBuilder(api);
    let headers = new HttpHeaders(this.cs.headerWithToken());
    return this._http.get(_url, { headers: headers }).pipe(map((res: any) => res));
  }

  changeProductivitySettings(id: string, payload: any) {
    let _url = this.cs.urlBuilder(this.cs.productivity(id));
    let headers = new HttpHeaders(this.cs.headerWithToken());
    return this._http.put(_url, payload, { headers: headers }).pipe(map((res: any) => res));
  }
}
