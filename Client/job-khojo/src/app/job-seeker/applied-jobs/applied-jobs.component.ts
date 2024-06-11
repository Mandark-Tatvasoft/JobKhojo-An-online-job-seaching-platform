import { Component } from '@angular/core';
import { Job } from '../../core/models/job.model';
import { JobSeekerService } from '../services/job-seeker.service';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from '../../shared/components/job-card/job-card.component';

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [CommonModule, JobCardComponent],
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.css',
})
export class AppliedJobsComponent {
  constructor(private service: JobSeekerService) {}

  savedJobs: Job[] = [];

  ngOnInit() {
    this.service.getAppliedJobs().subscribe((res) => {
      if (res.isSuccess) {
        this.savedJobs = res.data;
      }
    });
  }
}
