import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InterviewModelApiService } from 'src/app/core/services/interview-template-service';
import { Interview } from 'src/app/core/models/interview';


@Component({
  selector: 'app-interview-load',
  templateUrl: './interview-load.component.html',
  styleUrls: ['./interview-load.component.scss']
})
export class InterviewLoadComponent implements OnInit {

  firstname: string;
  lastname: string
  candidateName: string;
  
  Interviews = [];


/*   public bsModalRef: BsModalRef */
  constructor(
    public InterviewModelApiService: InterviewModelApiService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.InterviewModelApiService.getAll().subscribe(
      (response: Interview[]) => {
        this.Interviews = response;
      })
  }

 

  createInterview() {
    const candidateName = this.firstname + " " + this.lastname;
    console.log(candidateName);
    
    
    this.bsModalRef.hide()  
  }
}
