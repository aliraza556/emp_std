
import { DashboardService } from '../../../../../_services/dashboard.service';
import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges, Input, OnChanges, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DashboardContentService } from '../../../../../_services/dashboard-content.service';
import { AppStatsModel } from '../../../../../_models/AppStats.model';
import { ModalDirective } from 'ng2-bootstrap';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseChartDirective } from 'ng2-charts/ng2-charts'
@Component({
  selector: 'app-stats',
  templateUrl: './app-stats.component.html',
  providers: [DashboardContentService],

})
export class ApplicationStatsComponent implements OnChanges {

  @ViewChild(BaseChartDirective) app_chart: BaseChartDirective | any;

  @Input('defaultLabel') label1: string[] | any;
  @Input('defaultValue') value1: string | any[] | any;
  myMessage = '';
  token_value: string | any;
  token_name = 'x-auth-token';
  i = 0;
  public timecards: any;
  //bar chart start application stats
  public AppChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem: { xLabel: any; }) {
          if (tooltipItem.xLabel >= 60) {
            let h = Math.floor(tooltipItem.xLabel / 60);
            let m = tooltipItem.xLabel % 60;
            if (m != 0)
              return Number(h) + " h, " + Number(m) + " min";
            else
              return Number(h) + " h";

          }
          else {
            return Number(tooltipItem.xLabel) + "  min";
          }


        }
      }
    },
    scales: {

      xAxes: [
        {
          ticks: {

            stepSize: 60,
            reverse: false,
            min: 0,
            // max: 600,



            userCallback: function (value: any) {
              if (value >= 60) {
                let h = Math.floor(value / 60);
                let m = value % 60;

                if (m != 0)
                  return Number(Math.floor(h)) + "  h, " + Number(Math.ceil(m)) + "  min";
                else
                  return Number(Math.floor(h)) + "  h";

                // return Number(Math.floor(h)) + "  h, " + Number(Math.ceil(m)) + "  min";
              }

              else {
                return Math.round((value) * 100) / 100 + "  min";
              }
            },


          }
        }
      ]
    },
  };

  public AppChartLabels: string[] = ['App 1', 'App 2', 'App 3', 'App 4', 'App 5'];

  //public barChartLabels=this.appStatsData[1].processName;
  public AppChartType: string = 'bar';
  public AppChartLegend: boolean = false;

  public AppChartData: any[] = [

    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Application Statistics' },

    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  @ViewChild('staticModal') public staticModal: ModalDirective | any;

  constructor(private service: DashboardContentService, private _service: DashboardService, private router: Router) { }
  ngOnInit() {
    this.AppChartLabels = this.label1;
    this.AppChartData[0].data = this.value1;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.label1 = [];
    this.value1 = [];

    for (let propName in changes) {
      let changedProp = changes[propName];
      if (!changedProp.isFirstChange()) {
        if (propName == 'label1') {

          this.label1 = changedProp.currentValue;
          this.app_chart.labels = this.label1;

        } else if (propName == 'value1') {

          this.value1 = changedProp.currentValue;

          if (this.value1.length == 0)
            this.AppChartData[0].data = [0, 60, 120, 240, 480];
          else
            this.AppChartData[0].data = this.value1;


          // this.value1 = changedProp.currentValue;
          // this.AppChartData[0].data = this.value1;

        }
        this.app_chart.ngOnChanges({} as SimpleChanges);



      }

    }

  }

}

