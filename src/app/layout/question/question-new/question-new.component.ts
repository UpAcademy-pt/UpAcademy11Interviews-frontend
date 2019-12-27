import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap';

import { Question, QuestionApiService } from 'src/app/core';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.scss']
})
export class QuestionNewComponent {

  public question: Question = new Question();
  public event: EventEmitter<any> = new EventEmitter();

  public attributeApi : AttributeApiService;
  
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

  public create() {
    /* this.question.attributes.push('hard as f'); */
    this.questionApi.create(this.question).subscribe(
      (data) => {
        console.log(data);
        
      },
      (error) => {
      }
    );
  }

  Attributes: Attribute[];

  ngOnInit() {
    //this.Attributes = this.attributeApi.getAll();
    //this.question.attributes;
  }

}
