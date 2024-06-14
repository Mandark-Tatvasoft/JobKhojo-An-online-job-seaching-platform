import { Component } from '@angular/core';
import { JobCardComponent } from '../../shared/components/job-card/job-card.component';
import { Job } from '../../core/models/job.model';
import { RecruiterService } from '../services/recruiter.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { JobType } from '../../core/models/job-type.model';
import { Location } from '../../core/models/location.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JobCardComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  jobs: any;
  jobTypes: JobType[] = [];
  locations: Location[] = [];

  constructor(
    private recruiterService: RecruiterService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    let id = localStorage.getItem('userid');
    this.recruiterService.getJobs(id).subscribe((res) => {
      console.log(res);

      this.jobs = res.data;
    });

    this.getLocations();
    this.getJobTypes();
  }

  openJob(id: number | undefined) {
    this.router.navigate(['job-details', id]);
  }

  editJob(id: number | undefined) {
    this.router.navigate(['recruiter/edit-job', id]);
  }

  getLocation(id: number) {
    return this.locations
      .find((e) => e.locationId == id)
      ?.locationName.toString();
  }

  getJobType(id: number) {
    return this.jobTypes.find((e) => e.jobTypeId == id)?.jobType.toString();
  }

  openDeleteDialog(jobId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { jobId: jobId },
    });
  }

  getJobTypes() {
    this.recruiterService.getJobTypes().subscribe((res) => {
      if (res.isSuccess) {
        this.jobTypes = res.data;
      }
    });
  }

  getLocations() {
    this.recruiterService.getLocations().subscribe((res) => {
      if (res.isSuccess) {
        this.locations = res.data;
      }
    });
  }
}
