import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  Query,
  QueryFn,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

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

  /**
   * Updatet een User.
   */
  public async updateUser(user: User): Promise<void> {
    this.angularFirestore
      .collection('users')
      .stateChanges()
      .pipe(
        take(1),
        map((anies: Array<DocumentChangeAction<User>>) =>
          anies.forEach((value: DocumentChangeAction<User>) => {
            this.angularFirestore
              .collection('users')
              .doc<User>(value.payload.doc.id)
              .valueChanges()
              .subscribe((resultUser: User) => {
                if (resultUser !== null && resultUser.uid === user.uid) {
                  this.angularFirestore
                    .collection('users')
                    .doc(value.payload.doc.id)
                    .update(user);
                }
              });
          })
        )
      )
      .subscribe();
  }

  public isHuMailTaken(huMail: string): Observable<boolean> {
    return this.angularFirestore
      .collection<User>('users', (reference: Query) =>
        reference.where('huEmail.email', '==', huMail)
      )
      .valueChanges()
      .pipe(map((users: User[]) => users.length > 0));
  }
}
