import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxKjuaModule } from 'ngx-kjua';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AanvragenComponent } from './components/aanvragen/aanvragen.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExampleDialogComponent } from './components/example-dialog/example-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { MailRegistratieComponent } from './components/mail-registratie/mail-registratie.component';
import { OverzichtAanvragenComponent } from './components/overzicht-aanvragen/overzicht-aanvragen.component';
import { PrimaryToolbarComponent } from './components/primary-toolbar/primary-toolbar.component';
import { QrCodePopupComponent } from './components/qr-code-popup/qr-code-popup.component';
import { QrreaderComponent } from './components/qrreader/qrreader.component';
import { FirebaseConfiguration } from './config/firebase-configuration';
import { MaterialImportModule } from './material-import.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrimaryToolbarComponent,
    MailRegistratieComponent,
    DashboardComponent,
    OverzichtAanvragenComponent,
    QrCodePopupComponent,
    ExampleDialogComponent,
    AanvragenComponent,
    AanvraagFormComponent,
    QrreaderComponent
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
    ZXingScannerModule,
    NgxKjuaModule,

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
