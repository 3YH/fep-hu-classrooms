import { Component, OnInit, Input } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { AanvraagService } from 'src/app/Services/aanvraag.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-qr-code-popup',
  templateUrl: './qr-code-popup.component.html',
  styleUrls: ['./qr-code-popup.component.css']
})
export class QrCodePopupComponent implements OnInit {
  public myAanvraag: Aanvraag;
  public aanvraagString: string;
  public onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private aanvraagservice: AanvraagService
  ) { }

  ngOnInit() {
  }
  public testGetAanvraag(): void {
    this.aanvraagservice.getAanvraagById('213')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvragen: Aanvraag[]) => {
        this.myAanvraag = aanvragen[0];
        this.aanvraagString = '{"Aanvraagid":"' + this.myAanvraag.aanvraagId + '", "uid":"' + this.myAanvraag.aanvragerId + '"}';
        console.log(this.aanvraagString);

      });
  }

  public generateQR(): void {
    this.testGetAanvraag();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
