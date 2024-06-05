import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Login } from '../../core/models/signin.model';
import { Observable } from 'rxjs';
import { Signup } from '../../core/models/signup.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = 'https://localhost:7083/Auth/Login';
  signupUrl = 'https://localhost:7083/Auth/Signup';

  constructor(private api: ApiService) {}

  login(model: Login) {
    return this.api.post(this.loginUrl, model);
  }

  signup(model: Signup) {
    return this.api.post(this.signupUrl, model);
  }
}
