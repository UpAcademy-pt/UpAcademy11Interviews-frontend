import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewSubmitComponent } from './interview-submit.component';

describe('InterviewSubmitComponent', () => {
  let component: InterviewSubmitComponent;
  let fixture: ComponentFixture<InterviewSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
