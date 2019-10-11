import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private angularFirestore: AngularFirestore) {}

  public getUser(userUID: string): Observable<User[]> {
    if (isNullOrUndefined(userUID)) {
      return of([]);
    } else {
      return this.angularFirestore
        .collection<User>('users', (reference: Query) =>
          reference.where('uid', '==', userUID)
        )
        .valueChanges();
    }
  }

  public getDocentVanRuimte(ruimteId: string): Observable<User> {
    return this.angularFirestore
      .collection<User>('users', (reference: Query) =>
        reference.where('beheerdeRuimtes', 'array-contains', ruimteId)
      )
      .valueChanges()
      .pipe(map((users: User[]) => users[0]));
  }

  public async addUser(userUid: string): Promise<void> {
    await this.angularFirestore
      .collection('users')
      .add({ uid: userUid, role: 'student' } as User);
  }
}
