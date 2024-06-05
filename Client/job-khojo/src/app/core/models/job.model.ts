export interface Job {
  jobId: number;
  title: string;
  description: string;
  openings: number;
  createdBy: number;
  isActive: boolean;
  appliedBy: number;
}
