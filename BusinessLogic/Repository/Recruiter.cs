using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Data;
using Data.Models;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;

namespace BusinessLogic.Repository;

public class Recruiter : IRecruiter
{
    private readonly AppDbContext _context;
    private readonly IJwtService _jwt;
    public Recruiter(AppDbContext context, IJwtService jwt)
    {
        _context = context;
        _jwt = jwt;
    }
    public List<JobModel> GetAllListed(int id)
    {
        var model = new List<JobModel>();
        try
        {
            var list = _context.Jobs.Where(x => x.CreatedBy == id).ToList();
            foreach (var job in list)
            {
                model.Add(new JobModel
                {
                    JobId = job.JobId,
                    Title = job.Title,
                    Description = job.Description,
                    Openings = job.Openings,
                    Salary = job.Salary,
                    Location = job.Location,
                    Subtitle = job.Subtitle,
                    JobType = job.JobType,
                    CreatedBy = job.CreatedBy,
                    IsActive = job.IsActive,
                    AppliedBy = job.AppliedBy == null ? 0 : job.AppliedBy.Count(),
                });

            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return model;
    }

    public bool AddJob(JobModel job, string token)
    {
        _jwt.ValidateToken(token, out JwtSecurityToken validatedToken);
        var newJob = new Job()
        {
            Title = job.Title,
            Subtitle = job.Subtitle,
            Location = job.Location,
            Salary = job.Salary,
            JobType = job.JobType,
            Description = job.Description,
            CreatedBy = int.Parse(validatedToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value),
            AppliedBy = new int[0],
            IsActive = true,
            Openings = job.Openings
        };

        try
        {
            _context.Jobs.Add(newJob);
            _context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return false;
        }
    }

    public bool EditJob(JobModel model)
    {
        var job = _context.Jobs.FirstOrDefault(x => x.JobId == model.JobId);
        if (job != null)
        {
            job.Title = model.Title;
            job.Description = model.Description;
            job.IsActive = model.IsActive;
            job.Openings = model.Openings;

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
