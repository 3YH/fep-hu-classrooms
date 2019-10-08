import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AanvraagService} from '../services/aanvraag.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatChip } from '@angular/material';

@Component({
  selector: 'app-aanvragen',
  templateUrl: './aanvragen.component.html',
  styleUrls: ['./aanvragen.component.scss']
})
export class AanvragenComponent implements AfterViewInit, OnInit {
  public onDestroy$: Subject<void> = new Subject<void>();
  public displayedColumns = ['aanvraagId', 'docentId', 'aanvraagStatus'];
  public dataSource = new MatTableDataSource();
  public isLoading = true;
  public members;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  private statusFilter$ = new Subject<string>();

  constructor(private aanvraagService: AanvraagService) { }

  public ngOnInit() {
  this.getData();
  }

  private getData() {
    return this.aanvraagService.getAanvragen()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(res => {
      this.isLoading = false;
      this.dataSource.data = res;
    },
    error => this.isLoading = false
      );
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public filterByStatus(chip: MatChip, status: string) {
    chip.toggleSelected();
    console.log(chip);
    if (chip.selected) {
      
    } else {
      this.getData();
    }
  }

  private applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
    }
}
