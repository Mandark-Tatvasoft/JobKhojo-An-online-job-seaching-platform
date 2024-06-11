import { Component, Input, input } from '@angular/core';
import { Job } from '../../../core/models/job.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { JobType } from '../../../core/models/job-type.model';
import { Location } from '../../../core/models/location.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input() Job: Job = {
    jobId: 0,
    title: 'test',
    subtitle: '',
    description: 'test desc',
    openings: 0,
    salary: 0,
    location: 0,
    jobType: 0,
    createdBy: 0,
    isActive: true,
    appliedBy: 0,
  };
  @Input() isSavedJobPage: boolean = false;
  isRecruiter: boolean = false;
  isSeeker: boolean = true;
  jobTypes: JobType[] = [];
  locations: Location[] = [];

  constructor(private router: Router, private service: SharedService) {}

  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if (role == '2') {
      this.isRecruiter = true;
      this.isSeeker = false;
    } else if (role == '3' || role == null) {
      this.isSeeker = true;
      this.isRecruiter = false;
    }

    this.service.getJobTypes().subscribe((res) => {
      if (res.isSuccess) {
        this.jobTypes = res.data;
      }
    });

    this.service.getLocations().subscribe((res) => {
      if (res.isSuccess) {
        this.locations = res.data;
      }
    });
  }

  editJob(id: number) {
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

  openJob(id: number) {
    this.router.navigate(['job-details', id]);
  }

  saveJob(jobId: number) {
    if (localStorage.getItem('userid')) {
      this.service.saveJob(jobId).subscribe();
    } else {
      this.router.navigate(['login']);
    }
  }
}
