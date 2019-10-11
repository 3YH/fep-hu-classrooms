import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { DashboardComponent } from './components/navigation/dashboard/dashboard.component';
import { QrreaderComponent } from './components/quick-response-codes/qrreader/qrreader.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { QrReaderGuard } from './guards/qr-reader.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'aanvraag-scanner',
    component: QrreaderComponent,
    canActivate: [QrReaderGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
