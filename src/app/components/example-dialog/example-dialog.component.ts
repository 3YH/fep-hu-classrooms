import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AanvraagService } from "../../services/aanvraag.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

export interface data {
  AanvraagId?: string;
  DocentId?: string;
  AanvragerId: string;
  RuimteId: string;
  QrCode?: string;
  StartTijd: string;
  EindTijd: string;
  Motivatie: string;
  Status: "REQUESTED" | "ACCEPTED" | "REJECTED";
  Toelichting?: string;
}

@Component({
  selector: "app-example-dialog",
  templateUrl: "./example-dialog.component.html",
  styleUrls: ["./example-dialog.component.scss"]
})
export class ExampleDialogComponent implements OnInit, OnDestroy {
  public onDestroy$: Subject<void> = new Subject<void>();
  public MyAanvraag: Aanvraag;
  constructor(
    public dialogRef: MatDialogRef<ExampleDialogComponent>,
    private aanvraagService: AanvraagService,
    @Inject(MAT_DIALOG_DATA) public data: data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  showButtons() {
    if (this.data.Status === "REQUESTED") {
      return true;
    } else {
      return false;
    }
  }

  aanvraagGoedkeuren(data) {
    // console.log(data);
    this.aanvraagService
      .getAanvraagById(data.AanvraagId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvraag: Aanvraag[]) => {
        aanvraag.forEach(element => {
          this.MyAanvraag = element;
        });
        this.MyAanvraag.status.aanvraagStatus = "ACCEPTED";
        console.log(this.MyAanvraag);
        // this.aanvraagService.updateAanvraag(this.MyAanvraag);
      });
  }

  aanvraagAfkeuren(data) {
    // data.Status = "ACCEPTED";
    // console.log(data);
    this.aanvraagService
      .getAanvraagById(data.AanvraagId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((aanvraag: Aanvraag[]) => {
        aanvraag.forEach(element => {
          this.MyAanvraag = element;
        });
        this.MyAanvraag.status.aanvraagStatus = "REJECTED";
        console.log(this.MyAanvraag);
        // this.aanvraagService.updateAanvraag(this.MyAanvraag);
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
