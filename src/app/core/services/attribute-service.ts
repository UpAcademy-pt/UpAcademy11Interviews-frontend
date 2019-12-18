import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Attribute } from '../models/attribute';



@Injectable({
  providedIn: 'root'
})

export class UserApiService {
    private apiUrl = 'http://localhost:8080/projectInterview/api/attribute/';

  constructor(
    private http: HttpClient,
  ) { }

  public getAll() {
    return this.http.get(this.apiUrl);
  }

  public create(attribute: Attribute) {
    return this.http.post(this.apiUrl, attribute);
  }

  public get(id: number) {
    return this.http.get(this.apiUrl + id);
  }

  public update(attribute: Attribute) {
    return this.http.put(this.apiUrl, attribute);
  }

  public delete(id: number) {
    return this.http.delete(this.apiUrl + id);
  }


}