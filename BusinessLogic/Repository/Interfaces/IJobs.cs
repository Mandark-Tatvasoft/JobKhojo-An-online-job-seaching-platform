using Data.Models;

namespace BusinessLogic.Repository.Interfaces;

public interface IJobs
{
    public List<JobModel> GetAllJobs(string token);

    public List<JobModel> GetJobs(int limit, string token);

    public List<JobModel> SearchJobs(string title, int jobType, int location, string token);

    public JobModel GetJob(int id, string token);

    public bool EditJob(JobModel model);

    public bool ApplyForJob(int jobId, string token);

    public bool SaveJob(int jobId, string token);

    public List<JobModel> GetSavedJobs(string token);

    public List<JobModel> GetAppliedJobs(string token);
}
