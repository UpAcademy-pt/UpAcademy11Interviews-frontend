import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { Interview } from 'src/app/core/models/interview';

@Component({
  selector: 'app-interview-submit',
  templateUrl: './interview-submit.component.html',
  styleUrls: ['./interview-submit.component.scss']
})
export class InterviewSubmitComponent implements OnInit {

  candidate: string;
  email: string;
  firstname: string;
  lastname: string;
  selectedTemplate: number;

  constructor(
    public bsModalRef: BsModalRef,
    private interviewApi: InterviewApiService

  ) { }

  ngOnInit() {
    
  }

  submitInterview() {
/*     console.log(this.selectedTemplate);
 */    
    this.candidate = this.firstname + " " + this.lastname + ", email: " + this.email;
    console.log(this.candidate);
    this.interviewApi.get(this.selectedTemplate).subscribe((data:Interview) => {
      data.candidate = this.candidate;
      console.log(data);
    })
    
    
    this.bsModalRef.hide()
  }
}
