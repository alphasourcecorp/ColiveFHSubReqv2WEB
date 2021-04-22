import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartvalueComponent } from './cartvalue.component';

describe('CartvalueComponent', () => {
  let component: CartvalueComponent;
  let fixture: ComponentFixture<CartvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartvalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
