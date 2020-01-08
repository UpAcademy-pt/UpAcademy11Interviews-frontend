import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';
import { Question } from 'src/app/core/models';
import { QuestionComponent } from '../question.component';
import { QuestionApiService } from 'src/app/core';
import { InterviewModelApiService } from 'src/app/core/services/interview-template-service';
import { InterviewModel } from 'src/app/core/models/interview-template';

@Component({
  selector: 'app-generate-interview',
  templateUrl: './generate-interview.component.html',
  styleUrls: ['./generate-interview.component.scss']
})
export class GenerateInterviewComponent implements OnInit {

  interviewName: string;

  interview = new Set();

  Roles: AttributeValue[] = [];

  questionIds : Set<number> = new Set<number>();

  myQuestions = []; /* array de questions da interview */

  activeImg = 0;
  
  constructor(
    public bsModalRef: BsModalRef,
    public attributeValueApi: AttributeValueApiService,
    public InterviewModelApiService: InterviewModelApiService,
    private questionApi: QuestionApiService,
  ) { 
  }

  ngOnInit() {
    let questions = [];
    this.questionIds.forEach(questionId => questions.push(questionId));
    console.log(questions);
    for (let index = 0; index < questions.length; index++) {
      this.questionApi.get(questions[index]).subscribe(data => {
        this.myQuestions.push(data);
        console.log(this.myQuestions);
      } )
      
    }
    
  }

  public createInterview() {
    
    this.bsModalRef.hide()
  }

  prevSlide() {
    if (this.activeImg == 0) {
      this.activeImg = this.myQuestions.length-1;
    }
    else {
      this.activeImg--;
    }
  }

  nextSlide() {
    if (this.activeImg == this.myQuestions.length-1) {
      this.activeImg = 0;
    }
    else {
      this.activeImg++;
    }
  }

}
