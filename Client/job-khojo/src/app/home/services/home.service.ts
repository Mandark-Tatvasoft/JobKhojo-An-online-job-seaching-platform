import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  getJobsUrl = 'https://localhost:7083/Jobs/GetJobs?limit=10';
  getJobByIdUrl = 'https://localhost:7083/Jobs/GetJob?id=';
  getAllJobsUrl = 'https://localhost:7083/Jobs/GetAllJobs';

  constructor(private api: ApiService) {}

  getJobs() {
    return this.api.get(this.getJobsUrl);
  }

  getJobById(id: string | null) {
    return this.api.get(this.getJobByIdUrl + id);
  }

  getAllJobs() {
    return this.api.get(this.getAllJobsUrl);
  }
}
