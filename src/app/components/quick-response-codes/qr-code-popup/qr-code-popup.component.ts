import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AanvraagService } from 'src/app/services/aanvraag.service';

@Component({
  selector: 'app-qr-code-popup',
  templateUrl: './qr-code-popup.component.html',
  styleUrls: ['./qr-code-popup.component.css']
})
export class QrCodePopupComponent implements OnInit, OnDestroy {
  public myAanvraag: Aanvraag;
  public aanvraagString: string;
  public onDestroy$: Subject<void> = new Subject<void>();

  constructor(private aanvraagService: AanvraagService) {}

  public ngOnInit() {}

  public getAanvraag(aanvraagID: string): void {
    this.aanvraagService
      .getAanvraagById(aanvraagID)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvragen: Aanvraag[]) => {
        this.myAanvraag = aanvragen[0];
        this.aanvraagString =
          '{"Aanvraagid":"' +
          this.myAanvraag.aanvraagId +
          '", "uid":"' +
          this.myAanvraag.aanvragerId +
          '"}';
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
