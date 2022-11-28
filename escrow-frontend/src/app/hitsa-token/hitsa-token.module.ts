import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HitsaTokenComponent } from './hitsa-token/hitsa-token.component';



@NgModule({
  declarations: [
    HitsaTokenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HitsaTokenComponent]
})
export class HitsaTokenModule { }
