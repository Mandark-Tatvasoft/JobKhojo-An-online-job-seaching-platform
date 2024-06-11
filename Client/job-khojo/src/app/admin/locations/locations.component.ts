import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Location } from '../../core/models/location.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent {
  constructor(private service: AdminService, private router: Router) {}

  locations: Location[] = [];

  ngOnInit() {
    this.service.getLocations().subscribe((res) => {
      this.locations = res.data;
    });
  }

  addLocation() {
    this.router.navigate(['admin/locations/add-location']);
  }

  editLocation(locationId: number) {
    this.router.navigate(['admin/locations/edit-location', locationId]);
  }
}
