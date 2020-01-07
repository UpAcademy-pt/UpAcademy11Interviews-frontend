import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInterviewComponent } from './generate-interview.component';

describe('GenerateInterviewComponent', () => {
  let component: GenerateInterviewComponent;
  let fixture: ComponentFixture<GenerateInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
