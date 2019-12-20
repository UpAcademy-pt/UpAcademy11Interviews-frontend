import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  private _opened: boolean = false;
  
  constructor() { }

  ngOnInit() { }


  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}