import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStoragePage } from './test-storage.page';

describe('TestStoragePage', () => {
  let component: TestStoragePage;
  let fixture: ComponentFixture<TestStoragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestStoragePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStoragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
