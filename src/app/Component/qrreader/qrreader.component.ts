import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, timeInterval } from 'rxjs/operators';
import { AanvraagService } from 'src/app/Services/aanvraag.service';
import { QrreaderService } from 'src/app/Services/qrreader.service';
import { QrCodePopupComponent } from '../qr-code-popup/qr-code-popup.component';

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.component.html',
  styleUrls: ['./qrreader.component.scss']
})

export class QrreaderComponent implements OnInit {
  public onDestroy$: Subject<void> = new Subject<void>();
  public aanvragen: Aanvraag[];
  public selectedAanvraag: Aanvraag;
  public toegang: boolean;

  constructor(
    private qrreaderservice: QrreaderService,
    private snackbar: MatSnackBar,
    private aanvraagservice: AanvraagService
  ) { }

  public ngOnInit() {
    this.toegang = null;
    // this.getAanvragen();
  }
  public getAanvragen(): void {
    this.qrreaderservice.getAanvragen()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvragen: Aanvraag[]) => {
        this.aanvragen = aanvragen;
      });
  }

  public scanSuccessHandler(e: string): void {
    console.log(e);
    const input = JSON.parse(e);
    console.log(input.Aanvraagid);
    console.log(input.uid);
    if (input.Aanvraagid != null && input.uid != null) {
      const a = moment().format();
      this.aanvraagservice.getAanvraagByUserUid(input.uid)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((aanvragen: Aanvraag[]) => {
          this.aanvragen = aanvragen;
          if (this.aanvragen != null) {
            this.aanvragen.forEach(aanvraag => {
              if (aanvraag.aanvraagId === input.Aanvraagid
                && moment(aanvraag.startTijd).format() < a
                && moment(aanvraag.eindTijd).format() > a) {
                this.selectedAanvraag = aanvraag;
                this.toegang = true;

              } else {
                this.toegang = false;
              }
              console.log(this.toegang);
            });
          }
        });
    }
  }

  public onSelect(aanvraag: Aanvraag) {
    this.selectedAanvraag = aanvraag;
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // public openSomething(): void {
  //   this.snackbar.openFromComponent(
  //     QrCodePopupComponent, {
  //     duration: -1
  //   }
  //   );
  // }
}
