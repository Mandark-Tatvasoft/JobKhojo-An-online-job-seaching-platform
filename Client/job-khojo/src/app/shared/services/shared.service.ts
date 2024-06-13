import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  getLocationsUrl = 'https://localhost:7083/Locations/GetAllLocations';
  getJobTypesUrl = 'https://localhost:7083/JobTypes/GetAllJobTypes';
  saveJobUrl = 'https://localhost:7083/Jobs/SaveJob?jobId=';
  unsaveJobUrl = 'https://localhost:7083/Jobs/UnsaveJob?jobId=';
  getSavedCountUrl = 'https://localhost:7083/Jobs/GetSavedJobsCount';
  getAppliedCountUrl = 'https://localhost:7083/Jobs/GetAppliedJobsCount';
  deleteJobUrl = 'https://localhost:7083/Jobs/DeleteJob?id=';

  constructor(private api: ApiService) {}

  getLocations() {
    return this.api.get(this.getLocationsUrl);
  }

  getJobTypes() {
    return this.api.get(this.getJobTypesUrl);
  }

  saveJob(jobId: number | undefined) {
    return this.api.put(this.saveJobUrl + jobId);
  }

  unsaveJob(jobId: number | undefined) {
    return this.api.put(this.unsaveJobUrl + jobId);
  }

  getAppliedJobsCount() {
    return this.api.get(this.getAppliedCountUrl);
  }

  getSavedJobsCount() {
    return this.api.get(this.getSavedCountUrl);
  }

  deleteJob(jobId: number | undefined) {
    return this.api.delete(this.deleteJobUrl + jobId);
  }
}
