import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Signup } from '../../core/models/signup.model';
import { confirmPasswordValidator } from '../../core/validators/passwordmatch.validator';
import { spaceValidator } from '../../core/validators/whitespace.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm!: FormGroup;
  model: Signup = {
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 0,
    companyName: '',
    resume: '',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.signUpForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[\\w-]+@([\\w-]+.)+[\\w-]{2,4}$'),
          Validators.email,
        ],
      ],
      username: [
        '',
        [Validators.required, Validators.minLength(3), spaceValidator],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
      firstname: ['', Validators.required, spaceValidator],
      lastname: [''],
      mobile: ['', Validators.pattern('[789]\\d{9}')],
      role: [, Validators.required],
      companyName: ['', spaceValidator],
    });
  }
  handleSubmit() {
    if (this.signUpForm.valid) {
      this.model.firstname = this.signUpForm.value.firstname;
      this.model.lastname = this.signUpForm.value.lastname;
      this.model.email = this.signUpForm.value.email;
      this.model.role = this.signUpForm.value.role;
      this.model.password = this.signUpForm.value.password;
      this.model.confirmPassword = this.signUpForm.value.confirmPassword;
      this.model.companyName = this.signUpForm.value.companyName;
      this.model.mobile = this.signUpForm.value.mobile;
      this.model.username = this.signUpForm.value.username;

      this.authService.signup(this.model).subscribe((data) => {
        if (data.isSuccess) {
          this.router.navigate(['login']);
          this.toastr.success(data.message, 'Successfully Created user!', {
            timeOut: 2000,
          });
        }
      });
    }
  }
}
