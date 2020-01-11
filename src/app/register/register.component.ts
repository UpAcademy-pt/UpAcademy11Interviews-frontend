import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccountApiService, Account } from '../core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Superuser', 'User'];

  public account: Account = new Account();
  public msg: string;
  error = false;
  isInvalid = false;

  constructor(
    private location: Location,
    private router: Router,
    private accountApi: AccountApiService,
    private _snackBar: MatSnackBar,
    public bsModalRef: BsModalRef
    ){ 
  }

  ngOnInit() {
    this.account.role='User';
  }

 /*  public back() {
    this.location.back();
  } */

  public register() {
    if (this.account.firstName == '' || this.account.lastName == '' || this.account.email == '' || this.account.password == '') {
      this.isInvalid = true;
    }else{
    this.accountApi.create(this.account).subscribe(
      (account: any) => {
        this.bsModalRef.hide()
      },
      (error) => {
        console.log(error);
        this.msg = 'Invalid fields.';
        this.error = true;
      });
  }
}
}