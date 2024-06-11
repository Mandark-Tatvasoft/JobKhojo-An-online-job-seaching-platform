import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobType } from '../../../core/models/job-type.model';
import { Job } from '../../../core/models/job.model';
import { Recruiter } from '../../../core/models/recruiter.model';
import { Location } from '../../../core/models/location.model';
import { spaceValidator } from '../../../core/validators/whitespace.validator';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css',
})
export class EditJobComponent {
  addJobForm!: FormGroup<{
    title: FormControl<string | null>;
    subtitle: FormControl<string | null>;
    description: FormControl<string | null>;
    openings: FormControl<number | null>;
    salary: FormControl<number | null>;
    jobType: FormControl<number | null>;
    recruiter: FormControl<number | null>;
    location: FormControl<number | null>;
    isActive: FormControl<boolean | null>;
  }>;
  job: Job = {
    jobId: 0,
    title: '',
    subtitle: '',
    description: '',
    openings: 0,
    salary: 0,
    location: 0,
    jobType: 0,
    createdBy: 0,
    isActive: false,
    appliedBy: 0,
  };

  jobTypes: JobType[] = [];
  locations: Location[] = [];
  recruiters: Recruiter[] = [];
  jobId: string | null = '0';

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');

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
    this.service.getRecruiters().subscribe((res) => {
      if (res.isSuccess) {
        this.recruiters = res.data;
      }
    });
    this.service.getJob(this.jobId).subscribe((res) => {
      if (res.isSuccess) {
        this.addJobForm.patchValue({
          title: res.data.title,
          subtitle: res.data.subtitle,
          description: res.data.description,
          openings: res.data.openings,
          salary: res.data.salary,
          jobType: res.data.jobType,
          location: res.data.location,
          isActive: res.data.isActive,
          recruiter: res.data.createdBy,
        });
      }
    });
  }

  initializeForm() {
    this.addJobForm = this.fb.group({
      title: ['', [Validators.required, spaceValidator]],
      subtitle: [
        '',
        [Validators.required, Validators.maxLength(50), spaceValidator],
      ],
      description: ['', [Validators.required, spaceValidator]],
      openings: [1, [Validators.required, Validators.min(1)]],
      salary: [0, [Validators.required, Validators.min(1)]],
      jobType: [0, [Validators.required, Validators.min(1)]],
      recruiter: [0, [Validators.required, Validators.min(1)]],
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
      this.job.createdBy = this.addJobForm.value.recruiter
        ? this.addJobForm.value.recruiter
        : 0;

      this.service.editJob(this.job).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['admin/jobs']);
        }
      });
    }
  }
}
