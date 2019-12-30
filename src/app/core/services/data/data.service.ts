import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { QuestionApiService } from '../question/question-api.service';
import { Question } from '../..';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public questions$: ReplaySubject<Question[]> = new ReplaySubject(1);
  private questions: any[];

  constructor(
    private questionApi: QuestionApiService
  ) {
    this.questions$.subscribe((a) => console.log('questions$ on DataService', JSON.stringify(a)));
    this.updateQuestions();
  }

  public updateQuestions() {
    this.questionApi.getAll().subscribe(
      (question: Question[]) => {
        this.questions = question;
        this.questions$.next(question);
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
