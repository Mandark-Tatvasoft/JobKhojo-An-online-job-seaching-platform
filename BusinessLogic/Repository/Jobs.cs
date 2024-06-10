using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Data;
using Data.Models;
using System.IdentityModel.Tokens.Jwt;

namespace BusinessLogic.Repository;

public class Jobs : IJobs
{
    private readonly AppDbContext _context;
    private readonly IJwtService _jwt;
    public Jobs(AppDbContext context, IJwtService jwt)
    {
        _context = context;
        _jwt = jwt;

    }

    public List<JobModel> GetAllJobs()
    {
        var jobs = _context.Jobs.Where(j => j.IsActive == true).ToList();
        var model = new List<JobModel>();

        foreach (var job in jobs)
        {
            model.Add(new JobModel
            {
                JobId = job.JobId,
                Title = job.Title,
                Subtitle = job.Subtitle,
                Description = job.Description,
                Openings = job.Openings,
                Salary = job.Salary,
                JobType = job.JobType,
                Location = job.Location,
            });
        }

        return model;

    }

    public List<JobModel> GetJobs(int limit)
    {
        var jobs = _context.Jobs.Where(j => j.IsActive == true).Take(limit).ToList();
        var model = new List<JobModel>();

        foreach (var job in jobs)
        {
            model.Add(new JobModel
            {
                JobId = job.JobId,
                Title = job.Title,
                Subtitle = job.Subtitle,
                Description = job.Description,
                Openings = job.Openings,
                Salary = job.Salary,
                Location = job.Location,
                JobType = job.JobType,
            });
        }

        return model;
    }

    public JobModel GetJob(int id)
    {
        var model = new JobModel();
        var job = _context.Jobs.FirstOrDefault(x => x.JobId == id);

        if (job != null)
        {
            model.JobId = job.JobId;
            model.Title = job.Title;
            model.Subtitle = job.Subtitle;
            model.Description = job.Description;
            model.Openings = job.Openings;
            model.Salary = job.Salary;
            model.Location = job.Location;
            model.JobType = job.JobType;
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
            job.Subtitle = model.Subtitle;
            job.Salary = model.Salary;
            job.JobType = model.JobType;
            job.Location = model.Location;

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

    public bool ApplyForJob(int jobId, string token)
    {
        var job = _context.Jobs.FirstOrDefault(j => j.JobId == jobId);
        _jwt.ValidateToken(token, out JwtSecurityToken validatedToken);
        var userId = int.Parse(validatedToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);

        if (job != null)
        {
            if (job.AppliedBy.Contains(userId))
            {
                return true;
            }
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            
            List<int> jobs = new List<int>();
            foreach(var item in user.AppliedJobs)
            {
                jobs.Add(item);
            }
            jobs.Add(jobId);
            user.AppliedJobs = jobs.ToArray();
            
            List<int> applied = new List<int>();
            foreach(var item in job.AppliedBy)
            {
                applied.Add(item);
            }
            applied.Add(userId);

            job.AppliedBy = applied.ToArray();

            try
            {
                _context.SaveChanges();
                return true;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        else
        {
            return false;
        }
    }

    public bool SaveJob(int jobId, string token)
    {
        _jwt.ValidateToken(token, out JwtSecurityToken jwtToken);
        var userId = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
        var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
        if(user != null)
        {
            List<int> savedJobs = new List<int>();
            foreach(var item in user.SavedJobs)
            {
                savedJobs.Add(item);
            }
            savedJobs.Add(jobId);

            try
            {
                _context.SaveChanges();
                return true;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        else
        {
            return false;
        }
    }
}
