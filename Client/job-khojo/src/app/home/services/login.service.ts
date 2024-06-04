import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Login } from '../../core/models/signin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = 'https://localhost:7083/Auth/Login';
  signupUrl = 'https://localhost:7083/Auth/Signup';

  constructor(private api: ApiService) {}

  login(model: any) {
    return this.api.post(this.loginUrl, model);
  }

  signup(model: any) {
    return this.api.post(this.signupUrl, model);
  }
}
