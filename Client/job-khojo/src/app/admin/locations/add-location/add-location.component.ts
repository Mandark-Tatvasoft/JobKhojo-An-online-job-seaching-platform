import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminService } from '../../services/admin.service';
import { spaceValidator } from '../../../core/validators/whitespace.validator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '../../../core/models/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.css',
})
export class AddLocationComponent {
  addLocationForm!: FormGroup<{
    locationName: FormControl<string | null>;
  }>;
  location: Location = {
    locationId: 0,
    locationName: '',
  };

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.addLocationForm = this.fb.group({
      locationName: [
        '',
        [Validators.required, spaceValidator, Validators.maxLength(50)],
      ],
    });
  }

  handleSubmit() {
    if (this.addLocationForm.valid) {
      this.location.locationName = this.addLocationForm.value.locationName
        ? this.addLocationForm.value.locationName
        : '';
      this.service.addLocation(this.location).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['admin/locations']);
        }
      });
    }
  }
}
