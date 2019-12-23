import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AccountApiService, Account } from 'src/app/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public modalRef: BsModalRef;
  public iconNew = faPlus;
   
  constructor(private accountService: AccountApiService) { }
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

}
