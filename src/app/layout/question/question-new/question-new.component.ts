import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap';

import { Question, QuestionApiService } from 'src/app/core';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.scss']
})
export class QuestionNewComponent {

  public question: Question = new Question();
  public event: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private questionApi: QuestionApiService,
    public bsModalRef: BsModalRef
  ) {
    this.question.question = "";
    this.question.answer = "";
    this.question.attributes = [];
  }

  triggerEvent() {
    this.event.emit(this.question);
  }

  public new() {
    /* this.question.attributes.push('hard as f'); */
    this.questionApi.create(this.question).subscribe(
      (account: Account) => {
      },
      (error) => {
      }
    );
  }

}
