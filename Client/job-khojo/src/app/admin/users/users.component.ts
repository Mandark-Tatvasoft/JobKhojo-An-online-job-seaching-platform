import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Userdata } from '../../core/models/user-data.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSlideToggleModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  constructor(private service: AdminService, private router: Router) {}

  users: Userdata[] = [];

  ngOnInit() {
    this.service.getUsers().subscribe((res) => {
      this.users = res.data;
    });
  }

  editUser(userId: number) {
    this.router.navigate(['admin/users/edit-user', userId]);
  }

  addUser() {
    this.router.navigate(['admin/users/add-user']);
  }

  disableUser(userId: number) {
    this.service.disableUser(userId).subscribe();
  }
}
