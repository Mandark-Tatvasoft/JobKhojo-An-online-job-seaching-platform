import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Job } from '../../core/models/job.model';

@Injectable({
  providedIn: 'root',
})
export class RecruiterService {
  getAllJobsUrl = 'https://localhost:7083/Recruiter/GetAllListedJobs?id=';
  getJobUrl = 'https://localhost:7083/Jobs/GetJob?id=';
  editJobUrl = 'https://localhost:7083/Jobs/EditJob';
  addJobUrl = 'https://localhost:7083/Recruiter/AddJob';
  getLocationsUrl = 'https://localhost:7083/Locations/GetAllLocations';
  getJobTypesUrl = 'https://localhost:7083/JobTypes/GetAllJobTypes';

  constructor(private api: ApiService) {}

  getJobs(id: string | null) {
    return this.api.get(this.getAllJobsUrl + id);
  }

  getJob(id: string | null) {
    return this.api.get(this.getJobUrl + id);
  }

  editJob(model: Job) {
    return this.api.put(this.editJobUrl, model);
  }

  addJob(model: Job) {
    return this.api.post(this.addJobUrl, model);
  }

  getLocations() {
    return this.api.get(this.getLocationsUrl);
  }

  getJobTypes() {
    return this.api.get(this.getJobTypesUrl);
  }
}
