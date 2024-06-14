import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ApiResponseToastrService {
  constructor(private toastr: ToastrService) {}

  handleResponse(res: any) {
    if (res.status == 200 && res.body.isSuccess && res.body.message != null) {
      this.toastr.success(res.body.message, 'Success', {
        timeOut: 2000,
      });
    }

    if (res.status == 200 && !res.body.isSuccess && res.body.message != null) {
      this.toastr.error(res.body.message, 'Error', {
        timeOut: 2000,
      });
    }

    if (res.status == 404 && res.body.message != null) {
      this.toastr.error(res.body.message, res.statusText, {
        timeOut: 2000,
      });
    }

    if (res.status == 400 && res.body.message != null) {
      this.toastr.error(res.body.message, res.statusText, {
        timeOut: 2000,
      });
    }
  }
}
