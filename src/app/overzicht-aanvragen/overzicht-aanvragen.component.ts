import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-overzicht-aanvragen',
  templateUrl: './overzicht-aanvragen.component.html',
  styleUrls: ['./overzicht-aanvragen.component.scss']
})
export class OverzichtAanvragenComponent implements OnInit {
  aanvragenCollection: AngularFirestoreCollection<Aanvraag>;
  aanvragen$: Observable<Aanvraag[]>;
  statusFilter$: BehaviorSubject<string|null>;
  colorFilter$: BehaviorSubject<string|null>;
  
  constructor(afs: AngularFirestore) {
    this.aanvragenCollection = afs.collection<Aanvraag>('aanvragen');
    this.aanvragen = this.aanvragenCollection.valueChanges();
    this.statusFilter$ = new BehaviorSubject(null);
    this.aanvragen$ = combineLatest(
      this.statusFilter$,
    ).pipe(
      switchMap(([status]) => 
        afs.collection('aanvragen', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (status) { query = query.where('status.aanvraagStatus', '==', status) };
          return query;
        }).valueChanges()
      )
    );
  }
  filterByStatus(status: string|null) {
    this.statusFilter$.next(status); 
  }
  ngOnInit() {
  }

  anvr: Aanvraag = {
    aanvraagId: "213", 
    docentId: "213a", 
    aanvragerId: "fe823", 
    ruimteId: "2131a", 
    status: "392A", 
    startTijd: "12 uur", 
    eindTijd: "2 uur", 
    motivatie: "tst",
    status: {aanvraagStatus: 1, toelichting: "test"}
  };

  addAanvraag(aanvraag: Aanvraag) {
    return this.aanvragenCollection.add(aanvraag);
  }

}
