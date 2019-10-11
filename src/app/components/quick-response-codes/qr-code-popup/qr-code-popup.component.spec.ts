/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QrCodePopupComponent } from './qr-code-popup.component';

describe('QrCodePopupComponent', () => {
  let component: QrCodePopupComponent;
  let fixture: ComponentFixture<QrCodePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodePopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
