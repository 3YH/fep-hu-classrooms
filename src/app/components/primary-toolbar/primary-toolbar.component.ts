import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-primary-toolbar',
  templateUrl: './primary-toolbar.component.html',
  styleUrls: ['./primary-toolbar.component.scss']
})
export class PrimaryToolbarComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();

  @Input()
  public title: string;
  private huInnovationLabSite = 'https://sites.google.com/hu.nl/sie-ict';

  public currentUser: User;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.authenticationService
      .getCurrentUserFirebase()
      .pipe(
        takeUntil(this.onDestroy$),
        map(
          (user: User) =>
            (this.currentUser = !isNullOrUndefined(user) ? user : null)
        )
      )
      .subscribe();
  }

  public navigateToHuInnovationLabSite(): void {
    this.document.location.href = this.huInnovationLabSite;
  }

  public async signOut(): Promise<void> {
    await this.authenticationService.signOut();
    this.router.navigateByUrl('login');
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
