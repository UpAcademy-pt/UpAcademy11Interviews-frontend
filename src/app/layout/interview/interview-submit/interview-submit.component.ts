import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { Interview } from 'src/app/core/models/interview';
import { AccountApiService } from 'src/app/core';

@Component({
  selector: 'app-interview-submit',
  templateUrl: './interview-submit.component.html',
  styleUrls: ['./interview-submit.component.scss']
})
export class InterviewSubmitComponent implements OnInit {

  candidate: string;
  email: string
  firstname: string
  lastname: string
  selectedTemplate;

  constructor(
    public bsModalRef: BsModalRef,
    private interviewApi: InterviewApiService,
    private accountService:AccountApiService
  ) { }

  ngOnInit() {
    
  }

  submitInterview() {
/*     console.log(this.selectedTemplate);
 */    
    this.candidate = this.firstname + " " + this.lastname + ",  email: " + this.email;
    const interview:Interview = {
      candidate:  this.candidate,
      title: this.selectedTemplate.title,
      user: this.accountService.getCurrentAccount(),
      questions: this.selectedTemplate.questions,
      finalEvaluation: this.selectedTemplate.finalEvaluation
    }
    console.log(this.candidate);
    console.log(this.selectedTemplate);
    this.interviewApi.create(interview).subscribe((data:Interview) => {
      console.log(data);
    })
    /* this.interviewApi.get(this.selectedTemplate).subscribe((data:Interview) => {
      data.candidate = this.candidate;
      console.log(data);
    }) */
    
    
    this.bsModalRef.hide()
  }
}
