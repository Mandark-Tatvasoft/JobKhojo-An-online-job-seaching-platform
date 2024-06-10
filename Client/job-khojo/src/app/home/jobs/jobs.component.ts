import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { Job } from '../../core/models/job.model';
import { JobCardComponent } from '../../shared/components/job-card/job-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [JobCardComponent, CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  jobs: Job[] = [];

  constructor(private service: HomeService) {}

  ngOnInit(): void {
    this.service.getJobs().subscribe((res) => {
      if (res.isSuccess) {
        this.jobs = res.data;
      }
    });
  }
}
