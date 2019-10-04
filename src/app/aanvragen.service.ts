import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Aanvraag } from './aanvraag';
import { AANVRAGEN } from './mock-aanvragen';

@Injectable({
    providedIn: 'root',
  })

export class AanvragenService {
    public getAanvragen(): Observable<Aanvraag[]> {
        return of(AANVRAGEN);
    }
}
