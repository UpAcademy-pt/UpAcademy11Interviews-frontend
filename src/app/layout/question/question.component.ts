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
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeNewComponent } from './attribute-new/attribute-new.component';
import { AttributeEditComponent } from './attribute-edit/attribute-edit.component';
import { GenerateInterviewComponent } from './generate-interview/generate-interview.component';
import { id } from '@swimlane/ngx-datatable';
import { QuestionDeleteComponent } from './question-delete/question-delete.component';
import { initialState } from 'ngx-bootstrap/timepicker/reducer/timepicker.reducer';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { Account} from '../../core/models/account';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  public questions$: ReplaySubject<Question[]>;

  public interviewQuestions$: ReplaySubject<Set<number>> = new ReplaySubject(1);

  public attributes$: ReplaySubject<Attribute[]>;

  private subscriptionQuestions: Subscription;

  private subscriptionAttributes: Subscription;

  interviewQuestions: Set<number> = new Set<number>();


  public modalRef: BsModalRef;
  public iconNew = faPlus;

  private _opened: boolean = true;

  questions: Question[] = [];
  attributes: Attribute[] = [];
  attributeValues: AttributeValue[] = [];

  filteredValues: String[][] = [];

  displayedQuestions: Question[] = [];

  filter: Set<String> = new Set<String>();
  valueOption = {};
  currentAccount: Account = new Account();

  constructor(
    private dataService: DataService,
    private accountApi : AccountApiService,
    private questionApi: QuestionApiService,
    private attributeApi: AttributeApiService,
    private attributeValueApi: AttributeValueApiService,
    private interviewApi: InterviewApiService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.questions$ = this.dataService.questions$;
    this.subscriptionQuestions = this.questions$.subscribe((data) => {
      console.log('questions$ on QuestionComponent', JSON.stringify(data));
      this.displayedQuestions = data;
    });

    this.attributes$ = this.dataService.attributes$;
    this.subscriptionAttributes = this.attributes$.subscribe((data) => {
      console.log('attributes$ on QuestionComponent', JSON.stringify(data));
      this.attributes = data;
    });

  }

  columns = ["Add to Interview", "Question", "Expected Answer", "Options"];
  indexTable = ["attributes", "question", "answer"];


  ngOnInit(): void {

    this.currentAccount.role = this.accountApi.getCurrentRole();
    console.log(this.currentAccount.role);
    console.log(this.currentAccount.role != 'User');

    if (this.currentAccount.role == 'User') {
      this.columns = ["Add to Interview", "Question", "Expected Answer"];
    }

    this.questionApi.getAll().subscribe(
      (response: Question[]) => {
        this.questions = response;
        this.displayedQuestions = response;
      },
      (error) => console.log(error)
    )

    this.attributeValueApi.getAll().subscribe(
      (response: AttributeValue[]) => {
        this.attributeValues = response;

        this.attributeApi.getAll().subscribe(
          (response: Attribute[]) => {
            this.attributes = response;
            this.attributes.forEach((attribute: Attribute) => {
              this.valueOption[attribute.category] = '';
              let printValues = [];
              this.attributeValues.forEach(element => {              
                if (element.attribute['id'] == attribute.id) {
                  printValues.push(element.value);
                }
              });
              this.filteredValues.push(printValues);
            });
            console.log(this.filteredValues);
            
          },
          (error) => console.log(error)
        )
      },
      (error) => console.log(error)
    )
  }


  public filterQuestions() {
    let count;
    this.displayedQuestions = [];
    this.questions.forEach(question => {
      count = 0
      this.attributes.forEach(attributeValue => {
        if (this.valueOption[attributeValue.category] !== "") {
          question.attributes.forEach(attr => {
            if (attr['attribute']['category'] == attributeValue.category) {
              if (attr.value == this.valueOption[attributeValue.category]) {
                count++;
              }
            }
          })
        }
        else {
          count++;
        }
      });
      console.log(Object.keys(this.valueOption));

      if (count == Object.keys(this.valueOption).length) {
        this.displayedQuestions.push(question);
        console.log(this.displayedQuestions);
      }
    });

    console.log(this.displayedQuestions);
  }

  public getValues(category: String) {
    this.attributeValueApi.getByAttribute(category).subscribe(
      (data: AttributeValue[]) => {
        this.attributeValues = data;
      })
  }

  public addCategory() {
    const initialState = {
    };
    this.modalRef = this.modalService.show(AttributeNewComponent, { initialState });
    this.modalService.onHide.subscribe((attribute: Attribute) => {
    });
    this.dataService.updateAttributes();
  }

  public editCategory(id: number) {
    const initialState = {
      id: id,
    };
    console.log(id);
    this.modalRef = this.modalService.show(AttributeEditComponent, { initialState });
    this.modalService.onHide.subscribe((attribute: Attribute) => {
    });
    this.dataService.updateAttributes();
  }


  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  ngOnDestroy() {
    this.subscriptionQuestions.unsubscribe();
    this.subscriptionAttributes.unsubscribe();
  }

  updateQuestions() {
    this.dataService.updateQuestions();
  }

  updateAttributes() {
    this.dataService.updateAttributes();
  }

  clickRow(question: Question) {
    this.router.navigate(['/question', question.id]);
  }

  public deleteQuestion(id: number) {
    const initialState = {
      id: id,
    };
    this.modalRef = this.modalService.show(QuestionDeleteComponent, {initialState});
    this.modalService.onHide.subscribe((question: Question) => {
      this.dataService.updateQuestions();
    });
  }

  public editQuestion(id: number) {
    const initialState = {
      id: id,
    };
    this.modalRef = this.modalService.show(QuestionEditComponent, { initialState });
    this.modalService.onHide.subscribe((question: Question) => {
      this.dataService.updateQuestions();
    });
  }

  public openCreateModal() {
    this.modalRef = this.modalService.show(QuestionNewComponent);
    this.modalService.onHide.subscribe((question: Question) => {
      this.dataService.updateQuestions();
    });
  }

  public questionCheck(id: number) {
      if (this.interviewQuestions.has(id)) {
        this.interviewQuestions.delete(id);        
      }
      else {
        this.interviewQuestions.add(id);
      }

      console.log(this.interviewQuestions);
      
  }

  generateInterview() {
    const initialState = {
      questionIds : this.interviewQuestions,
    }
    this.modalRef = this.modalService.show(GenerateInterviewComponent, {initialState});
    this.modalService.onHide.subscribe(() => {
      this.interviewApi.getAll();
  });
  }

  generatePdf() {
    var rows = [];
    rows.push([{ text: 'Category', style: 'tableHeader', alignment: 'center' }, { text: 'Question', style: 'tableHeader', alignment: 'center' }, { text: 'Expected Answer', style: 'tableHeader', alignment: 'center' }]);

    for (var i = 0; i < this.displayedQuestions.length; i++) {
      let str = "";
      this.displayedQuestions[i].attributes.forEach(attr => {
        str += attr.value + " ";
      })
      rows.push([str, this.displayedQuestions[i].question, this.displayedQuestions[i].answer]);
    }

    const documentDefinition = {
      content: [

        /* image */{
          image: 'data:image/jpeg;base64,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',
          width: 200
        },
        { text: 'Interview', margin: [0, 50, 0, 30], style: 'header' },
        /* this.accountApi, */
        /* { text: 'Role', margin: [0, 10, 0, 30], style: 'header' }, */
        {
          style: 'table',
          table: {
            widths: ['*', '*', '*'],
            body: rows
          }
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center'
        },
        tableHeader: {
          fontSize: 15,
          bold: true
        }
      }


    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
