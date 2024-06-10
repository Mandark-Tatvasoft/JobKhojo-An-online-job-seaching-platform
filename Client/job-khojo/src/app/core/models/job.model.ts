export interface Job {
  jobId: number;
  title: string;
  subtitle: string;
  description: string;
  openings: number;
  salary: number;
  location: number;
  jobType: number;
  createdBy: number;
  isActive: boolean;
  appliedBy: number;
}
