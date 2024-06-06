import { Component, Input, input } from '@angular/core';
import { Job } from '../../../core/models/job.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input() Job: Job = {
    jobId: 0,
    title: 'test',
    description: 'test desc',
    openings: 0,
    createdBy: 0,
    isActive: true,
    appliedBy: 0,
  };
  isRecruiter: boolean = false;
  isSeeker: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if (role == '2') {
      this.isRecruiter = true;
    } else if (role == '3' || role == null) {
      this.isSeeker = true;
    }
  }

  editJob(id: number) {
    this.router.navigate(['recruiter/edit-job', id]);
  }
}
