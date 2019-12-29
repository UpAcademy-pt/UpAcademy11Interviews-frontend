import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Question, DataService, QuestionApiService, AccountApiService } from '../../core';
import { QuestionNewComponent } from './question-new/question-new.component';
/* pdf */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  public questions$: ReplaySubject<Question[]>;
  private subscriptionQuestions: Subscription;
  public modalRef: BsModalRef;
  public iconNew = faPlus;
  
  private _opened: boolean = true;
  
  Technology: any = ['JAVA', 'JS', 'AngularJS', 'HTML', 'CSS'];

  Difficulty: any = ['1', '2', '3', '4', '5'];

  Roles: any = ['beginner', 'medium', 'advanced', 'pro'];


  constructor(
    private dataService: DataService,
    private questionApi: QuestionApiService,
    private router: Router,
    private accountApi: AccountApiService,
    private modalService: BsModalService
  ) {
    this.questions$ = this.dataService.questions$;
    this.subscriptionQuestions = this.questions$.subscribe((a) => console.log('questions$ on QuestionComponent', JSON.stringify(a)));
  }

  columns = ["Question","Expected Answer"];
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
  private _toggleSidebar() {
    this._opened = !this._opened;
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
  generatePdf(){
    var rows = [];
    rows.push(['Question', 'Expected Answer']);
  
    for( var i = 0; i < this.questions.length; i++) {
      rows.push([this.questions[i].question, this.questions[i].answer]);
    }
  
      const documentDefinition = { content: [
        {text: 'Tables', style: 'header'},
      'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
      {
        style: 'table',
        table: {
          widths: ['*', '*'],
          body: rows
        }
      }
    ]
   };
    pdfMake.createPdf(documentDefinition).open();
  }
}
