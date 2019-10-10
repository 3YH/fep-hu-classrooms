import { Injectable } from '@angular/core';
import { AANVRAGEN } from '../mock-aanvragen';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrreaderService {

  constructor() { }

  public getAanvragen(): Observable<Aanvraag[]> {
    return of(AANVRAGEN);
  }

  public checkQRCode(i: string): boolean {
    let result = false;
   // const aanvraag = this.getAanvraag(i);
    AANVRAGEN.forEach(aanvraag => {
      if (aanvraag.aanvraagId === i) {
        result = true;
      }
    });
    return result;
  }
  public getAanvraag(id: string): Observable<Aanvraag> {
    return of(AANVRAGEN.find(aanvraag => aanvraag.aanvraagId === id));
  }
}
