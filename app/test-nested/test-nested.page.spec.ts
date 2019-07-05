import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNestedPage } from './test-nested.page';

describe('TestNestedPage', () => {
  let component: TestNestedPage;
  let fixture: ComponentFixture<TestNestedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNestedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNestedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
