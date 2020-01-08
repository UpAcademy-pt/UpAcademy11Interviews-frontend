import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';
import { Question } from 'src/app/core/models';
import { QuestionComponent } from '../question.component';
import { QuestionApiService } from 'src/app/core';
import { ReplaySubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-generate-interview',
  templateUrl: './generate-interview.component.html',
  styleUrls: ['./generate-interview.component.scss']
})
export class GenerateInterviewComponent implements OnInit {


  Roles: AttributeValue[] = [];

  questionIds : Set<number> = new Set<number>();

  questions : Question[] = [];

  
  activeImg = 0;
  
  constructor(
    public questionComponent: QuestionComponent,
    public bsModalRef: BsModalRef,
    public attributeValueApi: AttributeValueApiService,
    public questionApi: QuestionApiService
  ) { 
  }

  ngOnInit() {

    this.attributeValueApi.getByAttribute('Role').subscribe((data: AttributeValue[]) => {
      this.Roles = data;
    });

    this.questionIds.forEach( (id : number) => {
      this.questionApi.get(id).subscribe( (data : Question) => {
        this.questions.push(data);
      });
    })
    
  }

  public createInterview() {
    this.bsModalRef.hide()
  }

  prevSlide() {
    if (this.activeImg == 0) {
      this.activeImg = 1; //length-1
    }
    else {
      this.activeImg--;
    }
  }

  nextSlide() {
    if (this.activeImg == 1) {//length-1
      this.activeImg = 0;
    }
    else {
      this.activeImg++;
    }
  }

}
