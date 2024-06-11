import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../core/models/job.model';
import { HomeService } from '../services/home.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JobType } from '../../core/models/job-type.model';
import { Location } from '../../core/models/location.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent {
  id: string | null = '0';
  job: Job = {
    jobId: 0,
    title: '',
    subtitle: '',
    description: '',
    openings: 0,
    salary: 0,
    location: 0,
    jobType: 0,
    createdBy: 0,
    isActive: false,
    appliedBy: 0,
  };
  jobTypes: JobType[] = [];
  locations: Location[] = [];
  isApplied: boolean = false;

  constructor(
    private service: HomeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getJobById(this.id).subscribe((res) => {
      if (res.isSuccess) {
        this.job = res.data;
        this.isApplied = res.data.isApplied;
      }
    });

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

  getLocation(id: number) {
    return this.locations
      .find((e) => e.locationId == id)
      ?.locationName.toString();
  }

  getJobType(id: number) {
    return this.jobTypes.find((e) => e.jobTypeId == id)?.jobType.toString();
  }

  apply(jobId: number) {
    let userId = localStorage.getItem('userid');
    if (userId) {
      this.service.getUser().subscribe((res) => {
        if (res.data.resume != '' && res.data.resume != null) {
          this.service.applyForJob(jobId).subscribe();
        } else {
          localStorage.setItem('path', this.router.url);
          this.toastr.warning('You need to upload resume', 'Warning', {
            timeOut: 2000,
          });
          this.router.navigate(['profile']);
        }
      });
    } else {
      localStorage.setItem('path', this.router.url);
      this.router.navigate(['login']);
    }
  }
}
