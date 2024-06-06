import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../../core/models/job.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent {
  id: string | null = '0';
  job: Job = {
    jobId: 0,
    title: '',
    description: '',
    openings: 0,
    createdBy: 0,
    isActive: false,
    appliedBy: 0,
  };

  constructor(private service: HomeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getJobById(this.id).subscribe((res) => {
      if (res.isSuccess) {
        this.job = res.data;
      }
    });
  }
}
