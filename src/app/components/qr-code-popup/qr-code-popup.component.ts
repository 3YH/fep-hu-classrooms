import { Component, Input, OnInit } from '@angular/core';
import { pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AanvraagService } from 'src/app/Services/aanvraag.service';

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

  public ngOnInit() {
  }
  public testGetAanvraag(aanvraagID: string): void {
    this.aanvraagservice.getAanvraagById(aanvraagID)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvragen: Aanvraag[]) => {
        this.myAanvraag = aanvragen[0];
        this.aanvraagString = '{"Aanvraagid":"' + this.myAanvraag.aanvraagId + '", "uid":"' + this.myAanvraag.aanvragerId + '"}';
        console.log(this.aanvraagString);

      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
