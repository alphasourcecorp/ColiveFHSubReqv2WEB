import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrequestviewComponent } from './adminrequestview.component';

describe('AdminrequestviewComponent', () => {
  let component: AdminrequestviewComponent;
  let fixture: ComponentFixture<AdminrequestviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminrequestviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminrequestviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
