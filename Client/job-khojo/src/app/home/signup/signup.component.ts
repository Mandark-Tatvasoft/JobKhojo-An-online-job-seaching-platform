import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
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
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: [
        '',
        [Validators.required, this.confirmPasswordValidator],
      ],
      firstname: ['', Validators.required],
      lastname: [''],
      mobile: [''],
      role: [0, Validators.required],
      companyName: [''],
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

  confirmPasswordValidator(control: FormControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const passwordControl = control.root.get('password');
    if (!passwordControl) {
      return null;
    }

    if (control.value !== passwordControl.value) {
      return { passwordsDontMatch: true };
    }

    return null;
  }
}
