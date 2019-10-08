import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { MatChip } from "@angular/material";
@Component({
  selector: "app-overzicht-aanvragen",
  templateUrl: "./overzicht-aanvragen.component.html",
  styleUrls: ["./overzicht-aanvragen.component.scss"]
})
export class OverzichtAanvragenComponent implements OnInit {
  constructor(private afs: AngularFirestore) {}

  public ngOnInit() {}
}
