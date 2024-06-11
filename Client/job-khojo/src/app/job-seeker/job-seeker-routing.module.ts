import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'saved-jobs', component: SavedJobsComponent },
  { path: 'applied-jobs', component: AppliedJobsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobSeekerRoutingModule {}
