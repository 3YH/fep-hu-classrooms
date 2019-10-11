import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatChip } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WhereClause } from '../../models/where-clause';
import { AanvraagService } from '../../services/aanvraag.service';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';

@Component({
  selector: 'app-aanvragen',
  templateUrl: './aanvragen.component.html',
  styleUrls: ['./aanvragen.component.scss']
})
export class AanvragenComponent implements AfterViewInit, OnInit, OnDestroy {
  public onDestroy$: Subject<void> = new Subject<void>();
  public dataSource = new MatTableDataSource();
  public MyAanvraag: Aanvraag;
  public displayedColumns = [
    'index',
    'aanvragerId',
    'startTijd',
    'eindTijd',
    'aanvraagStatus'
  ];
  public isLoading = true;
  public members;
  public isDocent = false;

  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;

  constructor(
    private aanvraagService: AanvraagService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getFilteredData('REQUESTED');
  }

  public filterByStatus(chip: MatChip, status: string): void {
    chip.toggleSelected();
    if (chip.selected) {
      this.getFilteredData(status);
    } else {
      this.aanvraagService
        .getAanvragen()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          (result: Aanvraag[]) => {
            this.isLoading = false;
            this.dataSource.data = result;
          },
          error => (this.isLoading = false)
        );
    }
  }

  private getFilteredData(status?: string): void {
    const filterbyStatus: WhereClause = {
      fieldPath: 'status.aanvraagStatus',
      operator: '==',
      value: status
    };
    this.aanvraagService
      .getAanvragen(filterbyStatus)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        res => {
          this.isLoading = false;
          this.dataSource.data = res;
        },
        error => (this.isLoading = false)
      );
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public selectAanvraag(id: string) {
    this.aanvraagService
      .getAanvraagById(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvraag: Aanvraag[]) => {
        aanvraag.forEach(element => {
          this.MyAanvraag = element;
        });
        this.dialog.open(ExampleDialogComponent, {
          height: '550px',
          width: '550px',
          data: {
            AanvraagId: this.MyAanvraag.aanvraagId,
            AanvragerId: this.MyAanvraag.aanvragerId,
            DocentId: this.MyAanvraag.docentId,
            StartTijd: this.MyAanvraag.startTijd,
            EindTijd: this.MyAanvraag.eindTijd,
            Motivatie: this.MyAanvraag.motivatie,
            RuimteId: this.MyAanvraag.ruimteId,
            QrCode: this.MyAanvraag.qrCode,
            Status: this.MyAanvraag.status.aanvraagStatus,
            Toelichting: this.MyAanvraag.status.toelichting
          }
        });
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
