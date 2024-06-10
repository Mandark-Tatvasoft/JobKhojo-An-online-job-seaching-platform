import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Job } from '../../core/models/job.model';
import { HomeService } from '../services/home.service';
import { JobCardComponent } from '../../shared/components/job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    JobCardComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  jobs: Job[] = [];

  constructor(private service: HomeService, private router: Router) {}

  ngOnInit() {
    this.service.getJobs().subscribe((res) => {
      if (res.isSuccess) {
        this.jobs = res.data;
      }
    });
  }
}
