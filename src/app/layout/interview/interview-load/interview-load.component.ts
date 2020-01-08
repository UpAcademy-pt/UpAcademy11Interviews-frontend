import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-interview-load',
  templateUrl: './interview-load.component.html',
  styleUrls: ['./interview-load.component.scss']
})
export class InterviewLoadComponent implements OnInit {

  firstname: string;
  lastname: string
  candidateName: string;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  
  createInterview() {
    const candidateName = this.firstname + " " + this.lastname;
    console.log(candidateName);
    
    
    this.bsModalRef.hide()  
  }
}
