import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseConfiguration } from './config/firebase-configuration';
import { MaterialImportModule } from './material-import.module';
import { OverzichtAanvragenComponent } from './overzicht-aanvragen/overzicht-aanvragen.component';

@NgModule({
  declarations: [
    AppComponent,
    OverzichtAanvragenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,

    /* Firebase modules */
    AngularFireModule.initializeApp(FirebaseConfiguration),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
