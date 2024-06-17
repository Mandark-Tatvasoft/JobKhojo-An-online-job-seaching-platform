import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Job } from '../../core/models/job.model';
import { JobCardComponent } from '../../shared/components/job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Location } from '../../core/models/location.model';
import { JobType } from '../../core/models/job-type.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModelFormGroup } from '../../core/models/form-type.model';
import { Search } from '../../core/models/search.model';
import { error } from 'node:console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    JobCardComponent,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    JobCardComponent,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  jobs: Job[] = [];
  locations: Location[] = [];
  jobTypes: JobType[] = [];
  searchForm!: ModelFormGroup<Search>;

  constructor(
    private service: HomeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.initializeForm();
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

  ngOnInit(): void {
    this.getJobTypes();
    this.getLocations();

    if (
      this.route.snapshot.queryParamMap.get('title') ||
      this.route.snapshot.queryParamMap.get('jobType') ||
      this.route.snapshot.queryParamMap.get('location')
    ) {
      let search: Search = {
        title: <string>this.route.snapshot.queryParamMap.get('title'),
        jobType: parseInt(
          <string>this.route.snapshot.queryParamMap.get('jobType')
        ),
        location: parseInt(
          <string>this.route.snapshot.queryParamMap.get('location')
        ),
      };
      this.searchJobs(search);
    } else {
      this.getJobs();
    }
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      title: [''],
      jobType: [0],
      location: [0],
    });
  }

  handleSubmit() {
    if (this.router.url.split('?')[0] != '/jobs') {
      let search = <Search>this.searchForm.value;
      this.router.navigate(['jobs'], {
        queryParams: { search },
      });
    } else {
      let search = <Search>this.searchForm.value;
      this.searchJobs(search);
    }
  }

  searchJobs(model: Search) {
    this.service.searchJobs(model).subscribe(
      (res) => {
        if (res.isSuccess) {
          this.jobs = res.data;
        }
      },
      (error: Error) => {
        this.toastr.error(error.message, 'Error', { timeOut: 2000 });
      }
    );
  }

  getJobs() {
    this.service.getAllJobs().subscribe((res) => {
      if (res.isSuccess) {
        this.jobs = res.data;
      }
    });
  }
}
