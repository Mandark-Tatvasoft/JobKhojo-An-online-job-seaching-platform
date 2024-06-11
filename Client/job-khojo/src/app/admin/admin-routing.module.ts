import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { JobsComponent } from './jobs/jobs.component';
import { LocationsComponent } from './locations/locations.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { EditJobComponent } from './jobs/edit-job/edit-job.component';
import { AddLocationComponent } from './locations/add-location/add-location.component';
import { EditLocationComponent } from './locations/edit-location/edit-location.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/add-user', component: AddUserComponent },
  { path: 'users/edit-user/:id', component: EditUserComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/add-job', component: AddJobComponent },
  { path: 'jobs/edit-job/:id', component: EditJobComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'locations/add-location', component: AddLocationComponent },
  { path: 'locations/edit-location/:id', component: EditLocationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
