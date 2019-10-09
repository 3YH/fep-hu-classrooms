import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mail-registratie',
  templateUrl: './mail-registratie.component.html',
  styleUrls: ['./mail-registratie.component.scss']
})
export class MailRegistratieComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor() {}

  public ngOnInit() {}

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
