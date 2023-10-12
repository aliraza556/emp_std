
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class ErrorRegisterService {

    constructor() {

    }
    public em$ = new Subject();
    public popUp$ = new Subject();
    private userName = new BehaviorSubject("");
    currentName = this.userName.asObservable();
    private erList: string[] = [];
    private popUpList: string[] = [];

    public setUserName(userName: string) {
        this.userName.next(userName);
    }

    getPopUpMessages() {
        return this.popUpList;
    }

    UpdatePopUpMessageList(er: string) {
        this.popUp$.next(er);
        this.popUpList.push(er);
    }

    getError() {
        return this.erList;
    }

    updateErrorList(er: string) {
        this.em$.next(er);
        this.erList.push(er);
    }

    deleteNotifications() {
        while (this.erList.length) {
            this.erList.pop();
        }
        while (this.popUpList.length) {
            this.popUpList.pop();
        }

    }

    CompileErrorMessage(error: any, method: string, date: any, component: string) {

        let message = '';
        let alert = 'error';
        let errorTitle = '';

        if (error.status === 0) {
            let body = JSON.parse(error._body);
            message = body.message;;
            // message = 'Unable to connect to Server...!!';
            errorTitle = body.error;;
        } else if (error.status === 500) {
            // message = 'internal server erorr';
            let body = JSON.parse(error._body);
            message = body.message;;
            errorTitle = body.error;;

        } else if (error.status === 400) {
            let body = JSON.parse(error._body);
            message = body.message;;
            errorTitle = body.error;;

        }
        else if (error.status === 401) {
            let body = JSON.parse(error._body);
            message = body.message;
            errorTitle = body.error;

        }
        else if (error.status === 411) {
            let body = JSON.parse(error._body);
            message = body.message;
            errorTitle = body.error;;

        }

        let returnModel = {
            // errorDetail: date + " " + component + " " + method + " " + message + " " + error,
            errorDetail: date +"\n"+  message + "\n" + error,

            errorMessage: message,
            errorAlert: alert,
            errorTitle
        }

        return returnModel;



    }



}
