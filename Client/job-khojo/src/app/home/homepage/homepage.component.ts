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
import { Location } from '../../core/models/location.model';
import { JobType } from '../../core/models/job-type.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { title } from 'process';
import { ModelFormGroup } from '../../core/models/form-type.model';
import { Search } from '../../core/models/search.model';

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
    ReactiveFormsModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  jobs: Job[] = [];
  locations: Location[] = [];
  jobTypes: JobType[] = [];
  searchForm!: ModelFormGroup<Search>;

  constructor(
    private service: HomeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  getJobs() {
    this.service.getJobs().subscribe((res) => {
      if (res.isSuccess) {
        this.jobs = res.data;
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
    this.getJobs();
    this.getJobTypes();
    this.getLocations();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      title: [''],
      jobType: [0],
      location: [0],
    });
  }

  handleSubmit() {
    this.router.navigate(['jobs'], {
      queryParams: {
        title: this.searchForm.value.title,
        jobType: this.searchForm.value.jobType,
        location: this.searchForm.value.location,
      },
    });
  }
}
