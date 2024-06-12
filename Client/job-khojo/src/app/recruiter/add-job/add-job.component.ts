import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from '../services/recruiter.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Job } from '../../core/models/job.model';
import { spaceValidator } from '../../core/validators/whitespace.validator';
import { Location } from '../../core/models/location.model';
import { MatSelectModule } from '@angular/material/select';
import { JobType } from '../../core/models/job-type.model';
import { CommonModule } from '@angular/common';
import { ModelFormGroup } from '../../core/models/form-type.model';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
})
export class AddJobComponent {
  addJobForm!: ModelFormGroup<Job>;
  job!: Job;

  jobTypes: JobType[] = [];
  locations: Location[] = [];

  constructor(
    private service: RecruiterService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.service.getJobTypes().subscribe((res) => {
      if (res.isSuccess) {
        this.jobTypes = res.data;
      }
    });

    this.service.getLocations().subscribe((res) => {
      if (res.isSuccess) {
        this.locations = res.data;
      }
    });
  }

  initializeForm() {
    this.addJobForm = this.fb.group({
      title: ['', [Validators.required, spaceValidator]],
      subtitle: ['', [Validators.required, spaceValidator]],
      description: ['', [Validators.required, spaceValidator]],
      openings: [1, [Validators.required, Validators.min(1)]],
      salary: [0, [Validators.required, Validators.min(1)]],
      jobType: [0, [Validators.required, Validators.min(1)]],
      createdBy: [0],
      location: [0, [Validators.required, Validators.min(1)]],
      isActive: [true],
    });
  }

  handleSubmit() {
    if (this.addJobForm.valid) {
      this.job.title = this.addJobForm.value.title
        ? this.addJobForm.value.title
        : '';
      this.job.description = this.addJobForm.value.description
        ? this.addJobForm.value.description
        : '';
      this.job.openings = this.addJobForm.value.openings
        ? this.addJobForm.value.openings
        : 0;
      this.job.isActive = this.addJobForm.value.isActive
        ? this.addJobForm.value.isActive
        : true;
      this.job.location = this.addJobForm.value.location
        ? this.addJobForm.value.location
        : 0;
      this.job.jobType = this.addJobForm.value.jobType
        ? this.addJobForm.value.jobType
        : 0;
      this.job.salary = this.addJobForm.value.salary
        ? this.addJobForm.value.salary
        : 0;
      this.job.subtitle = this.addJobForm.value.subtitle
        ? this.addJobForm.value.subtitle
        : '';

      this.service.addJob(this.job).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['recruiter']);
        }
      });
    }
  }
}
