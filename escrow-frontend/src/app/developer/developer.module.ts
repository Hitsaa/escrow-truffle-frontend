import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperPageComponent } from './developer-page/developer-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectModule } from '../project/project.module';


@NgModule({
  declarations: [
    DeveloperPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectModule,
  ]
})
export class DeveloperModule { }
