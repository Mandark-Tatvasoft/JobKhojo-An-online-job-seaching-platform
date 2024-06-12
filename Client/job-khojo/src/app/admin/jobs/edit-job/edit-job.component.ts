import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { ModelFormGroup } from '../../../core/models/form-type.model';

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
  editJobForm!: ModelFormGroup<Job>;
  job!: Job;

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

  getJob() {
    this.service.getJob(this.jobId).subscribe((res) => {
      if (res.isSuccess) {
        this.editJobForm.patchValue(res.data);
        this.job.jobId = res.data.jobId;
      }
    });
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');

    this.getJobTypes();
    this.getLocations();
    this.getRecruiters();
    this.getJob();
  }

  initializeForm() {
    this.editJobForm = this.fb.group({
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
    if (this.editJobForm.valid) {
      this.job = <Job>this.editJobForm.value;

      this.service.editJob(this.job).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['admin/jobs']);
        }
      });
    }
  }
}
