import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mail-registratie',
  templateUrl: './mail-registratie.component.html',
  styleUrls: ['./mail-registratie.component.scss']
})
export class MailRegistratieComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  public currentUser: User;
  public emailForm: FormGroup;
  public huMailControl: FormControl;
  public isValidEmail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
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

  private initializeForm(): void {
    this.huMailControl = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    );

    this.emailForm = this.formBuilder.group({
      huMail: this.huMailControl
    });

    this.huMailControl.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        map((value: string) => (this.isValidEmail = value.endsWith('hu.nl')))
      )
      .subscribe();
  }

  public onSubmit(): void {
    this.userService
      .isHuMailTaken(this.huMailControl.value as string)
      .pipe(take(1))
      .subscribe((isTaken: boolean) => {
        if (isTaken) {
          this.matSnackBar.open('Dit email-adres is al bezet', null, {
            duration: 3000
          });
        } else {
          this.currentUser.huEmail.email = this.huMailControl.value as string;
          this.currentUser.huEmail.validated = false;
          this.router.navigateByUrl('login');
          this.userService.updateUser(this.currentUser);
        }
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
