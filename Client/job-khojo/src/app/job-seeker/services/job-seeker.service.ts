import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class JobSeekerService {
  getAllJobsUrl = 'https://localhost:7083/Jobs/GetAllJobs';
  getJobByIdUrl = 'https://localhost:7083/Jobs/GetJob?id=';

  constructor(private api: ApiService) {}

  getJobs() {
    return this.api.get(this.getAllJobsUrl);
  }

  getJobById(id: string | null) {
    return this.api.get(this.getJobByIdUrl + id);
  }
}
