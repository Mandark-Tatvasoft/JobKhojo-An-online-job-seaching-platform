import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobType } from '../../../core/models/job-type.model';
import { Job } from '../../../core/models/job.model';
import { Location } from '../../../core/models/location.model';
import { spaceValidator } from '../../../core/validators/whitespace.validator';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Recruiter } from '../../../core/models/recruiter.model';
import { ModelFormGroup } from '../../../core/models/form-type.model';

@Component({
  selector: 'app-add-job',
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
  recruiters: Recruiter[] = [];

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private router: Router
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

  getRecruiters() {
    this.service.getRecruiters().subscribe((res) => {
      if (res.isSuccess) {
        this.recruiters = res.data;
      }
    });
  }

  ngOnInit() {
    this.getJobTypes();
    this.getLocations();
    this.getRecruiters();
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
      salary: [
        0,
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      jobType: [0, [Validators.required, Validators.min(1)]],
      createdBy: [0, [Validators.required, Validators.min(1)]],
      location: [0, [Validators.required, Validators.min(1)]],
      isActive: [true],
    });
  }

  handleSubmit() {
    if (this.addJobForm.valid) {
      this.job = <Job>this.addJobForm.value;

      this.service.addJob(this.job).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['admin/jobs']);
        }
      });
    }
  }
}
