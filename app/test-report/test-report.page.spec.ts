import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportPage } from './test-report.page';

describe('TestReportPage', () => {
  let component: TestReportPage;
  let fixture: ComponentFixture<TestReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
