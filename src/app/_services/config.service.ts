import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import moment from 'moment';
import { environment } from '../../environments/environment';
@Injectable()
export class ConfigService {



    token_value = '';
    storedNames: any = JSON.parse(localStorage.getItem("UTO") as string)


    public ip = environment.serverIp;//'13.126.11.59';
    public screenShot = "SCREEN_SHOT_EVENT";
    public webCam = "WEB_CAM_EVENT"
    public dateFormat
    public port = '/epms/api'
    // public UId = 786;
    public login = '/auth/login';
    public signup = '/user/signup';
    public verification = '/user/everification?everification_key=';
    public dashboard = '/timecard/list';
    public editProfile = '/user/profile';

    constructor(private http: HttpClient) {
        this.dateFormat = moment().format("YYYY-MM-DD HH:mm:ss");

        if (localStorage.getItem('UTO')) {
            let c: any = JSON.parse(localStorage.getItem('UTO') as string);

            this.storedNames = c;
        }
    }
    Dahboard(Id: string, date: string) {
        return '/timecard/list/' + Id + '/' + date;
    }
    urlBuilder(api: string) {
        return 'http://' + this.ip + this.port + api;
    }
    headerWithoutToken() {
        return new Headers({ 'Content-Type': 'application/json' });
    }

    headerWithToken() {
        if (localStorage.getItem('UTO')) {
            let c: any = JSON.parse(localStorage.getItem('UTO') as string);

            this.storedNames = c;
            this.token_value = this.storedNames.token;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('x-auth-token', this.token_value);
        return headers;
    }


    headerWithVerification() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return headers;
    }

    productivity(id: string) {
        return '/member/productivity' + '/' + id
    }

    userInfo(id: string) {
        return '/timecard/list/' + id;
    }

    public applicationStats = '/dashboard/' + 1 + '/application/stats';
    public workingHoursStats = 'dashboard/' + 1 + '/workinghours/stats';

    public TotalWorkingMintes(userId: string) {
        return '/dashboard/' + userId + '/summary';
    }

    public ApplicationStats(userId: string) {

        return '/dashboard/' + userId + '/application/stats';
    }

    public WorkingHoursStats(userId: string) {

        return '/dashboard/' + userId + '/workinghours/stats';
    }

    public ChangePassword(userId: string) {
        return '/user/' + userId + '/changepassword'
    }

    public getOrganizationById(id: string) {
        return '/org/' + id;

    }

    getfinalTime(time: any) {
        let i = '+';
        if (time < 0) {
            i = '-'
            time = Math.abs(time);
        }
        let h: any = Math.floor(time / 60);
        let m: any = time % 60;
        if (h >= 100)
            var formattedHours = ("0" + h).slice(-3);
        else
            formattedHours = ("0" + h).slice(-2);


        var formattedMiints = ("0" + m).slice(-2);
        if (i == '-') {
            return i + ' ' + formattedHours + ':' + formattedMiints;
        } else
            return formattedHours + ':' + formattedMiints;

    }

    // public setUserId(id) {
    //     this.UId = id;

    // }
    // public getUserId() {
    //     return this.UId;
    // }
}
