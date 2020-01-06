import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AccountApiService, Account, DataService } from 'src/app/core';
import { RegisterComponent } from 'src/app/register/register.component';
import { ReplaySubject } from 'rxjs';
import { AccountEditComponent } from './account-edit/account-edit.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public modalRef: BsModalRef;
  public iconNew = faPlus;
  public modal: BsModalRef;
  public value : String;

  constructor(
    private accountApi: AccountApiService,
    private modalService: BsModalService
    ) { }
  columns = ["User Id","Name", "Email", "Role","" ];
  index = ["id","name", "email", "role"];
  accounts = [];
  accounts$ =new ReplaySubject<Account[]>();

  ngOnInit():void {
     this.accountApi.accounts$.subscribe(data => {
      this.accounts$.next(data);
    })
    this.accountApi.getAll();
    /*this.getAllAccounts()*/
  }

  public getByEmail() {
    this.accountApi.getByEmail(this.value).subscribe((data: Account[])=> {
      this.accounts$.next(data);
    });
  }

  public deleteAccount(id) {
    this.accountApi.delete(id).subscribe( (data:any) =>{
     /*  this.accounts$.next(data); */
     this.accountApi.getAll();
    });
  }

  public accountEdit(id: number) {
    const initialState = {
      id: id,
  };
    this.modal = this.modalService.show(AccountEditComponent, {initialState})
    this.modalService.onHide.subscribe((account: Account) => {
      this.accountApi.getAll();
  });
  }

 /*  getAllAccounts() {
    this.accountService.getAll().subscribe(
      (response) => {
        this.accounts = response;
      },
      (error) => console.log(error)
      )
  } */

  public openCreateModal() {
    this.modal = this.modalService.show(RegisterComponent)
    this.modalService.onHide.subscribe(() => {
      this.accountApi.getAll();
  });
  }

}
