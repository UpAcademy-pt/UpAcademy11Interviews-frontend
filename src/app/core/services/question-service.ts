import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Question } from '../models/question';



@Injectable({
  providedIn: 'root'
})

export class UserApiService {
    private apiUrl = 'http://localhost:8080/projectInterview/api/question/';

  constructor(
    private http: HttpClient
  ) { }

  public getAll() {
    return this.http.get(this.apiUrl);
  }

  public create(question: Question) {
    return this.http.post(this.apiUrl, question);
  }

  public get(id: number) {
    return this.http.get(this.apiUrl + id);
  }

  public update(question: Question) {
    return this.http.put(this.apiUrl, question);
  }

  public delete(id: number) {
    return this.http.delete(this.apiUrl + id);
  }


}