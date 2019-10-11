import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
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

  public async addUser(userUid: string): Promise<void> {
    await this.angularFirestore
      .collection('users')
<<<<<<< HEAD
      .add({ uid: userUid } as User);
=======
      .add({ uid: userUid, role: 'student' } as User);
>>>>>>> 4679f1a07d6c881c5557e85d0a06053f463c6c50
  }
}
