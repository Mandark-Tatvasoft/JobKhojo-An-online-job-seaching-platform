import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login } from '../../core/models/signin.model';
import { User } from '../../core/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  signInForm!: FormGroup;
  loginModel!: Login;
  user: User = {
    email: '',
    userId: 0,
    roleId: 0,
    userName: '',
    token: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  handleSubmit() {
    this.loginModel = this.signInForm.value;

    if (this.signInForm.valid) {
      this.service.login(this.loginModel).subscribe((res) => {
        if (res.isSuccess) {
          this.user = res.data;
          this.setUser();

          var path = localStorage.getItem('path');
          if (path) {
            localStorage.removeItem('path');
            this.router.navigate([path.slice(1, path.length)]);
          } else {
            switch (res.data.roleId) {
              case '1':
                this.router.navigate(['admin']);
                return;
              case '2':
                this.router.navigate(['recruiter']);
                return;
              case '3':
                this.router.navigate(['job-seeker']);
                return;
            }
          }
        }
      });
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('path');
  }

  setUser() {
    localStorage.setItem('role', this.user.roleId.toString());
    localStorage.setItem('userid', this.user.userId.toString());
    localStorage.setItem('jwtToken', this.user.token);
  }
}
