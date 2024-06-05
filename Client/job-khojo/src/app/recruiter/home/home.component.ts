import { Component } from '@angular/core';
import { JobCardComponent } from '../../shared/components/job-card/job-card.component';
import { Job } from '../../core/models/job.model';
import { RecruiterService } from '../services/recruiter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JobCardComponent, CommonModule],
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
