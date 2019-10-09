import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';

@Component({
  selector: 'app-overzicht-aanvragen',
  templateUrl: './overzicht-aanvragen.component.html',
  styleUrls: ['./overzicht-aanvragen.component.scss']
})
export class OverzichtAanvragenComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  public ngOnInit() {}

  public addAanvraag() {
    this.dialog.open(ExampleDialogComponent, {
      height: '400px',
      width: '400px'
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
