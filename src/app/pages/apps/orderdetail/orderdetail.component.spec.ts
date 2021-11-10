import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { orderdetailComponent } from './orderdetail.component';

describe('orderdetailComponent', () => {
  let component: orderdetailComponent;
  let fixture: ComponentFixture<orderdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ orderdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(orderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
