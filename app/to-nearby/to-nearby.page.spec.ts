import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToNearbyPage } from './to-nearby.page';

describe('ToNearbyPage', () => {
  let component: ToNearbyPage;
  let fixture: ComponentFixture<ToNearbyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToNearbyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToNearbyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
