import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTimelinePage } from './test-timeline.page';

describe('TestTimelinePage', () => {
  let component: TestTimelinePage;
  let fixture: ComponentFixture<TestTimelinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTimelinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTimelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
