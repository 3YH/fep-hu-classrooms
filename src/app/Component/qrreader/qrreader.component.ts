import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {QrreaderService} from 'src/app/Services/qrreader.service';

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.component.html',
  styleUrls: ['./qrreader.component.scss']
})

export class QrreaderComponent implements OnInit {
  public aanvragen: Aanvraag[];
  public selectedAanvraag: Aanvraag;
  public toegang: boolean;

  constructor(private qrreaderservice: QrreaderService) {}

  public ngOnInit() {
    this.toegang = false;
    // this.getAanvragen();
  }
   public getAanvragen(): void {
    this.qrreaderservice.getAanvragen()
    .subscribe(aanvragen => this.aanvragen = aanvragen);
  }
  public scanSuccessHandler(e: string) {
    const a = moment().format();
    this.qrreaderservice.getAanvraag(e)
    .subscribe((aanvraag: Aanvraag) => this.selectedAanvraag = aanvraag);
    if (moment(this.selectedAanvraag.startTijd).format() < a && moment(this.selectedAanvraag.eindTijd).format() > a ) {
      this.toegang = true;
     }
  }

  public onSelect(aanvraag: Aanvraag) {
    this.selectedAanvraag = aanvraag;
  }
}
