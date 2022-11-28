import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPageComponent } from './client/client-page/client-page.component';
import { DeveloperPageComponent } from './developer/developer-page/developer-page.component';
import { EscrowPageComponent } from './escrow/escrow-page/escrow-page.component';
import { HitsaTokenComponent } from './hitsa-token/hitsa-token/hitsa-token.component';
import { HomeComponent } from './home/home.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'client', component: ClientPageComponent},
  {path: 'escrow', component: EscrowPageComponent},
  {path: 'developer', component: DeveloperPageComponent},
  {path: 'token', component: HitsaTokenComponent},
  {path: 'project-detail', component: ProjectDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
