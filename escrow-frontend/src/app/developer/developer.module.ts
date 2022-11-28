import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperPageComponent } from './developer-page/developer-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectModule } from '../project/project.module';


@NgModule({
  declarations: [
    DeveloperPageComponent
  ],
  imports: [
    CommonModule,
    ProjectModule,
    ReactiveFormsModule,
  ]
})
export class DeveloperModule { }
