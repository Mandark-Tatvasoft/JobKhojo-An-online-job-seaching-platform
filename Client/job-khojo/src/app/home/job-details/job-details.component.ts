import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Job } from '../../core/models/job.model';
import { HomeService } from '../services/home.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JobType } from '../../core/models/job-type.model';
import { Location } from '../../core/models/location.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent {
  id: string | null = '0';
  job!: Job;
  jobTypes: JobType[] = [];
  locations: Location[] = [];
  isApplied: boolean = false;
  isRecruiter: boolean = localStorage.getItem('role') == '2' ? true : false;

  constructor(
    private service: HomeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  getJob() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getJobById(this.id).subscribe((res) => {
      if (res.isSuccess) {
        this.job = res.data;
        this.isApplied = res.data.isApplied;
      }
    });
  }

  getJobTypes() {
    this.service.getJobTypes().subscribe((res) => {
      if (res.isSuccess) {
        this.jobTypes = res.data;
      }
    });
  }

  getLocations() {
    this.service.getLocations().subscribe((res) => {
      if (res.isSuccess) {
        this.locations = res.data;
      }
    });
  }

  ngOnInit() {
    this.getJob();
    this.getJobTypes();
    this.getLocations();
  }

  getLocation(id: number) {
    return this.locations
      .find((e) => e.locationId == id)
      ?.locationName.toString();
  }

  getJobType(id: number) {
    return this.jobTypes.find((e) => e.jobTypeId == id)?.jobType.toString();
  }

  apply(jobId: number | undefined) {
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

  getHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.job.description);
  }
}
