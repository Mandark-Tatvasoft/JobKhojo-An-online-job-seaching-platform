import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Job } from '../../core/models/job.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '../../core/models/location.model';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  constructor(private service: AdminService, private router: Router) {}

  jobs: Job[] = [];
  locations: Location[] = [];

  ngOnInit() {
    this.service.getAllJobs().subscribe((res) => {
      if (res.isSuccess) {
        this.jobs = res.data;
      }
    });

    this.service.getLocations().subscribe((res) => {
      if (res.isSuccess) {
        this.locations = res.data;
      }
    });
  }

  editJob(jobId: number | undefined) {
    this.router.navigate(['admin/jobs/edit-job', jobId]);
  }

  addJob() {
    this.router.navigate(['admin/jobs/add-job']);
  }

  getLocation(id: number) {
    return this.locations.find((e) => e.locationId == id)?.locationName;
  }
}
