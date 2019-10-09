import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { MatChip, MatDialog } from "@angular/material";
import { ExampleDialogComponent } from "../example-dialog/example-dialog.component";
@Component({
  selector: "app-overzicht-aanvragen",
  templateUrl: "./overzicht-aanvragen.component.html",
  styleUrls: ["./overzicht-aanvragen.component.scss"]
})
export class OverzichtAanvragenComponent implements OnInit {
  constructor(private afs: AngularFirestore, public dialog: MatDialog) {}

  public ngOnInit() {}

  public addAanvraag() {
    const dialogRef = this.dialog.open(ExampleDialogComponent, {
      height: "400px",
      width: "400px"
    });
  }
}
