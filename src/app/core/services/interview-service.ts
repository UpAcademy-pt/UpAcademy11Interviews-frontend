import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interview } from '../models/interview';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class InterviewApiService {

  private apiUrl = 'http://localhost:8080/projectInterview/api/interview/';
  interviewQuestions$:ReplaySubject<Interview[]> =new ReplaySubject();

  constructor(
    private http: HttpClient
  ) { }

  public getAll() {
    return this.http.get(this.apiUrl);
  }

  public get(id: number) {
    return this.http.get(this.apiUrl + id);
  }
  
  public getByUser(id: number) {
    return this.http.get(this.apiUrl + '?userid=' + id);
  }

  public create(interview: Interview) {
    return this.http.post(this.apiUrl, interview);
  }

  public delete(id: number) {
    return this.http.delete(this.apiUrl + id, { responseType: 'text' });
  }


}