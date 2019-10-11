import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { AanvraagFormComponent } from '../aanvraag-form/aanvraag-form.component';

@Component({
  selector: 'app-overzicht-aanvragen',
  templateUrl: './overzicht-aanvragen.component.html',
  styleUrls: ['./overzicht-aanvragen.component.scss']
})
export class OverzichtAanvragenComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  public ngOnInit(): void {}

  public addAanvraag(): void {
    this.dialog.open(AanvraagFormComponent, {
      width: '400px'
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
