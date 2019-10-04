import { Component, OnInit } from '@angular/core';

import { Aanvraag } from '../aanvraag';
import { AanvragenService } from '../aanvragen.service';

@Component({
  selector: 'app-aanvragen',
  templateUrl: './aanvragen.component.html',
  styleUrls: ['./aanvragen.component.scss']
})
export class AanvragenComponent implements OnInit {

  public aanvragen: Aanvraag[] = [];

  constructor(private aanvraagService: AanvragenService) { }

  public ngOnInit() {
    this.getAanvragen();
  }

  public getAanvragen(): void {
    this.aanvraagService.getAanvragen().subscribe(aanvragen => this.aanvragen = aanvragen);
  }

}
