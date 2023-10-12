export class ErrorModel{
    time: number = Date.now();
    constructor(public errorStatus:string,public errorMessage:string){}
}