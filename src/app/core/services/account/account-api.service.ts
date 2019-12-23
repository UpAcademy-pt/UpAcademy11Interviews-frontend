import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { Account } from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  private currentAccount: Account = new Account();
  private apiUrl = 'http://localhost:8080/projectInterview/api/user';
  constructor( private http: HttpClient) { }

  public isAuthenticated(): boolean {
    if (this.currentAccount.id) {
      return true;
    } else {
      return false;
    }
  }

  public setCurrentAccount(account:Account){
    this.currentAccount = account;
  }

  public getCurrentId(): number {
    return this.currentAccount.id;
  }

  public getCurrentName(): string {
    return this.currentAccount.name;
  }

  public create(account: Account){
    return this.http.post(this.apiUrl, account);
  }

  public login(account: Account) {
    return this.http.post(this.apiUrl+'/auth', account);
  }

  public logout() {
    this.currentAccount = null;
  }
}
