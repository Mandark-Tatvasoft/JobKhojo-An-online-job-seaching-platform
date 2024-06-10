import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { JobType } from '../../core/models/job-type.model';
import { Location } from '../../core/models/location.model';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css',
})
export class EditJobComponent {
  id: string | null = '0';
  editJobForm!: FormGroup<{
    title: FormControl<string | null>;
    subtitle: FormControl<string | null>;
    description: FormControl<string | null>;
    openings: FormControl<number | null>;
    salary: FormControl<number | null>;
    jobType: FormControl<number | null>;
    location: FormControl<number | null>;
    isActive: FormControl<boolean | null>;
  }>;
  job!: Job;
  jobTypes: JobType[] = [];
  locations: Location[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: RecruiterService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

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

    this.service.getJob(this.id).subscribe((res) => {
      this.job = res.data;

      this.editJobForm.patchValue({
        title: this.job.title,
        description: this.job.description,
        openings: this.job.openings,
        isActive: this.job.isActive,
        subtitle: this.job.subtitle,
        location: this.job.location,
        jobType: this.job.jobType,
        salary: this.job.salary,
      });
    });
  }

  initializeForm() {
    this.editJobForm = this.fb.group({
      title: ['', [Validators.required, spaceValidator]],
      subtitle: ['', [Validators.required, spaceValidator]],
      description: ['', [Validators.required, spaceValidator]],
      openings: [1, [Validators.required, Validators.min(1)]],
      salary: [0, [Validators.required, Validators.min(1)]],
      jobType: [0, [Validators.required, Validators.min(1)]],
      location: [0, [Validators.required, Validators.min(1)]],
      isActive: [true],
    });
  }

  handleSubmit() {
    if (this.editJobForm.valid) {
      this.job.title = this.editJobForm.value.title
        ? this.editJobForm.value.title
        : '';
      this.job.description = this.editJobForm.value.description
        ? this.editJobForm.value.description
        : '';
      this.job.openings = this.editJobForm.value.openings
        ? this.editJobForm.value.openings
        : 0;
      this.job.isActive = this.editJobForm.value.isActive
        ? this.editJobForm.value.isActive
        : true;
      this.job.location = this.editJobForm.value.location
        ? this.editJobForm.value.location
        : 0;
      this.job.jobType = this.editJobForm.value.jobType
        ? this.editJobForm.value.jobType
        : 0;
      this.job.salary = this.editJobForm.value.salary
        ? this.editJobForm.value.salary
        : 0;
      (this.job.subtitle = this.editJobForm.value.subtitle
        ? this.editJobForm.value.subtitle
        : ''),
        this.service.editJob(this.job).subscribe((res) => {
          if (res.isSuccess) {
            this.router.navigate(['recruiter']);
          }
        });
    }
  }
}
