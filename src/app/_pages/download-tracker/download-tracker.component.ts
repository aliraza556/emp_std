import { Component, OnInit } from '@angular/core';
import { DownloadTrackerService } from './download-tracker.service';
import { ConfigService } from '../../_services/config.service';

@Component({
  selector: 'app-download-tracker',
  templateUrl: './download-tracker.component.html',
  styleUrls: ['./download-tracker.component.css']
})
export class DownloadTrackerComponent implements OnInit {
  successTrigger = false;
  errorTrigger = false;
  myMessage: string = '';


  ip = this.cs.ip;
  port = this.cs.port;
  trackerVersion: any = '';
  constructor(private dts: DownloadTrackerService, private cs: ConfigService) { }

  ngOnInit() {
    this.getTrackerVersion();
  }
  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }

  getTrackerVersion() {
    this.dts.getTrackerVersion().subscribe((data: any) => {

      var d: any = data
      this.trackerVersion = d.data.currentVersion;
    }, (error: any) => {
      this.myMessage = "An error occurred while fetching tracker version.";
      this.errorTrigger = true;
    });

  }


}
