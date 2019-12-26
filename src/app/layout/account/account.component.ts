import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AccountApiService, Account, DataService } from 'src/app/core';
import { RegisterComponent } from 'src/app/register/register.component';

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

  columns = ["User Id","Email", "Role" ];
  index = ["id", "email", "role"];
    
  account : Account[] = [];

  ngOnInit():void {
    this.accountService.getAll().subscribe(
    (response) => {
      this.account = response;
    },
    (error) => console.log(error)
    )
  }
  
  public openCreateModal() {
    this.modal = this.modalService.show(RegisterComponent)
    this.modal.content.event.subscribe(Account => {
      this.accountService.create(Account).subscribe(
        () => {
          this.accountService.getAll();
          this.modal.hide();
        }
      )
    })
  }

}
