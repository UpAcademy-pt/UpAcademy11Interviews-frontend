import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { QuestionApiService } from '../question/question-api.service';
import { Question } from '../..';
import { AttributeApiService } from '../attribute-service';
import { Attribute } from '../../models/attribute';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public questions$: ReplaySubject<Question[]> = new ReplaySubject(1);
  public attributes$: ReplaySubject<Attribute[]> = new ReplaySubject(1);
  private questions: Question[];
  private attributes: Attribute[];
  

  constructor(
    private questionApi: QuestionApiService,
    private attributeApi: AttributeApiService
  ) {
    this.questions$.subscribe((a) => console.log('questions$ on DataService', JSON.stringify(a)));
    this.updateQuestions();

    this.attributes$.subscribe((a) => console.log('attributes$ on DataService', JSON.stringify(a)));
    this.updateAttributes();
  }

  public updateQuestions() {
    this.questionApi.getAll().subscribe(
      (question: Question[]) => {
        this.questions = question;
        this.questions$.next(question);
      }
    );
  }

  public updateAttributes() {
    this.attributeApi.getAll().subscribe(
      (attributes: Attribute[]) => {
        this.attributes = attributes;
        this.attributes$.next(attributes);
      }
    );
  }

  public getQuestionById(id : Number) {
    for (const questions of this.questions) {
      if (questions.id === id) {
        return questions;
      }
    }
  }
}
