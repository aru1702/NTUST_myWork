import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPausePage } from './test-pause.page';

describe('TestPausePage', () => {
  let component: TestPausePage;
  let fixture: ComponentFixture<TestPausePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPausePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPausePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
