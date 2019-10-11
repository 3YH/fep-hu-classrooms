import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-mail-registratie-afwachting',
  templateUrl: './mail-registratie-afwachting.component.html',
  styleUrls: ['./mail-registratie-afwachting.component.scss']
})
export class MailRegistratieAfwachtingComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  public currentUser: User;

  constructor(private authenticationService: AuthenticationService) {}

  public ngOnInit() {
    this.authenticationService
      .getCurrentUserInfo()
      .pipe(
        takeUntil(this.onDestroy$),
        tap((userInfo: User) => {
          this.currentUser = userInfo;
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
