import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDoubleJSONPage } from './test-double-json.page';

describe('TestDoubleJSONPage', () => {
  let component: TestDoubleJSONPage;
  let fixture: ComponentFixture<TestDoubleJSONPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDoubleJSONPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDoubleJSONPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
