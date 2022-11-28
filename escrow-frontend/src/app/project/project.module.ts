import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailComponent } from './project-detail/project-detail.component';



@NgModule({
  declarations: [
    ProjectDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ProjectDetailComponent]
})
export class ProjectModule { }
