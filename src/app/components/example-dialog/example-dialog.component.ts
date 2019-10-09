import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

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
export class ExampleDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
