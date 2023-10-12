// import { Component, OnInit } from '@angular/core';
// import { IMyDpOptions } from "mydatepicker";
// import {any} from 'codelyzer/util/function';
// @Component({
//   selector: 'holiday-picker',
//   templateUrl: './holiday-picker.component.html',
//   styleUrls: ['./holiday-picker.component.css']
// })
// // export class HolidayModel{
// //   public model:{date:{
// //     year:string,
// //     month:string,
// //     day:string
//
// //   },
// //   HolidayTitle:string
// // };
// // }
//
//
// export class HolidayPickerComponent implements OnInit {
//
//   myMessage = '';
//   constructor() {
//     let date = new Date();
//
//
//     this.myDatePickerOptions.disableUntil.year = date.getFullYear();
//     this.myDatePickerOptions.disableUntil.month = date.getMonth() + 1;
//     this.myDatePickerOptions.disableUntil.day = date.getDate() + 1;
//   }
//
//   ngOnInit() {
//   }
//
//
//
//   public myDatePickerOptions: IMyDpOptions = {
//     // other options...
//     dateFormat: 'dd.mm.yyyy',
//     // sunHighlight:false,
//     // satHighlight:true,
//     // firstDayOfWeek:'sat'
//     editableDateField: false,
//     disableUntil: { year: 2016, month: 8, day: 10 }
//
//   };
//   todaydate = new Date()
//   // Initialized to specific date (09.10.2018).
//   public model = { date: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth() + 1, day: this.todaydate.getDate() }, HolidayTitle: '' };
//   dateArray = [];
//   sendForm(m: { HolidayTitle: any; }) {
//
//     let dateRange = [];
//
//     for (let i = 0; i < this.dateArray.length; i++) {
//       dateRange.push(this.dateArray[i].date);
//
//     }
//
//     let holidayPayload = {
//       title: m.HolidayTitle,
//       date: dateRange
//
//     }
//
//     // this.model = { date: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth()+1, day: this.todaydate.getDate() },HolidayTitle:'' };
//   }
//
//   onSubmit(n: any) {
//     if (n != null) {
//       this.dateArray.push(n);
//
//
//       //  for (var i = 0; i < this.dateArray.length; i++)
//       //  {
//
//
//       //  }
//
//     }
//   }
//
// }

import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from "mydatepicker";

interface HolidayModel {
  date: { year: number, month: number, day: number };
  HolidayTitle: string;
}

@Component({
  selector: 'holiday-picker',
  templateUrl: './holiday-picker.component.html',
  styleUrls: ['./holiday-picker.component.css']
})
export class HolidayPickerComponent implements OnInit {
  public model: HolidayModel;
  public myDatePickerOptions: IMyDpOptions;
  public dateArray: Array<{ date: { year: number, month: number, day: number } }> = [];
  public todaydate: Date;

  constructor() {
    this.todaydate = new Date();

    this.myDatePickerOptions = {
      dateFormat: 'dd.mm.yyyy',
      editableDateField: false,
      disableUntil: { year: 0, month: 0, day: 0 }
    };

    this.model = {
      date: {
        year: this.todaydate.getFullYear(),
        month: this.todaydate.getMonth() + 1,
        day: this.todaydate.getDate()
      },
      HolidayTitle: ''
    };

    this.myDatePickerOptions.disableUntil = {
      year: this.todaydate.getFullYear(),
      month: this.todaydate.getMonth() + 1,
      day: this.todaydate.getDate() + 1
    };
  }

  ngOnInit() {}

  sendForm(m: HolidayModel) {
    let dateRange = [];
    for (let i = 0; i < this.dateArray.length; i++) {
      dateRange.push(this.dateArray[i].date);
    }

    let holidayPayload = {
      title: m.HolidayTitle,
      date: dateRange
    }
    // TODO: Use holidayPayload.
  }

  onSubmit(n: { date: { year: number, month: number, day: number }}) {
    if (n !== null) {
      this.dateArray.push(n);
    }
  }
}
