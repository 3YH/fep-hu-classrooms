import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QrReaderGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authenticationService.getCurrentUserInfo().pipe(
      map((user: User) => user.role === 'scanner'),
      tap((isScanner: boolean) => {
        if (!isScanner) {
          this.router.navigateByUrl('login');
        }
      })
    );
  }
}
