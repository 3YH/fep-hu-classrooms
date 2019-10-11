import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  public mailIsValidated: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  /**
   * Als je ingelogd bent zonder valide HU-mail, dan moet je deze eerst registreren.
   */
  public ngOnInit(): void {
    this.authenticationService.getCurrentUserRole().pipe(
      takeUntil(this.onDestroy$),
      map((userRole: string) => {
        if (userRole === 'scanner') {
          this.router.navigateByUrl('aanvraag-scanner');
        }
        this.ngOnDestroy();
      })
    );
    this.authenticationService
      .isUserHuMailVerified()
      .pipe(
        takeUntil(this.onDestroy$),
        map((isVerified: boolean) => (this.mailIsValidated = isVerified))
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
