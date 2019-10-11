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
import { map, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WhereClause } from '../../../models/where-clause';
import { AanvraagService } from '../../../services/aanvraag.service';
import { AanvraagFormComponent } from '../aanvraag-form/aanvraag-form.component';

@Component({
  selector: 'app-aanvragen',
  templateUrl: './aanvragen.component.html',
  styleUrls: ['./aanvragen.component.scss']
})
export class AanvragenComponent implements AfterViewInit, OnInit, OnDestroy {
  public onDestroy$: Subject<void> = new Subject<void>();
  public dataSource = new MatTableDataSource();
  public myAanvraag: Aanvraag;
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
  private currentUser: User;

  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;

  constructor(
    private aanvraagService: AanvraagService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.authenticationService
      .getCurrentUserInfo()
      .pipe(
        takeUntil(this.onDestroy$),
        map((userInfo: User) => {
          this.isDocent = userInfo.role === 'docent';
          this.currentUser = userInfo;
        })
      )
      .subscribe(() => this.getFilteredData('REQUESTED'));
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
    if (this.isDocent) {
      this.aanvraagService
        .getAanvragen(filterbyStatus)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          (aanvragen: Aanvraag[]) => {
            this.isLoading = false;
            this.dataSource.data = aanvragen;
          },
          error => (this.isLoading = false)
        );
    } else {
      this.aanvraagService
        .getAanvragenByUserUidByStatus(this.currentUser.uid, filterbyStatus)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          (aanvragen: Aanvraag[]) => {
            this.isLoading = false;
            this.dataSource.data = aanvragen;
          },
          error => (this.isLoading = false)
        );
    }
  }

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
      .subscribe((aanvragen: Aanvraag[]) => {
        aanvragen.forEach((aanvraag: Aanvraag) => {
          this.myAanvraag = aanvraag;
        });
        this.dialog.open(AanvraagFormComponent, {
          height: '550px',
          width: '550px',
          data: {
            AanvraagId: this.myAanvraag.aanvraagId,
            AanvragerId: this.myAanvraag.aanvragerId,
            DocentId: this.myAanvraag.docentId,
            StartTijd: this.myAanvraag.startTijd,
            EindTijd: this.myAanvraag.eindTijd,
            Motivatie: this.myAanvraag.motivatie,
            RuimteId: this.myAanvraag.ruimteId,
            QrCode:
              '{"Aanvraagid":"' +
              this.myAanvraag.aanvraagId +
              '", "uid":"' +
              this.myAanvraag.aanvragerId +
              '"}',
            Status: this.myAanvraag.status.aanvraagStatus,
            Toelichting: this.myAanvraag.status.toelichting
          }
        });
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
