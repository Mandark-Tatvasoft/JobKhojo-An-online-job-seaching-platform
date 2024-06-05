import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditJobComponent } from './edit-job/edit-job.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit-job/:id', component: EditJobComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterRoutingModule {}
