import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NewUser } from '../../../core/models/signup.model';
import { spaceValidator } from '../../../core/validators/whitespace.validator';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  userForm!: FormGroup;
  model: NewUser = {
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    confirmPassword: '',
    roleId: 0,
    companyName: '',
    resume: '',
  };
  userId: string | null = '0';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    if (this.userId != '0') {
      this.service.getUser(this.userId).subscribe((res) => {
        if (res.isSuccess) {
          this.userForm.patchValue({
            email: res.data.email,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            mobile: res.data.mobile,
            roleId: res.data.roleId.toString(),
            companyName: res.data.companyName,
          });
        }
      });
    }
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
      firstname: ['', [Validators.required, spaceValidator]],
      lastname: [''],
      mobile: ['', [Validators.required, Validators.pattern('[789]\\d{9}')]],
      roleId: [0, [Validators.required, Validators.min(1)]],
      companyName: ['', spaceValidator],
    });
  }

  handleSubmit() {
    if (this.userForm.valid) {
      this.model = <NewUser>this.userForm.value;

      this.service.editUser(this.model, this.userId).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['admin/users']);
        }
      });
    }
  }
}
