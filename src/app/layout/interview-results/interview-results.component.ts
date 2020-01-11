import { Component, OnInit } from '@angular/core';
import { Interview } from 'src/app/core/models/interview';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { AccountApiService } from 'src/app/core';

@Component({
  selector: 'app-interview-results',
  templateUrl: './interview-results.component.html',
  styleUrls: ['./interview-results.component.scss']
})
export class InterviewResultsComponent implements OnInit {

 
  
  candidateEvaluation = 
    {
    candidate:'',
    title:'',
    finalEvaluation: 0
  };

  displayInterview = [];
  candidate: string;
  title: string;
  finalEvaluation: number;

  constructor(
    private interviewApi: InterviewApiService,
    private accountApi: AccountApiService,
  ) {
    
   }

  columns = ["Candidate", "Template Name", "Evaluation"];
  index = ["candidate","title","finalEvaluation"]
  interviewCandidates = [];

  ngOnInit() {
    console.log(this.accountApi.getCurrentId());
    this.interviewApi.getByUser(this.accountApi.getCurrentId()).subscribe((data:Interview[]) =>{
     console.log(data);
     for (let i = 0; i < data.length; i++) {
       this.interviewCandidates.push( 
         {
            candidate:data[i].candidate,
            title:data[i].title,
            finalEvaluation:data[i].finalEvaluation
          }
        );
     }
     console.log(this.interviewCandidates);
     this.displayInterview = this.interviewCandidates;
    });
    
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
   
    
    this.displayInterview = this.interviewCandidates.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });

    
   }
}
