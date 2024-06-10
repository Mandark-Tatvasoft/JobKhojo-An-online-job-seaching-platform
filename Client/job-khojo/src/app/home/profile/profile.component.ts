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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(
    private fb: FormBuilder,
    private service: HomeService,
    private router: Router
  ) {
    this.initializeForm();
  }

  resume: string = '';

  profileForm!: FormGroup<{
    username: FormControl<string | null>;
    firstname: FormControl<string | null>;
    lastname: FormControl<string | null>;
    email: FormControl<string | null>;
    mobile: FormControl<string | null>;
    resume: FormControl<string | null>;
    userId: FormControl<number | null>;
  }>;

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
      mobile: ['', Validators.pattern('[789]\\d{9}')],
      resume: [''],
      userId: [0],
    });
  }
}
