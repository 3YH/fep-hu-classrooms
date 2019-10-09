import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private matSnackBar: MatSnackBar
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authenticationService.getCurrentUserInfo().pipe(
      take(1),
      map((user: User) => !isNullOrUndefined(user)),
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.matSnackBar.open(
            '༼ ºل͟º༼ ºل͟º ༽ºل͟º ༽ºل͟º ༽ Wie ben jij...? (ఠ్ఠ ˓̭ ఠ్ఠ) ༼ ºل ͟ º༼ ºل ͟ º ༽ºل ͟ º ༽ºل͟º ༽',
            '',
            {
              duration: 1500
            }
          );
        }
      })
    );
  }
}
