using Data.Models;

namespace BusinessLogic.Repository.Interfaces;

public interface IJobs
{
    public JobModel GetJob(int id);

    public bool EditJob(JobModel model);
}
