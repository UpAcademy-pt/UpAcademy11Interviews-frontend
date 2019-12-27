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
  public question$: ReplaySubject<Question[]>;
  private subscriptionQuestions: Subscription;
  public modalRef: BsModalRef;
  public iconNew = faPlus;
 

/*   rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ]; */

  constructor(
    private dataService: DataService,
    private questionApi: QuestionApiService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.question$ = this.dataService.questions$;
    this.subscriptionQuestions = this.question$.subscribe((a) => console.log('question$ on QuestionComponent', JSON.stringify(a)));
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

  clickRow(question) {
    this.router.navigate(['/question', question.id]);
  }

  public openCreateModal() {
    this.modalRef = this.modalService.show(QuestionNewComponent);
    this.modalRef.content.event.subscribe(question => {
      this.questionApi.create(question).subscribe(
        () => {
          this.dataService.updateQuestions();
          this.modalRef.hide();
        }
      );
    });
  }
}
