import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap';

import { Question } from 'src/app/core';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.scss']
})
export class QuestionNewComponent {

  public question: Question = new Question();
  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public bsModalRef: BsModalRef
  ) {
    this.question.question = "why?";
    this.question.answer = "yes";
    this.question.attributes = "java";
  }

  triggerEvent() {
    this.event.emit(this.question);
  }

}
