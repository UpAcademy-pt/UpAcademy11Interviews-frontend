import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Account, AccountApiService } from 'src/app/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountEditComponent implements OnInit {
  editPassword = false;
  Roles: any = ['Admin', 'Superuser', 'User'];
  id: number;
  public account: Account = new Account();
  public msg: string;
  error = false;
  isInvalid = false;

  constructor(
    private accountApi: AccountApiService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    console.log(this.id);
    this.accountApi.get(this.id).subscribe((data: Account) => {
      this.account.firstName = data.firstName;
      this.account.lastName = data.lastName;
      this.account.email = data.email;
      this.account.hashcode = data.hashcode;
      this.account.role = data.role;
    })
  }

  public editAccount() {
    if (this.account.firstName == '' || this.account.lastName == '' || this.account.email == '' || this.account.password == '') {
      this.isInvalid = true;
    } else {
      if (this.editPassword == true) {
        const userToEdit: Account = new Account();
        Object.assign(userToEdit, this.account);
        delete userToEdit.hashcode;
        userToEdit.password = this.account.hashcode;
        this.accountApi.updatePassword(this.id, userToEdit).subscribe(
          (account: any) => {
            this.bsModalRef.hide()
          },
          (error) => {
            console.log(error);
            this.msg = 'Invalid fields.';
            this.error = true;
          }
        );
      }
      else {
        this.accountApi.update(this.id, this.account).subscribe(
          (account: any) => {
          },
          (error) => {
            console.log(error);
            this.msg = 'Invalid fields.';
            this.error = true;
          }
        );
      }
    }
  }

}
