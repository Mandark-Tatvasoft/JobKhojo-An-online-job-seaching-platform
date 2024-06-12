import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { spaceValidator } from '../../../core/validators/whitespace.validator';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../../core/models/location.model';

@Component({
  selector: 'app-edit-location',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-location.component.html',
  styleUrl: './edit-location.component.css',
})
export class EditLocationComponent {
  editLocationForm!: FormGroup<{
    locationName: FormControl<string | null>;
  }>;
  locationId: string | null = '0';
  location: Location = {
    locationId: 0,
    locationName: '',
  };

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.locationId = this.route.snapshot.paramMap.get('id');
    this.service.getLocation(this.locationId).subscribe((res) => {
      if (res.isSuccess) {
        this.editLocationForm.patchValue({
          locationName: res.data.locationName,
        });
        this.location = res.data;
      }
    });
  }

  initializeForm() {
    this.editLocationForm = this.fb.group({
      locationName: [
        '',
        [Validators.required, spaceValidator, Validators.maxLength(50)],
      ],
    });
  }

  handleSubmit() {
    if (this.editLocationForm.valid) {
      this.location.locationName = this.editLocationForm.value.locationName
        ? this.editLocationForm.value.locationName
        : '';

      this.service.editLocation(this.location).subscribe((res) => {
        if (res.isSuccess) {
          this.router.navigate(['admin/locations']);
        }
      });
    }
  }
}
