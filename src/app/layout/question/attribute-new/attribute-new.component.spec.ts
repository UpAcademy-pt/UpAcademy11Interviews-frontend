import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeNewComponent } from './attribute-new.component';

describe('AttributeNewComponent', () => {
  let component: AttributeNewComponent;
  let fixture: ComponentFixture<AttributeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
