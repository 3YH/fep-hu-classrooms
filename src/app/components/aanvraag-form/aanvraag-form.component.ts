import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { kwartierIncrements } from 'src/app/models/kwartierIncrements';
import { Ruimte } from 'src/app/models/ruimte';
import { User } from 'src/app/models/user';
import { AanvraagService } from 'src/app/services/aanvraag.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RuimteService } from 'src/app/services/ruimte.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-aanvraag-form',
  templateUrl: './aanvraag-form.component.html',
  styleUrls: ['./aanvraag-form.component.scss']
})
export class AanvraagFormComponent implements OnInit, OnDestroy {
  public onDestroy$: Subject<void> = new Subject<void>();
  public kwartieren: string[] = [];
  public beschikbareRuimtes: Observable<Ruimte[]>;

  public dateToday: Date = new Date(Date.now());

  public aanvraagForm: FormGroup;

  public currentUserUID: string;

  public ruimteIdControl: FormControl;
  public datumControl: FormControl;
  public startTijdControl: FormControl;
  public eindTijdControl: FormControl;
  public motivatieControl: FormControl;
  public docentVanRuimte: User;

  constructor(
    private formBuilder: FormBuilder,
    private ruimteService: RuimteService,
    private authenticationService: AuthenticationService,
    private aanvraagService: AanvraagService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.kwartieren = kwartierIncrements;
    this.initializeForm();

    this.authenticationService
      .getCurrentUserInfo()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((userInfo: User) => (this.currentUserUID = userInfo.uid));

    this.beschikbareRuimtes = this.ruimteService
      .getRuimtes()
      .pipe(takeUntil(this.onDestroy$));
  }

  private initializeForm(): void {
    this.ruimteIdControl = new FormControl('', Validators.required);
    this.startTijdControl = new FormControl('', Validators.required);
    this.eindTijdControl = new FormControl('', Validators.required);
    this.motivatieControl = new FormControl('', Validators.required);
    this.datumControl = new FormControl('', Validators.required);

    this.aanvraagForm = this.formBuilder.group({
      ruimteId: this.ruimteIdControl,
      datum: this.datumControl,
      startTijd: this.startTijdControl,
      eindTijd: this.eindTijdControl,
      motivatie: this.motivatieControl
    });

    this.ruimteIdControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.ruimteService
          .getDocentVanRuimte(
            !isNullOrUndefined(this.ruimteIdControl.value as string)
              ? (this.ruimteIdControl.value as string)
              : ''
          )
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((user: User) => {
            this.docentVanRuimte = user;
          });
      });
  }

  public submitAanvraag(): void {
    const aanvraag: Aanvraag = {
      aanvragerId: this.currentUserUID,
      docentId: this.docentVanRuimte.uid,
      motivatie: this.motivatieControl.value as string,
      status: {
        aanvraagStatus: 'REQUESTED'
      },
      ruimteId: this.ruimteIdControl.value as string,
      startTijd: this.formatTimeStamp(
        this.startTijdControl.value as string,
        this.datumControl.value as Date
      ),
      eindTijd: this.formatTimeStamp(
        this.eindTijdControl.value as string,
        this.datumControl.value as Date
      )
    } as Aanvraag;

    this.aanvraagService.addAanvraag(aanvraag).then(() => {
      this.matSnackBar.open('De aanvraag is toegevoegd', null, {
        duration: 2000
      });
      this.dialog.closeAll();
    });
  }

  private formatTimeStamp(tijd: string, datum: Date): string {
    const dateTime = moment(
      datum.getUTCDay() +
        '-' +
        datum.getUTCMonth() +
        '-' +
        datum.getUTCFullYear() +
        ' ' +
        tijd +
        ':00'
    );

    return dateTime.format('YYYY-MM-DD HH:mm');
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
