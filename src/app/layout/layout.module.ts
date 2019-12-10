import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from "@angular/forms";

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {from} from "rxjs";



@NgModule({
  declarations: [LayoutComponent, MainComponent, HeaderComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule
  ]
})
export class LayoutModule { }
