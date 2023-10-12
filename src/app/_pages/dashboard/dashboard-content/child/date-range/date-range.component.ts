
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IMyOptions } from 'mydaterangepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts/ng2-charts'
import moment from 'moment';
import * as decode from 'jwt-decode';
@Component({
    selector: 'date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.css']

})

export class DateRangeComponent implements OnInit {
    @ViewChild(BaseChartDirective) app_chart: BaseChartDirective | any;
    //format = 'L';
    d = new Date();
    public radioModel: string = 'Today';
    day = new Date();
    format = 'x';
    token_value: string | any;
    token_name = 'x-auth-token';
    key = false;
    public myForm: FormGroup | any;
    storedNames: any;
    token: any;
    admin_role: boolean=false;

    constructor(private formBuilder: FormBuilder) {

        if (localStorage.getItem('UTO')) {

            let c: any = JSON.parse(localStorage.getItem('UTO') as string);
            this.storedNames = c;
            this.token = this.storedNames.token;
        }

        let jwt = decode(this.token);
    for (let i = 0; i < jwt.roles.length; i++) {
        if (jwt.roles[i] == 'ROLE_ADMIN') {

          this.admin_role = true;

           break;
        }
    }
    }




    public myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        inline: false,


    };
    selected = false;
    @Output() today: EventEmitter<any> = new EventEmitter<any>();
    @Output() week: EventEmitter<any> = new EventEmitter<any>();
    @Output() month: EventEmitter<any> = new EventEmitter<any>();
    @Output() custom: EventEmitter<any> = new EventEmitter<any>();

    onTodayClick() {
        let todayDate = moment(this.day).format(this.format);

        this.today.emit("today");
        // this.today.emit({ startDate: todayDate, endDate: todayDate });
    }
    onWeekClick() {
        let wStart = moment(this.day).startOf('week').add(1, 'day').format(this.format);
        let wEnd = moment(this.day).endOf('week').add(1, 'day').format(this.format);
        this.week.emit({ startDate: wStart, endDate: wEnd });
        let tr = { startDate: wStart, endDate: wEnd };

    }
    onMonthClick() {
        let mStart = moment(this.day).startOf('month').format(this.format);
        let mEnd = moment(this.day).endOf('month').format(this.format);
        this.month.emit({ startDate: mStart, endDate: mEnd });
        let tr = { startDate: mStart, endDate: mEnd };

    }
    ngOnInit() {
        this.myForm = this.formBuilder.group({
            myDateRange: ['', Validators.required]
        });
    }
    setDateRange(): void {
        // Set date range (today) using the setValue function
        let date = new Date();
        this.myForm.setValue({
            myDateRange: {
                beginDate: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                },
                endDate: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            }
        });
    }

    clearDateRange(): void {
        // Clear the date range using the setValue function
        this.myForm.setValue({ myDateRange: '' });
    }

    onCustomClick(values: any): void {
        let customFormat = "YYYY-MM-DD";
        this.key = false;


        if (this.myForm.valid && (this.myForm.value.myDateRange.beginDate !== null || this.myForm.value.myDateRange.endDate.valid)) {
            let bMonth = this.myForm.value.myDateRange.beginDate.month;
            let bDay = this.myForm.value.myDateRange.beginDate.day;
            let bYear = this.myForm.value.myDateRange.beginDate.year;


            let eMonth = this.myForm.value.myDateRange.endDate.month;
            let eDay = this.myForm.value.myDateRange.endDate.day;
            let eYear = this.myForm.value.myDateRange.endDate.year;

            let sDate = moment(bYear + '-' + bMonth + '-' + bDay).format(customFormat);
            let eDate = moment(eYear + '-' + eMonth + '-' + eDay).format(customFormat);



            this.custom.emit({ startDate: sDate, endDate: eDate, durration: "custom" });

        }
    }

}


