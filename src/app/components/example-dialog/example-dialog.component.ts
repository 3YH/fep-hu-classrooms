import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AanvraagService } from '../../services/aanvraag.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

export interface data {
  AanvraagId?: string;
  DocentId?: string;
  AanvragerId: string;
  RuimteId: string;
  QrCode?: string;
  StartTijd: string;
  EindTijd: string;
  Motivatie: string;
  Status: 'REQUESTED' | 'ACCEPTED' | 'REJECTED';
  Toelichting?: string;
}

@Component({
  selector: 'app-example-dialog',
  templateUrl: './example-dialog.component.html',
  styleUrls: ['./example-dialog.component.scss']
})
export class ExampleDialogComponent implements OnInit, OnDestroy {
  public onDestroy$: Subject<void> = new Subject<void>();
  public MyAanvraag: Aanvraag;
  public aanvraagString: string;
  public isDocent = false;
  constructor(
    public dialogRef: MatDialogRef<ExampleDialogComponent>,
    private aanvraagService: AanvraagService,
    private authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: data
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit() {}

  public showButtons(): boolean {
    if (this.data.Status === 'REQUESTED') {
      return true;
    } else {
      return false;
    }
  }
  public checkStatus(): boolean {
    if (this.data.Status === 'ACCEPTED') {
      this.generateQRString(this.data.AanvraagId);
      return true;
    } else {
      return false;
    }
  }

  public aanvraagGoedkeuren(data) {
    // console.log(data);
    this.aanvraagService
      .getAanvraagById(data.AanvraagId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvraag: Aanvraag[]) => {
        aanvraag.forEach(element => {
          this.MyAanvraag = element;
        });
        this.MyAanvraag.status.aanvraagStatus = 'ACCEPTED';
        console.log(this.MyAanvraag);
        // this.aanvraagService.updateAanvraag(this.MyAanvraag);
      });
  }

  public aanvraagAfkeuren(data) {
    // data.Status = "ACCEPTED";
    // console.log(data);
    this.aanvraagService
      .getAanvraagById(data.AanvraagId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvraag: Aanvraag[]) => {
        aanvraag.forEach(element => {
          this.MyAanvraag = element;
        });
        this.MyAanvraag.status.aanvraagStatus = 'REJECTED';
        console.log(this.MyAanvraag);
        // this.aanvraagService.updateAanvraag(this.MyAanvraag);
      });
  }

  public generateQRString(aanvraagID: string) {
    this.aanvraagService
      .getAanvraagById(aanvraagID)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvragen: Aanvraag[]) => {
        this.MyAanvraag = aanvragen[0];
        this.aanvraagString =
          '{"Aanvraagid":"' +
          this.MyAanvraag.aanvraagId +
          '", "uid":"' +
          this.MyAanvraag.aanvragerId +
          '"}';
      });
  }

  public hasRole() {
    return this.authenticationService
      .getCurrentUserInfo()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((user: User) => {
        user.role === 'docent' && (this.isDocent = true);
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
