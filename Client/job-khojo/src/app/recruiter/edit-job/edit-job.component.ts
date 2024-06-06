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
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css',
})
export class EditJobComponent {
  id: string | null = '0';
  editJobForm!: FormGroup<{
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    openings: FormControl<number | null>;
    isActive: FormControl<boolean | null>;
  }>;
  job!: Job;

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
    this.service.getJob(this.id).subscribe((res) => {
      this.job = res.data;

      this.editJobForm.patchValue({
        title: this.job.title,
        description: this.job.description,
        openings: this.job.openings,
        isActive: this.job.isActive,
      });
    });
  }

  initializeForm() {
    this.editJobForm = this.fb.group({
      title: ['', [Validators.required, spaceValidator]],
      description: ['', [Validators.required, spaceValidator]],
      openings: [1, [Validators.required, Validators.min(1)]],
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

      this.service.editJob(this.job).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['recruiter']);
        }
      });
    }
  }
}
