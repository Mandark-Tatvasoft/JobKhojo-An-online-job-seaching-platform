import { Component, Directive, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from '../services/recruiter.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Job } from '../../core/models/job.model';
import { Observable } from 'rxjs';
import { spaceValidator } from '../../core/validators/whitespace.validator';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
})
export class AddJobComponent {
  addJobForm!: FormGroup<{
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    openings: FormControl<number | null>;
    isActive: FormControl<boolean | null>;
  }>;
  job: Job = {
    jobId: 0,
    title: '',
    description: '',
    openings: 0,
    createdBy: 0,
    isActive: false,
    appliedBy: 0,
  };

  constructor(
    private service: RecruiterService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.addJobForm = this.fb.group({
      title: ['', [Validators.required, spaceValidator]],
      description: ['', [Validators.required, spaceValidator]],
      openings: [1, [Validators.required, Validators.min(1)]],
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
      console.log(this.job);

      this.service.addJob(this.job).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['recruiter']);
        }
      });
    }
  }
}
