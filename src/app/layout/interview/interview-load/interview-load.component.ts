import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { Interview } from 'src/app/core/models/interview';
import { InterviewModelApiService } from 'src/app/core/services/interview-template-service';
import { Question, QuestionApiService } from 'src/app/core';


@Component({
  selector: 'app-interview-load',
  templateUrl: './interview-load.component.html',
  styleUrls: ['./interview-load.component.scss']
})
export class InterviewLoadComponent implements OnInit {

  
  interviews = [];
  interviewTitle = [];
  selectedTemplate;
  interviewQuestions = [];


  @Output() templateSelect = new EventEmitter<Object>();
/*   public bsModalRef: BsModalRef */
  constructor(
    public interviewApi: InterviewModelApiService,
    private questionApi: QuestionApiService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit()  {
    this.interviewApi.getAll().subscribe((data:Interview[]) =>{
      this.interviews = data;
      console.log(this.interviews);
      
      for (let i = 0; i < this.interviews.length; i++) {
        this.interviewQuestions.push(data[i].questions);
      }
      console.log(this.interviewQuestions);
    });
  }
   
  createInterview() {
    let template = this.interviews.find( interview => interview.id == this.selectedTemplate); 
    this.templateSelect.emit(template);
    this.bsModalRef.hide()  
  }
}
