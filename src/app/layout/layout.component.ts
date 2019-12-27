import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {

  private _opened: boolean = true;

  Technology: any = ['JAVA', 'JS', 'AngularJS', 'HTML', 'CSS'];

  Difficulty: any = ['1', '2', '3', '4', '5'];

  Roles: any = ['beginner', 'medium', 'advanced', 'pro'];

  



  
  constructor() { }

  ngOnInit() { }


  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}