import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldetailPage } from './alldetail.page';

describe('AlldetailPage', () => {
  let component: AlldetailPage;
  let fixture: ComponentFixture<AlldetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
