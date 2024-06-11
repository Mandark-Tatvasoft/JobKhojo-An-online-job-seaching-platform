import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isSeeker: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngDoCheck() {
    this.checkLogin();
  }

  checkLogin() {
    let role = localStorage.getItem('role');
    if (role) {
      this.isLoggedIn = true;
      if (role == '3') {
        this.isSeeker = true;
        this.isAdmin = false;
      } else if (role == '1') {
        this.isSeeker = false;
        this.isAdmin = true;
      } else {
        this.isSeeker = false;
        this.isAdmin = false;
      }
    }
  }

  signOut() {
    localStorage.removeItem('role');
    localStorage.removeItem('userid');
    localStorage.removeItem('jwtToken');
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
