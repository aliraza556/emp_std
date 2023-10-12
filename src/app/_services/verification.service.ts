import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import {map} from 'rxjs/operators';

@Injectable()
export class VerificationService {
  constructor(private http: HttpClient, private cs: ConfigService) { }

  verifiyUser(id: string) {
    let str: string = this.cs.urlBuilder(this.cs.verification + id);
    return this.http.get(str).pipe(map((response) => response));
  }
}
