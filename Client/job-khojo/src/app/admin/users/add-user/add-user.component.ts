import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Router } from '@angular/router';
import { NewUser } from '../../../core/models/signup.model';
import { confirmPasswordValidator } from '../../../core/validators/passwordmatch.validator';
import { spaceValidator } from '../../../core/validators/whitespace.validator';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-user',
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
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  userForm!: FormGroup;
  model: NewUser = {
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
    private router: Router,
    private service: AdminService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this.fb.group({
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
      firstname: ['', [Validators.required, spaceValidator]],
      lastname: [''],
      mobile: ['', [Validators.required, Validators.pattern('[789]\\d{9}')]],
      role: [0, [Validators.required, Validators.min(1)]],
      companyName: ['', spaceValidator],
    });
  }

  handleSubmit() {
    if (this.userForm.valid) {
      this.model.firstname = this.userForm.value.firstname;
      this.model.lastname = this.userForm.value.lastname;
      this.model.email = this.userForm.value.email;
      this.model.role = this.userForm.value.role;
      this.model.password = this.userForm.value.password;
      this.model.confirmPassword = this.userForm.value.confirmPassword;
      this.model.companyName = this.userForm.value.companyName;
      this.model.mobile = this.userForm.value.mobile;
      this.model.username = this.userForm.value.username;

      this.service.addUser(this.model).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['admin/users']);
        }
      });
    }
  }
}
