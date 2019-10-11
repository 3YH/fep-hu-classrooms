import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  Query
} from '@angular/fire/firestore';
import { of, zip } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Docent } from '../models/docent';
import { Student } from '../models/student';
import { User } from '../models/user';
import { WhereClause } from '../models/where-clause';

@Injectable({
  providedIn: 'root'
})
export class AanvraagService {
  private aanvraagCollection: AngularFirestoreCollection<
    Aanvraag
  > = this.angularFirestore.collection('aanvragen');

  private isDocent(object: Docent): object is Docent {
    return 'beheerdeRuimtes' in object;
  }

  constructor(private angularFirestore: AngularFirestore) {}

  /**
   * Dit is de basis functie voor het ophalen en filteren van Aanvragen.
   *
   * Optioneel kan je een {@link WhereClause} meegeven voor het filteren.
   */
  public getAanvragen(whereClause?: WhereClause): Observable<Aanvraag[]> {
    return this.angularFirestore
      .collection<Aanvraag>('aanvragen', (reference: Query) =>
        isNullOrUndefined(whereClause)
          ? reference
          : reference.where(
              whereClause.fieldPath,
              whereClause.operator,
              whereClause.value
            )
      )
      .valueChanges();
  }

  /**
   * Haalt een Aanvraag op a.d.h.v. het AanvraagId.
   */
  public getAanvraagById(aanvraagId: string): Observable<Aanvraag[]> {
    return this.getAanvragen({
      fieldPath: 'aanvraagId',
      operator: '==',
      value: aanvraagId
    } as WhereClause);
  }

  /**
   * Haalt een Aanvraag op a.d.h.v. het UserUID.
   */
  public getAanvraagByUserUid(userUid: string): Observable<Aanvraag[]> {
    return this.getAanvragen({
      fieldPath: 'aanvragerId',
      operator: '==',
      value: userUid
    } as WhereClause);
  }

  /**
   * Haalt een Aanvraag op a.d.h.v. het UserUID.
   */
  public getAanvragenByUserUidByStatus(
    userUid: string,
    statusWhereClause: WhereClause
  ): Observable<Aanvraag[]> {
    return this.angularFirestore
      .collection<Aanvraag>('aanvragen', (reference: Query) =>
        isNullOrUndefined(status)
          ? reference
          : reference
              .where(
                statusWhereClause.fieldPath,
                statusWhereClause.operator,
                statusWhereClause.value
              )
              .where('aanvragerId', '==', userUid)
      )
      .valueChanges();
  }

  /**
   * Haalt de aanvragen op van een User.
   *
   * Hierbij wordt onderscheidt gemaakt op basis van type user.
   */
  public getAanvragenByUser(
    user: User | Docent | Student
  ): Observable<Aanvraag[]> {
    if (isNullOrUndefined(user)) {
      console.log(
        'Er is geen gebruiker opgegeven bij het zoeken naar aanvragen.'
      );
      return of([]);
    } else if (this.isDocent(user)) {
      return this.getAanvragenByDocent(user);
    } else {
      return this.getAanvraagByUserUid(user.uid);
    }
  }

  /**
   * Haalt de aanvragen op waarvan de Docent de beheerder is.
   *
   * Voor elke ruimte wordt een aparte observable geïnitieerd en vervolgens worden deze samengevoegd.
   */
  public getAanvragenByDocent(docent: Docent): Observable<Aanvraag[]> {
    const observerList: Array<Observable<Aanvraag[]>> = [];
    docent.beheerdeRuimtes.forEach((ruimteId: string) =>
      observerList.push(this.getAanvragenByRuimteId(ruimteId))
    );
    return zip(...observerList).pipe(
      map((result: Aanvraag[][]) => [].concat(...result))
    );
  }

  /**
   * Haalt de aanvragen van een specifieke ruimte op.
   */
  public getAanvragenByRuimteId(ruimteId: string): Observable<Aanvraag[]> {
    return this.getAanvragen({
      fieldPath: 'ruimteId',
      operator: '==',
      value: ruimteId
    } as WhereClause);
  }

  /**
   * Haalt de aanvragen met een specifieke status op.
   */
  public getAanvragenByStatus(status: string): Observable<Aanvraag[]> {
    return this.getAanvragen({
      fieldPath: 'status.aanvraagStatus',
      operator: '==',
      value: status
    } as WhereClause);
  }

  /**
   * Voegt een nieuwe aanvraag toe.
   */
  public async addAanvraag(aanvraag: Aanvraag): Promise<void> {
    const documentReference: DocumentReference = await this.aanvraagCollection.add(
      aanvraag
    );
    await this.aanvraagCollection
      .doc<Aanvraag>(documentReference.id)
      .update({ aanvraagId: documentReference.id });
  }

  /**
   * Updatet een aanvraag.
   */
  public async updateAanvraag(aanvraag: Aanvraag): Promise<void> {
    await this.aanvraagCollection
      .doc<Aanvraag>(aanvraag.aanvraagId)
      .update(aanvraag);
  }

  /**
   * Verwijdert een aanvraag op basis van ID.
   */
  public async deleteAanvraag(aanvraagId: string): Promise<void> {
    await this.aanvraagCollection.doc<Aanvraag>(aanvraagId).delete();
  }
}
