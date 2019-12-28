import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Question, DataService, QuestionApiService } from '../../core';
import { QuestionNewComponent } from './question-new/question-new.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  public questions$: ReplaySubject<Question[]>;
  private subscriptionQuestions: Subscription;
  public modalRef: BsModalRef;
  public iconNew = faPlus;
 

  constructor(
    private dataService: DataService,
    private questionApi: QuestionApiService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.questions$ = this.dataService.questions$;
    this.subscriptionQuestions = this.questions$.subscribe((a) => console.log('questions$ on QuestionComponent', JSON.stringify(a)));
  }

  columns = ["Question","Answer"];
  index = ["question", "answer"];
    
  questions : Question[] = [];

  ngOnInit():void {
    this.questionApi.getAll().subscribe(
    (response : Question[]) => {
      this.questions = response;
    },
    (error) => console.log(error)
    )
  }

  
  ngOnDestroy() {
    this.subscriptionQuestions.unsubscribe();
  }

  updateQuestions() {
    this.dataService.updateQuestions();
  }

  clickRow(question : Question) {
    this.router.navigate(['/question', question.id]);
  }s

  public openCreateModal() {
    this.modalRef = this.modalService.show(QuestionNewComponent);
    this.modalService.onHide.subscribe((question : Question)=> {
        this.dataService.updateQuestions();
    });
  }
}
