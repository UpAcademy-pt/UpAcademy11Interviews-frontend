import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { QuestionApiService } from '../question/question-api.service';
import { Question } from '../..';
import { AttributeApiService } from '../attribute-service';
import { Attribute } from '../../models/attribute';
import { AttributeValueApiService } from '../attribute-value-service';
import { AttributeValue } from '../../models/attribute-value';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public questions$: ReplaySubject<Question[]> = new ReplaySubject(1);
  public attributes$: ReplaySubject<Attribute[]> = new ReplaySubject(1);
  public attributeValues$: ReplaySubject<AttributeValue[]> = new ReplaySubject(1);
  private questions: Question[];
  private attributes: Attribute[];
  public attributeValues : AttributeValue[];
  

  constructor(
    private questionApi: QuestionApiService,
    private attributeApi: AttributeApiService,
    private attributeValueApi: AttributeValueApiService
  ) {
    this.questions$.subscribe((a) => console.log('questions$ on DataService', JSON.stringify(a)));
    this.updateQuestions();

    this.attributes$.subscribe((a) => console.log('attributes$ on DataService', JSON.stringify(a)));
    this.updateAttributes();

    this.attributeValues$.subscribe((a) => console.log('attributeValues$ on DataService', JSON.stringify(a)));
    this.updateAttributeValues();
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

  updateAttributeValues() {
    this.attributeValueApi.getAll().subscribe(
      (attributeValues: AttributeValue[]) => {
        this.attributeValues = attributeValues;
        this.attributeValues$.next(attributeValues);
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
