import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountApiService, Account } from '../core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public account: Account = new Account();
  public msg: string;
  error = false;
  constructor(
    private router: Router,
    private accountApi: AccountApiService,
    private _snackBar: MatSnackBar
    ) {
    // Fill email and password
   this.account.email = 'admin';
   this.account.password= '123'; 
  }

  ngOnInit() {}

  public login() {
    this.accountApi.login(this.account).subscribe(
      (account: any) => {
        this.accountApi.setCurrentAccount(account);
        this.router.navigate(['/layout/question']);
      },
      (error) => {
        console.log(error);
        this.msg = 'Invalid email or password.';
        this.error = true;
      }
    );
  }
}
