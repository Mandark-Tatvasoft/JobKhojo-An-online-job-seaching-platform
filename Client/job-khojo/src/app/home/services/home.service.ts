import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Search } from '../../core/models/search.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  getJobsUrl = 'https://localhost:7083/Jobs/GetJobs?limit=10';
  getJobByIdUrl = 'https://localhost:7083/Jobs/GetJob?id=';
  getAllJobsUrl = 'https://localhost:7083/Jobs/GetAllJobs';
  getJobTypesUrl = 'https://localhost:7083/JobTypes/GetAllJobTypes';
  getLocationsUrl = 'https://localhost:7083/Locations/GetAllLocations';
  getUserUrl = 'https://localhost:7083/User/GetUser';
  editUserUrl = 'https://localhost:7083/User/EditUser';
  applyForJobUrl = 'https://localhost:7083/Jobs/ApplyForJob?jobId=';

  constructor(private api: ApiService) {}

  getJobs() {
    return this.api.get(this.getJobsUrl);
  }

  getJobById(id: string | null) {
    return this.api.get(this.getJobByIdUrl + id);
  }

  searchJobs(model: Search) {
    return this.api.get(
      `https://localhost:7083/Jobs/SearchJobs?title=${model.title}&jobType=${model.jobType}&location=${model.location}`
    );
  }

  getAllJobs() {
    return this.api.get(this.getAllJobsUrl);
  }

  getJobTypes() {
    return this.api.get(this.getJobTypesUrl);
  }

  getLocations() {
    return this.api.get(this.getLocationsUrl);
  }

  getUser() {
    return this.api.get(this.getUserUrl);
  }

  editUser(model: any) {
    return this.api.put(this.editUserUrl, model);
  }

  applyForJob(jobId: number | undefined) {
    return this.api.put(this.applyForJobUrl + jobId);
  }
}
