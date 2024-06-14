import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatBadgeModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isSeeker: boolean = false;
  isAdmin: boolean = false;
  appliedCount!: number;
  savedCount!: number;

  constructor(private router: Router, private service: SharedService) {}

  ngOnInit() {
    this.checkLogin();
    if (this.isSeeker) {
      this.getAppliedCount();
      this.getSavedCount();
    }
  }

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

  getAppliedCount() {
    this.service.getAppliedJobsCount().subscribe((res) => {
      if (res.isSuccess) {
        this.appliedCount = res.data;
      }
    });
  }

  getSavedCount() {
    this.service.getSavedJobsCount().subscribe((res) => {
      if (res.isSuccess) {
        this.savedCount = res.data;
      }
    });
  }
}
