import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { NewUser } from '../../core/models/signup.model';
import { Job } from '../../core/models/job.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private api: ApiService) {}

  getAllJobsUrl = 'https://localhost:7083/Jobs/GetAllJobs';
  getLocationsUrl = 'https://localhost:7083/Locations/GetAllLocations';
  getJobTypesUrl = 'https://localhost:7083/JobTypes/GetAllJobTypes';
  getUsersUrl = 'https://localhost:7083/User/GetAllUsers';
  getUserUrl = 'https://localhost:7083/User/GetUserById?id=';
  addUserUrl = 'https://localhost:7083/Admin/AddUser';
  editUserUrl = 'https://localhost:7083/Admin/EditUser?id=';
  getRecruitersUrl = 'https://localhost:7083/Admin/GetRecruiters';
  addJobUrl = 'https://localhost:7083/Admin/AddJob';
  editJobUrl = 'https://localhost:7083/Admin/EditJob';
  getJobUrl = 'https://localhost:7083/Jobs/GetJob?id=';

  getAllJobs() {
    return this.api.get(this.getAllJobsUrl);
  }

  getLocations() {
    return this.api.get(this.getLocationsUrl);
  }

  getJobTypes() {
    return this.api.get(this.getJobTypesUrl);
  }

  getUsers() {
    return this.api.get(this.getUsersUrl);
  }

  getUser(id: string | null) {
    return this.api.get(this.getUserUrl + id);
  }

  addUser(newUser: NewUser) {
    return this.api.post(this.addUserUrl, newUser);
  }

  editUser(user: NewUser, id: string | null) {
    return this.api.put(this.editUserUrl + id, user);
  }

  getRecruiters() {
    return this.api.get(this.getRecruitersUrl);
  }

  getJob(id: string | null) {
    return this.api.get(this.getJobUrl + id);
  }

  addJob(job: Job) {
    return this.api.post(this.addJobUrl, job);
  }

  editJob(job: Job) {
    return this.api.put(this.editJobUrl, job);
  }
}
