using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Models;

namespace BusinessLogic.Repository;

public class Jobs : IJobs
{
    private readonly AppDbContext _context;
    public Jobs(AppDbContext context)
    {
        _context = context;
    }

    public JobModel GetJob(int id)
    {
        var model = new JobModel();
        var job = _context.Jobs.FirstOrDefault(x => x.JobId == id);

        if (job != null)
        {
            model.JobId = job.JobId;
            model.Title = job.Title;
            model.Description = job.Description;
            model.IsActive = job.IsActive;
            model.Openings = job.Openings;
        }

        return model;

    }

    public bool EditJob(JobModel model)
    {
        var job = _context.Jobs.FirstOrDefault(j => j.JobId == model.JobId);
        if (job != null)
        {
            job.Title = model.Title;
            job.Description = model.Description;
            job.Openings = model.Openings;
            job.IsActive = model.IsActive;

            try
            {
                _context.SaveChanges();
                return true;
            }

            catch (Exception ex) { 
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        else return false;
    }

}
