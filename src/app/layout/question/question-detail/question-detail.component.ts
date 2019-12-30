import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService, Question, QuestionApiService } from 'src/app/core';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {
  public question: Question;
  public msg: string;

  constructor(
    private dataService: DataService,
    private productApi: QuestionApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(
      params => {
        this.question = this.dataService.getQuestionById(Number(params.id));
      });
  }

  ngOnInit() { }

  update() {
    this.productApi.update(this.question.id,this.question).subscribe(
      () => {
        this.msg = 'Question Updated';
      }
    );
  }

  delete() {
    this.productApi.delete(this.question.id).subscribe(
      () => {
        this.dataService.updateQuestions();
        this.router.navigate(['/question']);
      }
    );
  }

}
