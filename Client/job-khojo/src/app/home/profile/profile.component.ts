import { Component } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { spaceValidator } from '../../core/validators/whitespace.validator';
import { MatButtonModule } from '@angular/material/button';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { ModelFormGroup } from '../../core/models/form-type.model';
import { Profile } from '../../core/models/profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  isSeeker: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: HomeService,
    private router: Router
  ) {
    this.initializeForm();
  }

  resume: string = '';

  profileForm!: ModelFormGroup<Profile>;

  ngOnInit() {
    this.service.getUser().subscribe((res) => {
      if (res.isSuccess) {
        this.profileForm.patchValue({
          username: res.data.username,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          mobile: res.data.mobile,
          userId: res.data.userId,
        });
        this.resume = res.data.resume;
      }
    });
    this.checkUser();
  }

  checkUser() {
    if (localStorage.getItem('role') == '3') {
      this.isSeeker = true;
    } else {
      this.isSeeker = false;
    }
  }

  handleSubmit() {
    this.service.editUser(this.profileForm.value).subscribe((res) => {
      var path = localStorage.getItem('path');
      if (path) {
        localStorage.removeItem('path');
        this.router.navigate([path.slice(1, path.length)]);
      }
    });
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required, spaceValidator]],
      lastname: [''],
      username: ['', [Validators.required, spaceValidator]],
      email: ['', [Validators.required, spaceValidator, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[789]\\d{9}')]],
      resume: [''],
      userId: [0],
      resumeFile: [new File([''], 'test')],
    });
  }

  patchFile(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.profileForm.patchValue({ resumeFile: file });
  }
}
