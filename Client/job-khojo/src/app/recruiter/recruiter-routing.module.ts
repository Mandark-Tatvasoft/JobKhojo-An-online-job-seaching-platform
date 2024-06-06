import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { AddJobComponent } from './add-job/add-job.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit-job/:id', component: EditJobComponent },
  { path: 'add-job', component: AddJobComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterRoutingModule {}
