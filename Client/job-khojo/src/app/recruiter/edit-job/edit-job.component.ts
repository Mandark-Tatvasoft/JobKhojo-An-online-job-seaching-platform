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
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { SafeHtml } from '@angular/platform-browser';
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
    CommonModule,
    MatSelectModule,
    NgxEditorModule,
  ],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css',
})
export class EditJobComponent {
  id: string | null = '0';
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  editJobForm!: ModelFormGroup<Job>;
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

  fetchJob() {
    this.service.getJob(this.id).subscribe((res) => {
      this.job = res.data;

      this.editJobForm.patchValue(res.data);
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.editor = new Editor();

    this.getJobTypes();
    this.getLocations();
    this.fetchJob();
  }

  initializeForm() {
    this.editJobForm = this.fb.group({
      jobId: [0],
      title: ['', [Validators.required, spaceValidator]],
      subtitle: [
        '',
        [Validators.required, Validators.maxLength(50), spaceValidator],
      ],
      description: ['', [Validators.required, spaceValidator]],
      openings: [1, [Validators.required, Validators.min(1)]],
      salary: [0, [Validators.required, Validators.min(1)]],
      jobType: [0, [Validators.required, Validators.min(1)]],
      location: [0, [Validators.required, Validators.min(1)]],
      createdBy: [0],
      isActive: [true],
    });
  }

  handleSubmit() {
    if (this.editJobForm.valid) {
      this.job = <Job>this.editJobForm.value;
      this.service.editJob(this.job).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['recruiter']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
