import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { Interview } from 'src/app/core/models/interview';
import { Title } from '@angular/platform-browser';
import { InterviewModelApiService } from 'src/app/core/services/interview-template-service';


@Component({
  selector: 'app-interview-load',
  templateUrl: './interview-load.component.html',
  styleUrls: ['./interview-load.component.scss']
})
export class InterviewLoadComponent implements OnInit {

  interviews = []
  interviewTitle = []
  selectedTemplate;
  @Output() templateSelect = new EventEmitter<Object>();
/*   public bsModalRef: BsModalRef */
  constructor(
    public interviewApi: InterviewModelApiService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit()  {
    this.interviewApi.getAll().subscribe((data:Interview[]) =>{
      this.interviews = data;
      console.log(this.interviews);
    });
  }
   
  createInterview() {
    let template = this.interviews.find( interview => interview.id == this.selectedTemplate); 
    this.templateSelect.emit(template);
    this.bsModalRef.hide()  
  }
}
