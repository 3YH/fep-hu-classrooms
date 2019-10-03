import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil} from 'rxjs/operators';
import { MatChip } from '@angular/material';
@Component({
  selector: 'app-overzicht-aanvragen',
  templateUrl: './overzicht-aanvragen.component.html',
  styleUrls: ['./overzicht-aanvragen.component.scss']
})
export class OverzichtAanvragenComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private afs: AngularFirestore) { }
  public aanvragen: Observable<Aanvraag[]>;
  private statusFilter$ = new Subject<string>();

  public aanvraag1: Aanvraag = {
    aanvraagId: '213',
    docentId: '213a',
    aanvragerId: 'fe823',
    ruimteId: '2131a',
    startTijd: '12 uur',
    eindTijd: '2 uur',
    motivatie: 'tst',
    status: { aanvraagStatus: 1, toelichting: 'test' }
  };

  // private addAanvraag(aanvraag: Aanvraag) {
  //   return this.aanvragen.add(aanvraag);
  // }

  private getAanvragen() {
    this.aanvragen = this.afs.collection<Aanvraag>('aanvragen').valueChanges();
  }

  private filterByStatus(chip: MatChip, status) {
    chip.toggleSelected();
    console.log(chip);
    if (chip.selected) {
      this.statusFilter$.next(status);
    } else {
      this.getAanvragen();
    }
  }

  public ngOnInit() {
    this.getAanvragen();
    this.statusFilter$ = new Subject();

    const queryObservable = this.statusFilter$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((status: string) =>
          this.aanvragen = this.afs
            .collection<Aanvraag>(
              'aanvragen', reference =>
              reference.where('status.aanvraagStatus', '==', status))
            .valueChanges()
        ),
      );

    queryObservable.subscribe(queriedItems => {
      console.log(queriedItems);
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
  }
}
