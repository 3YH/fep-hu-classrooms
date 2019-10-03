import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatExpansionModule
} from '@angular/material/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseConfiguration } from './config/firebase-configuration';
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

    /* Firebase modules */
    AngularFireModule.initializeApp(FirebaseConfiguration),
    AngularFirestoreModule,

    /* Material modules */
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
