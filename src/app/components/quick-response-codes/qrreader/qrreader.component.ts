import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AanvraagService } from 'src/app/services/aanvraag.service';

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.component.html',
  styleUrls: ['./qrreader.component.scss']
})
export class QrreaderComponent implements OnInit, OnDestroy {
  public onDestroy$: Subject<void> = new Subject<void>();
  public aanvragen: Aanvraag[];
  public selectedAanvraag: Aanvraag;
  public toegang: boolean = false;

  constructor(private aanvraagservice: AanvraagService) {}

  public ngOnInit() {}

  public scanSuccessHandler(e: string): void {
    console.log(e);
    try {
      const input = JSON.parse(e);
      if (input.Aanvraagid != null && input.uid != null) {
        const a = moment().format();
        this.aanvraagservice
          .getAanvraagById(input.Aanvraagid)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((aanvragen: Aanvraag[]) => {
            this.aanvragen = aanvragen;
            if (this.aanvragen != null) {
              this.aanvragen.forEach(aanvraag => {
                if (
                  aanvraag.aanvragerId === input.uid &&
                  moment(aanvraag.startTijd).format() < a &&
                  moment(aanvraag.eindTijd).format() > a
                ) {
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
    } catch (SyntaxError) {
      alert('geen geldige QR!');
    }
  }

  public onSelect(aanvraag: Aanvraag) {
    this.selectedAanvraag = aanvraag;
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
