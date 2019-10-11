import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { QrAanvraag } from 'src/app/models/qrAanvraag';
import { Scanner } from 'src/app/models/scanner';
import { User } from 'src/app/models/user';
import { AanvraagService } from 'src/app/services/aanvraag.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.component.html',
  styleUrls: ['./qrreader.component.scss']
})
export class QrreaderComponent implements OnInit, OnDestroy {
  public onDestroy$: Subject<void> = new Subject<void>();
  public selectedAanvraag: Aanvraag;
  public toegang: boolean = false;
  public currentRuimte: string;
  public backgroundColor: string;

  constructor(
    private aanvraagservice: AanvraagService,
    private authenticationService: AuthenticationService,
    private matSnackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.authenticationService
      .getCurrentUserInfo()
      .pipe(
        takeUntil(this.onDestroy$),
        map(
          (scannerInfo: User) =>
            (this.currentRuimte = (scannerInfo as Scanner).beheerdeRuimtes[0])
        )
      )
      .subscribe();
  }

  public scanSuccessHandler(scannedQrCode: string): void {
    let aanvraagInput: QrAanvraag;
    try {
      aanvraagInput = JSON.parse(scannedQrCode) as QrAanvraag;

      if (aanvraagInput.aanvraagId != null && aanvraagInput.userUid != null) {
        const currentTime = moment().format();
        this.aanvraagservice
          .getAanvraagById(aanvraagInput.aanvraagId)
          .pipe(
            take(1),
            takeUntil(this.onDestroy$)
          )
          .subscribe((aanvragen: Aanvraag[]) => {
            if (!isNullOrUndefined(aanvragen) && aanvragen.length > 0) {
              aanvragen.forEach((aanvraag: Aanvraag) => {
                if (aanvraag.aanvragerId === aanvraagInput.userUid) {
                  if (
                    moment(aanvraag.startTijd).format() < currentTime &&
                    moment(aanvraag.eindTijd).format() > currentTime
                  ) {
                    this.selectedAanvraag = aanvraag;
                    this.toegang = true;
                    this.backgroundColor = 'green';
                    setTimeout(() => {
                      this.backgroundColor = '#e5e5e5';
                    }, 3000);
                  } else if (
                    moment(aanvraag.startTijd).format() < currentTime
                  ) {
                    this.backgroundColor = 'red';
                    this.displayErrorMessage(
                      'Je afspraak is verlopen. (•ิ_•ิ)?'
                    );
                  } else {
                    this.backgroundColor = 'orange';
                    this.displayErrorMessage(
                      `Je afspraak is nog niet begonnen. ヽ/❀o ل͜ o\\ﾉ`
                    );
                  }
                } else {
                  this.backgroundColor = 'red';
                  this.displayErrorMessage(
                    'Jij bent niet de eigenaar van deze afspraak'
                  );
                }
              });
            }
          });
      }
    } catch (error) {
      this.backgroundColor = 'red';
      this.displayErrorMessage(
        ' (┛❍ᴥ❍)┛彡┻━┻ De QR-code die je probeert te scannen is ongeldig'
      );
    }
  }

  private displayErrorMessage(errorMessage: string): void {
    this.matSnackBar.open(errorMessage, null, {
      duration: 3000
    });
    setTimeout(() => {
      this.backgroundColor = '#e5e5e5';
    }, 3000);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
