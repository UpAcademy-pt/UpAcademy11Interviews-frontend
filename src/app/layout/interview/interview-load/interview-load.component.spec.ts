import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewLoadComponent } from './interview-load.component';

describe('InterviewLoadComponent', () => {
  let component: InterviewLoadComponent;
  let fixture: ComponentFixture<InterviewLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
