import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { QuestionApiService } from '../question/question-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public questions$: ReplaySubject<any[]> = new ReplaySubject(1);
  private questions: any[];

  constructor(
    private questionApi: QuestionApiService
  ) {
    // this.questions$.subscribe((a) => console.log('questions$ on DataService', JSON.stringify(a)));
    this.updateQuestions();
  }

  public updateQuestions() {
    this.questionApi.getAll().subscribe(
      (res: any) => {
        this.questions = res;
        this.questions$.next(res);
      }
    );
  }

  public getQuestionById(id) {
    for (const questions of this.questions) {
      if (questions.id === id) {
        return questions;
      }
    }
  }
}
