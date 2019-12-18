import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})

export class UserApiService {
    private apiUrl = 'http://localhost:8080/projectInterview/api/user/';

  constructor(
    private http: HttpClient,
  ) { }

  public getAll() {
    return this.http.get(this.apiUrl);
  }

  public create(user: User) {
    return this.http.post(this.apiUrl, user);
  }

  public get(id: number) {
    return this.http.get(this.apiUrl + id);
  }

  public update(user: User) {
    return this.http.put(this.apiUrl, user);
  }

  public delete(id: number) {
    return this.http.delete(this.apiUrl + id);
  }


}