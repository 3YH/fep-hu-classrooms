import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Data } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { QrAanvraag } from 'src/app/models/qrAanvraag';
import { User } from 'src/app/models/user';
import { AanvraagService } from 'src/app/services/aanvraag.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aanvraag-detail',
  templateUrl: './aanvraag-detail.component.html',
  styleUrls: ['./aanvraag-detail.component.scss']
})
export class AanvraagDetailComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();

  public aanvraag: Aanvraag;
  public currentUser: User;
  public userOfAanvraag: User;
  public qrAanvraag: QrAanvraag;
  public toelichting: string = '';

  constructor(
    private dialogRef: MatDialogRef<AanvraagDetailComponent>,
    private aanvraagService: AanvraagService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private data: Data
  ) {}

  public ngOnInit() {
    this.aanvraag = this.data.aanvraag as Aanvraag;
    this.toelichting = this.aanvraag.status.toelichting;

    this.authenticationService
      .getCurrentUserInfo()
      .pipe(
        takeUntil(this.onDestroy$),
        tap((userInfo: User) => {
          this.currentUser = userInfo;
          this.qrAanvraag = {
            userUid: this.currentUser.uid,
            aanvraagId: this.aanvraag.aanvraagId
          } as QrAanvraag;
        })
      )
      .subscribe();

    this.userService
      .getUser(this.aanvraag.aanvragerId)
      .pipe(
        takeUntil(this.onDestroy$),
        map((users: User[]) => users[0])
      )
      .subscribe((user: User) => (this.userOfAanvraag = user));
  }

  public acceptAanvraag(): void {
    this.aanvraag.status.toelichting = this.toelichting;
    this.aanvraag.status.aanvraagStatus = 'ACCEPTED';
    this.aanvraagService.updateAanvraag(this.aanvraag);
    this.dialogRef.close();
  }

  public rejectAanvraag(): void {
    this.aanvraag.status.toelichting =
      this.toelichting === '' || this.toelichting === null
        ? null
        : this.toelichting;
    this.aanvraag.status.aanvraagStatus = 'REJECTED';
    this.aanvraagService.updateAanvraag(this.aanvraag);
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
