import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverzichtAanvragenComponent } from './overzicht-aanvragen.component';

describe('OverzichtAanvragenComponent', () => {
  let component: OverzichtAanvragenComponent;
  let fixture: ComponentFixture<OverzichtAanvragenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverzichtAanvragenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverzichtAanvragenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
