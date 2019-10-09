import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Inject
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AanvraagService } from "../services/aanvraag.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatChip } from "@angular/material";
import { WhereClause } from "../models/where-clause";
import { MatDialog } from "@angular/material/dialog";
import { exampledialogComponent } from "../example-dialog/example-dialog.component";

@Component({
  selector: "app-aanvragen",
  templateUrl: "./aanvragen.component.html",
  styleUrls: ["./aanvragen.component.scss"]
})
export class AanvragenComponent implements AfterViewInit, OnInit {
  public onDestroy$: Subject<void> = new Subject<void>();
  public dataSource = new MatTableDataSource();
  public displayedColumns = [
    "index",
    "aanvragerId",
    "startTijd",
    "eindTijd",
    "aanvraagStatus"
  ];
  public isLoading = true;
  public members;

  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;

  constructor(
    private aanvraagService: AanvraagService,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.getFilteredData("REQUESTED");
  }

  public filterByStatus(chip: MatChip, status: string) {
    chip.toggleSelected();
    if (chip.selected) {
      this.getFilteredData(status);
    } else {
      return this.aanvraagService
        .getAanvragen()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          res => {
            this.isLoading = false;
            this.dataSource.data = res;
          },
          error => (this.isLoading = false)
        );
    }
  }

  private getFilteredData(status?: string) {
    const filterbyStatus: WhereClause = {
      fieldPath: "status.aanvraagStatus",
      operator: "==",
      value: status
    };
    return this.aanvraagService
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
  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public selectAanvraag() {
    const dialogRef = this.dialog.open(exampledialogComponent, {
      height: "400px",
      width: "400px"
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
