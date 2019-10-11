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
import { AanvraagDetailComponent } from './components/aanvraag-components/aanvraag-detail/aanvraag-detail.component';
import { AanvraagFormComponent } from './components/aanvraag-components/aanvraag-form/aanvraag-form.component';
import { AanvragenComponent } from './components/aanvraag-components/aanvragen/aanvragen.component';
import { OverzichtAanvragenComponent } from './components/aanvraag-components/overzicht-aanvragen/overzicht-aanvragen.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { MailRegistratieComponent } from './components/mail/mail-registratie/mail-registratie.component';
import { DashboardComponent } from './components/navigation/dashboard/dashboard.component';
import { PrimaryToolbarComponent } from './components/navigation/primary-toolbar/primary-toolbar.component';
import { QrreaderComponent } from './components/quick-response-codes/qrreader/qrreader.component';
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
    AanvragenComponent,
    AanvraagFormComponent,
    QrreaderComponent,
    AanvraagDetailComponent
  ],
  entryComponents: [AanvraagFormComponent, AanvraagDetailComponent],
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
