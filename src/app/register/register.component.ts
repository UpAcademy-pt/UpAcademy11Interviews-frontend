import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Superuser', 'User'];
  

  constructor(private location: Location)
  { }

  ngOnInit() {
  }

  public back() {
    this.location.back();
  }
}