import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryviewComponent } from './summaryview.component';

describe('SummaryviewComponent', () => {
  let component: SummaryviewComponent;
  let fixture: ComponentFixture<SummaryviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
