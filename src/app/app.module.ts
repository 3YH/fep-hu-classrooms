import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FirebaseConfiguration } from "./config/firebase-configuration";
import { MaterialImportModule } from "./material-import.module";
import { OverzichtAanvragenComponent } from "./overzicht-aanvragen/overzicht-aanvragen.component";
import { AanvragenComponent } from "./aanvragen/aanvragen.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { ExampleDialogComponent } from "./example-dialog/example-dialog.component";
import {
  MatChipsModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    OverzichtAanvragenComponent,
    AanvragenComponent,
    ExampleDialogComponent
  ],
  entryComponents: [ExampleDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule,

    /* Firebase modules */
    AngularFireModule.initializeApp(FirebaseConfiguration),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
