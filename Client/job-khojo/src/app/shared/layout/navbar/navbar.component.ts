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

  constructor(private router: Router) {}

  ngDoCheck() {
    this.checkLogin();
  }

  checkLogin() {
    let role = localStorage.getItem('role');
    if (role) {
      this.isLoggedIn = true;
    }
  }

  signOut() {
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
