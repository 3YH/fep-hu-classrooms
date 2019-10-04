import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AanvragenComponent } from './aanvragen.component';

describe('AanvragenComponent', () => {
  let component: AanvragenComponent;
  let fixture: ComponentFixture<AanvragenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AanvragenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AanvragenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
