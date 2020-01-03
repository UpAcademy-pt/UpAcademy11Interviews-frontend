import { Component, OnInit } from '@angular/core';
import { Account, AccountApiService } from 'src/app/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  Roles: any = ['Admin', 'Superuser', 'User'];
  id;
  public account: Account = new Account();
  public msg: string;
  error = false;

  constructor(
    private accountApi: AccountApiService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.account.role='User';
  }
  
  public editAccount(id:number) {
    this.accountApi.update(this.id, this.account).subscribe(
      (account: any) => {
      },
      (error) => {
        console.log(error);
        this.msg = 'Invalid fields.';
        this.error = true;
      }
    );
    
    /* this.location.back(); */
  }
}
