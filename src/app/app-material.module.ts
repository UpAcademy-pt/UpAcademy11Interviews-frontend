import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
   imports: [
      
      MatCardModule,
      MatFormFieldModule
   ],
   exports: [
      MatCardModule,
      MatFormFieldModule
   ],
   providers: [
     ,
   ]
})

export class AngularMaterialModule { }