import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewModel } from '../models/interview-template';


@Injectable({
    providedIn: 'root'
  })
  
  export class InterviewModelApiService {

    private apiUrl = 'http://localhost:8080/projectInterview/api/interviewmodel/';

  constructor(
    private http: HttpClient
  ) { }

  public getAll() {
    return this.http.get(this.apiUrl);
  }

  public create(interviewModel: InterviewModel) {
    return this.http.post(this.apiUrl, interviewModel);
  }

  public delete(id: number) {
    return this.http.delete(this.apiUrl + id, {responseType: 'text'});
  }


  }