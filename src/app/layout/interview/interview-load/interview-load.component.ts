import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { Interview } from 'src/app/core/models/interview';


@Component({
  selector: 'app-interview-load',
  templateUrl: './interview-load.component.html',
  styleUrls: ['./interview-load.component.scss']
})
export class InterviewLoadComponent implements OnInit {

  interview = []
  interviewTitles = []


/*   public bsModalRef: BsModalRef */
  constructor(
    public interviewApi: InterviewApiService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit()  {
    this.interviewApi.getAll().subscribe(data =>{
      this.interview.push(data);
      console.log(this.interview);
      
    })
  }
    

    
  

 

  createInterview() {
    this.bsModalRef.hide()  
  }
}
