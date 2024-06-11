import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  getLocationsUrl = 'https://localhost:7083/Locations/GetAllLocations';
  getJobTypesUrl = 'https://localhost:7083/JobTypes/GetAllJobTypes';
  saveJobUrl = 'https://localhost:7083/Jobs/SaveJob?jobId=';

  constructor(private api: ApiService) {}

  getLocations() {
    return this.api.get(this.getLocationsUrl);
  }

  getJobTypes() {
    return this.api.get(this.getJobTypesUrl);
  }

  saveJob(jobId: number) {
    return this.api.put(this.saveJobUrl + jobId);
  }
}
