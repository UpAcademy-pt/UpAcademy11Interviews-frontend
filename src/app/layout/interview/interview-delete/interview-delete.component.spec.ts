import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewDeleteComponent } from './interview-delete.component';

describe('InterviewDeleteComponent', () => {
  let component: InterviewDeleteComponent;
  let fixture: ComponentFixture<InterviewDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
