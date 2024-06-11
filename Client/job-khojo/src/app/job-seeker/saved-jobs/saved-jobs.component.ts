import { Component } from '@angular/core';
import { JobCardComponent } from '../../shared/components/job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { JobSeekerService } from '../services/job-seeker.service';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-saved-jobs',
  standalone: true,
  imports: [JobCardComponent, CommonModule],
  templateUrl: './saved-jobs.component.html',
  styleUrl: './saved-jobs.component.css',
})
export class SavedJobsComponent {
  constructor(private service: JobSeekerService) {}

  savedJobs: Job[] = [];

  ngOnInit() {
    this.service.getSavedJobs().subscribe((res) => {
      if (res.isSuccess) {
        this.savedJobs = res.data;
      }
    });
  }
}
