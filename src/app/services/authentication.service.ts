import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth, User as FirebaseUser } from 'firebase';
import { Observable, Subject } from 'rxjs';
import { flatMap, map, take, takeUntil, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private firebaseAuthentication: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {
    this.firebaseAuthentication.authState
      .pipe(
        tap((user: firebase.User) => {
          if (isNullOrUndefined(user)) {
            this.router.navigateByUrl('login');
          }
        })
      )
      .subscribe();
  }

  /**
   * Er wordt een Google Authentication modal als pop-up geopend om in te loggen.
   *
   * Ook wordt er, als deze nog niet bestaat, een nieuwe user met dit UID aan de database toegevoegd.
   *
   * Hierna wordt, o.b.v. of de poging succesvol was, de gebruiker doorgestuurd naar de hoofdpagina.
   */
  public async signInWithGoogleAccount(): Promise<boolean> {
    const isLoggedInSuccessfully: boolean = !isNullOrUndefined(
      await this.firebaseAuthentication.auth.signInWithPopup(
        new auth.GoogleAuthProvider()
      )
    );

    this.userService
      .getUser(this.firebaseAuthentication.auth.currentUser.uid)
      .pipe(
        takeUntil(this.onDestroy$),
        take(1)
      )
      .subscribe((user: User[]) => {
        if (isNullOrUndefined(user[0])) {
          this.addCurrentUser();
        }
      });
    return isLoggedInSuccessfully;
  }

  /**
   * Voegt een nieuwe gebruiker toe aan de users collectie.
   */
  public addCurrentUser(): void {
    this.firebaseAuthentication.user
      .pipe(
        takeUntil(this.onDestroy$),
        take(1),
        tap((firebaseUser: firebase.User) =>
          this.userService.addUser(firebaseUser.uid)
        )
      )
      .subscribe();
  }

  /**
   * De huidige gebruiker wordt uitgelogd.
   */
  public async signOut(): Promise<void> {
    await this.firebaseAuthentication.auth.signOut();
  }

  /**
   * Returned de userInfo van de gebruiker die momenteel is ingelogd.
   */
  public getCurrentUserInfo(): Observable<User> {
    return this.getCurrentUserUID()
      .pipe(
        map((userUid: string) =>
          this.userService.getUser(userUid).pipe(
            take(1),
            takeUntil(this.onDestroy$),
            map((resultUsers: User[]) => resultUsers[0])
          )
        )
      )
      .pipe(
        takeUntil(this.onDestroy$),
        take(1),
        flatMap((observables: Observable<User>) => observables)
      );
  }

  public isUserHuMailVerified(): Observable<boolean> {
    return this.getCurrentUserInfo().pipe(
      map(
        (user: User) =>
          !isNullOrUndefined(user) &&
          !isNullOrUndefined(user.huEmail) &&
          user.huEmail.validated &&
          !isNullOrUndefined(user.huEmail.email) &&
          user.huEmail.email !== ''
      )
    );
  }

  public getCurrentUserRole(): Observable<string> {
    return this.getCurrentUserInfo().pipe(
      map((user: User) => (!isNullOrUndefined(user) ? user.role : ''))
    );
  }

  public getCurrentUserFirebase(): Observable<FirebaseUser> {
    return this.firebaseAuthentication.authState;
  }

  private getCurrentUserUID(): Observable<string> {
    return this.firebaseAuthentication.user.pipe(
      map((currentUser: firebase.User) =>
        !isNullOrUndefined(currentUser) ? currentUser.uid : ''
      )
    );
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
