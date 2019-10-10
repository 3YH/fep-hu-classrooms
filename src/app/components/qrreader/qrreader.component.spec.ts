import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrreaderComponent } from './qrreader.component';

describe('QrreaderComponent', () => {
  let component: QrreaderComponent;
  let fixture: ComponentFixture<QrreaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrreaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrreaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
