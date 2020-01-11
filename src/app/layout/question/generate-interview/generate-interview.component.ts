import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';
import { QuestionApiService, AccountApiService } from 'src/app/core';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { Interview } from 'src/app/core/models/interview';
import { Account } from '../../../core/models/account';
import { InterviewModelApiService } from 'src/app/core/services/interview-template-service';
@Component({
  selector: 'app-generate-interview',
  templateUrl: './generate-interview.component.html',
  styleUrls: ['./generate-interview.component.scss']
})
export class GenerateInterviewComponent implements OnInit {

  Roles: AttributeValue[] = [];

  interview: Interview = new Interview();
  candidate = '';
  evaluations = []
  finalEvaluation = 0;
  user: Account

  questionIds : Set<number> = new Set<number>();

  myQuestions = []; /* array de questions da interview */

  activeImg = 0;
  
  constructor(
    
    public bsModalRef: BsModalRef,
    public attributeValueApi: AttributeValueApiService,
    public InterviewApi: InterviewModelApiService,
    public accountApi: AccountApiService,
    private questionApi: QuestionApiService,
  ) { 
  }

  ngOnInit() {
    this.interview.candidate = this.candidate
    this.interview.evaluations = this.evaluations
    this.interview.finalEvaluation = this.finalEvaluation
    this.accountApi.get(this.accountApi.getCurrentId()).subscribe((user:Account) => {
      this.user = user;
      this.interview.user = user;
    })
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
    this.myQuestions.forEach(question => {
      this.interview.questions.push(question)
    });
    this.InterviewApi.create(this.interview).subscribe(
      (interview: any) => {
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.interview);
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
