import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AccountApiService, Account, DataService } from 'src/app/core';
import { RegisterComponent } from 'src/app/register/register.component';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public modalRef: BsModalRef;
  public iconNew = faPlus;
  public modal: BsModalRef;

  constructor(
    private accountService: AccountApiService,
    private modalService: BsModalService
    ) { }
  columns = ["User Id","Name", "Email", "Role" ];
  index = ["id","name", "email", "role"];
    accounts = [];
  accounts$ =new ReplaySubject<Account[]>();

  ngOnInit():void {
     this.accountService.accounts$.subscribe(data => {
      this.accounts$.next(data);
    })
    this.accountService.getAll();
    /*this.getAllAccounts()*/
  }

 /*  getAllAccounts() {
    this.accountService.getAll().subscribe(
      (response) => {
        this.accounts = response;
      },
      (error) => console.log(error)
      )
  } */

  public applyFilter(filterValue: String) {
   
        this.accountService.getAll();
  }
  public openCreateModal() {
    this.modal = this.modalService.show(RegisterComponent)
    this.modalService.onHide.subscribe(() => {
      console.log('cheguei');
      this.accountService.getAll();
  });
  }

}
