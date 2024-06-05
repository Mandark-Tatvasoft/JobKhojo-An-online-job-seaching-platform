using Data.Models;

namespace BusinessLogic.Repository.Interfaces;

public interface IRecruiter
{
    public List<JobModel> GetAllListed(int id);

    public bool AddJob(JobModel job, string token);

    public bool EditJob(JobModel job);
}