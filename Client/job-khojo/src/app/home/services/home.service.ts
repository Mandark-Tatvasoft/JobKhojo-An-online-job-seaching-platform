import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Search } from '../../core/models/search.model';
import { HttpHeaders } from '@angular/common/http';
import { Profile } from '../../core/models/profile.model';

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
    const headers = new HttpHeaders().append('X-File-Base64', 'base64File');
    let formData = new FormData();
    formData.append('firstname', model.firstname);
    formData.append('lastname', model.lastname);
    formData.append('email', model.email);
    formData.append('username', model.username);
    formData.append('userId', model.userId);
    formData.append('mobile', model.mobile);
    formData.append('resumeFile', model.resumeFile);
    formData.append('resume', model.resume);

    return this.api.post(this.editUserUrl, formData, headers);
  }

  applyForJob(jobId: number | undefined) {
    return this.api.put(this.applyForJobUrl + jobId);
  }
}
