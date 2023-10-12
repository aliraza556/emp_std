import { Injectable } from '@angular/core';
import {ConfigService} from '../config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminService {

  constructor(public cs:ConfigService ,public http:HttpClient) { }


  getAllUsers(): Observable<any>{

    let headers = new HttpHeaders(this.cs.headerWithToken());
    let str=this.cs.urlBuilder('/user');
     return this.http.get(str,{ headers: headers }).pipe(map(response => response));
  }
  getOrgAllUsers():Observable<any>{

    let headers = new HttpHeaders(this.cs.headerWithToken());
    let str=this.cs.urlBuilder('/member/org');
     return this.http.get(str,{ headers: headers }).pipe(map(response => response));
  }
  getTeamsByOrgAllUsers():Observable<any>{
    let headers = new HttpHeaders(this.cs.headerWithToken());
    let str=this.cs.urlBuilder('/team/org');
     return this.http.get(str,{ headers: headers }).pipe(map(response => response));
  }

  getAllUsersRoles():Observable<any>{
    let headers = new HttpHeaders(this.cs.headerWithToken());
    let str=this.cs.urlBuilder('/common/userroles');
     return this.http.get(str,{ headers: headers }).pipe(map(response => response));
  }

  getAllPendingUsers():Observable<any>{
    let headers = new HttpHeaders(this.cs.headerWithToken());
    let str=this.cs.urlBuilder('/member/invite/org');
     return this.http.get(str,{ headers: headers }).pipe(map(response => response));
  }
  getAllPendingInvitesOfTeam(id: any):Observable<any>{
    let headers = new HttpHeaders(this.cs.headerWithToken());
    let str=this.cs.urlBuilder('/member/invite/team/'+id);
     return this.http.get(str,{ headers: headers }).pipe(map(response => response));
  }
  postInvitation(value: any):Observable<any>
  {
    let headers = new HttpHeaders(this.cs.headerWithToken());
    let str=this.cs.urlBuilder('/member/invite');
     return this.http.post(str,value,{ headers: headers }).pipe(map(response => response));

  }

}
