using Data.Models;

namespace BusinessLogic.Repository.Interfaces;

public interface IJobs
{
    public List<JobModel> GetAllJobs();

    public List<JobModel> GetJobs(int limit);

    public JobModel GetJob(int id);

    public bool EditJob(JobModel model);
}
