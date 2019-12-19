import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AttributeValue } from '../models/attribute-value';



@Injectable({
  providedIn: 'root'
})

export class UserApiService {
    private apiUrl = 'http://localhost:8080/projectInterview/api/attributevalue/';

  constructor(
    private http: HttpClient
  ) { }

  public getAll() {
    return this.http.get(this.apiUrl);
  }

  public create(attributevalue: AttributeValue) {
    return this.http.post(this.apiUrl, attributevalue);
  }

  public get(id: number) {
    return this.http.get(this.apiUrl + id);
  }

  public update(attributevalue: AttributeValue) {
    return this.http.put(this.apiUrl, attributevalue);
  }

  public delete(id: number) {
    return this.http.delete(this.apiUrl + id);
  }


}