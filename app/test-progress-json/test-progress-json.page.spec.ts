import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProgressJsonPage } from './test-progress-json.page';

describe('TestProgressJsonPage', () => {
  let component: TestProgressJsonPage;
  let fixture: ComponentFixture<TestProgressJsonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProgressJsonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProgressJsonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
