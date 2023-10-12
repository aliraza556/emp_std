import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges, Input } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { DashboardContentService } from '../../../../../_services/dashboard-content.service';
import { AppStatsModel } from '../../../../../_models/AppStats.model';

import { ModalDirective } from 'ng2-bootstrap';
// import * as moment from 'moment';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseChartDirective } from 'ng2-charts/ng2-charts'
@Component({
    selector: 'working-hours',
    templateUrl: './working-hours.component.html',
    providers: [DashboardContentService]

})
export class WorkingHoursComponent {
    @ViewChild(BaseChartDirective) hours_chart: BaseChartDirective | any;
    @Input() wDate1 = [];
    @Input() wDuration1 = [];

    token_value: string | any;
    constructor(private service: DashboardContentService) { }
    // ngOnInit() {
    //     this.getWorkHoursStats();
    // }


    public barChartOptions1: any = {
        scaleShowVerticalLines: true,
        responsive: true,

        tooltips: {
            callbacks: {
                label: function (tooltipItem: { yLabel: any; }) {
                    if (tooltipItem.yLabel >= 60) {
                        let h = Math.floor(tooltipItem.yLabel / 60);
                        let m = tooltipItem.yLabel % 60;
                        if (m != 0)
                            return Number(h) + " h, " + Number(m) + " min";
                        else
                            return Number(h) + " h";
                    }
                    else {
                        return Number(tooltipItem.yLabel) + "  min";
                    }


                }
            }
        },
        scales: {
            yAxes: [{

                ticks: {

                    // fontFamily: "Montserrat",
                    stepSize: 120,
                    reverse: false,
                    min: 0,
                    // max: 600,



                    userCallback: function (value: any) {
                        if (value > 60) {
                            let h = Math.floor(value / 60);
                            let m = value % 60;

                            return Number(Math.floor(h)) + " h ";//+ Number(Math.ceil(m)) + " min"
                        }

                        else {
                            return Math.round((value) * 100) / 100 + "  h";
                        }

                    },


                }
            }]
        },
    };
    public barChartLabels1: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType1: string = 'bar';
    public barChartLegend1: boolean = false;

    public barChartData1: any[] = [
        { data: [0, 0, 0, 0, 0, 0, 0], label: 'Working Hours Statistics' }
    ];
    public chartHovered(e: any): void {

    }

    ngOnChanges(changes: SimpleChanges) {

        this.wDate1 = [];
        this.wDuration1 = [];
        for (let propName in changes) {

            let changedProp = changes[propName];
            if (!changedProp.isFirstChange()) {

                if (propName == 'wDate1') {

                    this.wDate1 = changedProp.currentValue;

                } else if (propName == 'wDuration1') {
                    // let h, m;

                    // if (changedProp.currentValue >= 60) {
                    //     h =changedProp.currentValue / 60;
                    //     m = Math.ceil((changedProp.currentValue) % 60);
                    // }

                    this.wDuration1 = changedProp.currentValue;
                    //e;

                }
                // let clone = JSON.parse(JSON.stringify(this.barChartData1));
                // clone[0].data = this.wDuration1;
                // this.barChartData1 = clone;
                this.barChartData1[0].data = this.wDuration1;


                this.hours_chart.labels = this.wDate1;
                this.hours_chart.ngOnChanges({} as SimpleChanges);


            }

        }

    }




}
