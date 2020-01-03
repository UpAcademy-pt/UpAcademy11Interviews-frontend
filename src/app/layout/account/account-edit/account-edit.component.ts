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
  id: number;
  public account: Account = new Account();
  public msg: string;
  error = false;

  constructor(
    private accountApi: AccountApiService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    console.log(this.id);
    this.accountApi.get(this.id).subscribe((data:Account)=>{
      this.account.name = data.name;
      this.account.email = data.email;
      this.account.password = data.password;
      this.account.role = data.role;
    })
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
