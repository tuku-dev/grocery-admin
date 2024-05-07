import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByDateComponent } from './by-date.component';

describe('ByDateComponent', () => {
  let component: ByDateComponent;
  let fixture: ComponentFixture<ByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
