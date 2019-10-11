import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ruimte } from '../models/ruimte';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RuimteService {
  constructor(
    private angularFirestore: AngularFirestore,
    private userService: UserService
  ) {}

  public getRuimtes(): Observable<Ruimte[]> {
    return this.angularFirestore.collection<Ruimte>('ruimtes').valueChanges();
  }

  public getDocentVanRuimte(ruimteId: string): Observable<User> {
    return this.userService.getDocentVanRuimte(ruimteId);
  }
}
