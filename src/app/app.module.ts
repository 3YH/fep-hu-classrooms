import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AanvragenComponent } from './aanvragen/aanvragen.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MailRegistratieComponent } from './components/mail-registratie/mail-registratie.component';
import { OverzichtAanvraagComponent } from './components/overzicht-aanvraag/overzicht-aanvraag.component';
import { PrimaryToolbarComponent } from './components/primary-toolbar/primary-toolbar.component';
import { FirebaseConfiguration } from './config/firebase-configuration';
import { ExampleDialogComponent } from './example-dialog/example-dialog.component';
import { MaterialImportModule } from './material-import.module';
import { OverzichtAanvragenComponent } from './overzicht-aanvragen/overzicht-aanvragen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrimaryToolbarComponent,
    MailRegistratieComponent,
    DashboardComponent,
    OverzichtAanvraagComponent,
    OverzichtAanvragenComponent,
    AanvragenComponent,
    ExampleDialogComponent
  ],
  entryComponents: [ExampleDialogComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,

    /* Firebase modules */
    AngularFireModule.initializeApp(FirebaseConfiguration),
    AngularFireAuthModule,
    AngularFirestoreModule,

    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
