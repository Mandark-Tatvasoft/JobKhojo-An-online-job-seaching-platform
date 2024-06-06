import { Component } from '@angular/core';
import { JobCardComponent } from '../../shared/components/job-card/job-card.component';
import { Job } from '../../core/models/job.model';
import { RecruiterService } from '../services/recruiter.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JobCardComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  jobs: Job[] = [];

  constructor(private recruiterService: RecruiterService) {}

  ngOnInit() {
    let id = localStorage.getItem('userid');
    this.recruiterService.getJobs(id).subscribe((res) => {
      this.jobs = res.data;
    });
  }
}
