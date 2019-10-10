import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.authenticationService.getCurrentUserInfo().subscribe((user: User) => {
      if (!isNullOrUndefined(user)) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  /**
   * Er wordt een Google Authentication modal als pop-up geopend om in te loggen.
   */
  public async signIn(): Promise<void> {
    if (await this.authenticationService.signInWithGoogleAccount()) {
      await this.router.navigateByUrl('dashboard');
    }
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
