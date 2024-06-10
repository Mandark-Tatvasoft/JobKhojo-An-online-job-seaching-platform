import { Component } from '@angular/core';
import { JobCardComponent } from '../../shared/components/job-card/job-card.component';
import { Job } from '../../core/models/job.model';
import { JobSeekerService } from '../services/job-seeker.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JobCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  jobs: Job[] = [];

  constructor(private service: JobSeekerService, private router: Router) {}

  ngOnInit(): void {
    this.service.getJobs().subscribe((res) => {
      if (res.isSuccess) {
        this.jobs = res.data;
      }
    });
  }
}
