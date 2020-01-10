import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { Interview } from 'src/app/core/models/interview';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-interview-load',
  templateUrl: './interview-load.component.html',
  styleUrls: ['./interview-load.component.scss']
})
export class InterviewLoadComponent implements OnInit {

  interviews = []
  interviewTitle = []
  selectedTemplate = '';
  @Output() templateSelect = new EventEmitter<string>();
/*   public bsModalRef: BsModalRef */
  constructor(
    public interviewApi: InterviewApiService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit()  {
    this.interviewApi.getAll().subscribe((data:Interview[]) =>{
      this.interviews = data;
      console.log(this.interviews);
    });
  }
   
  createInterview() {
    this.templateSelect.emit(this.selectedTemplate);
    this.bsModalRef.hide()  
  }
}
