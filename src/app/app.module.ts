import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxKjuaModule } from 'ngx-kjua';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrCodePopupComponent } from './Component/qr-code-popup/qr-code-popup.component';
import { QrreaderComponent } from './Component/qrreader/qrreader.component';
import { FirebaseConfiguration } from './config/firebase-configuration';
import { MaterialImportModule } from './material-import.module';

@NgModule({
  declarations: [
    AppComponent,
    QrreaderComponent,
    QrCodePopupComponent,
  ],
  imports: [
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
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    QrCodePopupComponent,
  ],
})
export class AppModule { }
