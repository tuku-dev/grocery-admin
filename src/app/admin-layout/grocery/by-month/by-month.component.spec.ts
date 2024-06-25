/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ByMonthComponent } from './by-month.component';

describe('ByMonthComponent', () => {
  let component: ByMonthComponent;
  let fixture: ComponentFixture<ByMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
