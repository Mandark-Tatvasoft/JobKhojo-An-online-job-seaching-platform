using AutoMapper;
using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Data;
using Data.Models;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

namespace BusinessLogic.Repository;

public class Jobs : IJobs
{
    private readonly AppDbContext _context;
    private readonly IJwtService _jwt;
    private readonly IMapper _mapper;
    public Jobs(AppDbContext context, IJwtService jwt, IMapper mapper)
    {
        _context = context;
        _jwt = jwt;
        _mapper = mapper;
    }

    public List<JobModel> GetAllJobs(string token)
    {
        var jobs = _context.Jobs.Where(j => j.IsActive == true && j.IsDeleted != true).ToList();
        var model = new List<JobModel>();
        int[] savedJobs = new int[0];
        _jwt.ValidateToken(token, out JwtSecurityToken validatedToken);
        if(validatedToken != null)
        {
            var userId = int.Parse(validatedToken.Claims.FirstOrDefault(x => x.Type == "UserId").Value);
            savedJobs = _context.Users.FirstOrDefault(u => u.UserId == userId).SavedJobs;
        }

        foreach (var job in jobs)
        {
            var newModel = new JobModel() { isSaved = savedJobs!.Contains(job.JobId) };
            model.Add(_mapper.Map(job, newModel));
        }

        return model;

    }

    public List<JobModel> GetJobs(int limit, string token)
    {
        var jobs = _context.Jobs.Where(j => j.IsActive == true && j.IsDeleted != true).Take(limit).ToList();
        var model = new List<JobModel>();
        int[] savedJobs = new int[0];
        _jwt.ValidateToken(token, out JwtSecurityToken validatedToken);
        if (validatedToken != null)
        {
            var userId = int.Parse(validatedToken.Claims.FirstOrDefault(x => x.Type == "UserId").Value);
            savedJobs = _context.Users.FirstOrDefault(u => u.UserId == userId).SavedJobs;
        }

        foreach (var job in jobs)
        {
            var newModel = new JobModel() { isSaved = savedJobs!.Contains(job.JobId) };
            model.Add(_mapper.Map(job, newModel));
        }

        return model;
    }

    public List<ListedJobsModel> GetAllListed(int id)
    {
        var model = new List<ListedJobsModel>();

        try
        {
            var list = _context.Jobs.Where(x => x.CreatedBy == id && x.IsDeleted != true).ToList();
            var users = _context.Users.ToList();

            foreach (var item in list)
            {
                var job = new JobModel();
                _mapper.Map(item, job);

                var appliedUsers = users.Where(x => item.AppliedBy!.Contains(x.UserId)).ToList();
                var appUsers = new List<ProfileModel>();
                foreach(var user in appliedUsers)
                {
                    var newItem = new ProfileModel();
                    appUsers.Add(_mapper.Map(user, newItem));
                }

                model.Add(new ListedJobsModel
                {
                    Job = job,
                    AppliedUsers = appUsers
                });

            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return model;
    }

    public List<JobModel> SearchJobs(string title, int jobType, int location, string token)
    {
        var jobs = _context.Jobs.Where(j => j.IsActive == true && j.IsDeleted != true).ToList();
        if(title != null && title != string.Empty)
        {
            jobs = jobs.Where(j => j.Title.ToLower().Contains(title.ToLower()) || j.Subtitle.ToLower().Contains(title.ToLower())).ToList();
        }

        if(jobType != 0)
        {
            jobs = jobs.Where(j => j.JobType == jobType).ToList();
        }

        if(location != 0)
        {
            jobs = jobs.Where(j => j.Location == location).ToList();
        }
        
        var model = new List<JobModel>();
        int[] savedJobs = new int[0];
        _jwt.ValidateToken(token, out JwtSecurityToken validatedToken);
        if (validatedToken != null)
        {
            var userId = int.Parse(validatedToken.Claims.FirstOrDefault(x => x.Type == "UserId").Value);
            savedJobs = _context.Users.FirstOrDefault(u => u.UserId == userId).SavedJobs;
        }

        foreach (var job in jobs)
        {
            var newJob = new JobModel() { isSaved = savedJobs!.Contains(job.JobId) };
            model.Add(_mapper.Map(job, newJob));
        }

        return model;
    }

    public List<JobModel> GetSavedJobs(string token)
    {
        var model = new List<JobModel>();
        _jwt.ValidateToken(token, out JwtSecurityToken jwtToken);
        if(jwtToken != null)
        {
            var userId = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
            var savedJobs = _context.Users.FirstOrDefault(u => u.UserId == userId).SavedJobs;
            if(savedJobs != null)
            {
                var jobs = _context.Jobs.Where(j => savedJobs.Contains(j.JobId) && j.IsDeleted != true).ToList();
                if(jobs != null)
                {
                    foreach (var job in jobs)
                    {
                        var newJob = new JobModel() { isSaved = savedJobs!.Contains(job.JobId) };
                        model.Add(_mapper.Map(job, newJob));
                    }
                }

            }
        }
        return model;
    }

    public List<JobModel> GetAppliedJobs(string token)
    {
        var model = new List<JobModel>();
        _jwt.ValidateToken(token, out JwtSecurityToken jwtToken);
        if (jwtToken != null)
        {
            var userId = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
            var appliedJobs = _context.Users.FirstOrDefault(u => u.UserId == userId).AppliedJobs;
            if (appliedJobs != null)
            {
                var jobs = _context.Jobs.Where(j => appliedJobs.Contains(j.JobId) && j.IsDeleted != true).ToList();
                if (jobs != null)
                {
                    foreach (var job in jobs)
                    {
                        var newJob = new JobModel();
                        model.Add(_mapper.Map(job, newJob));
                    }
                }

            }
        }
        return model;
    }

    public int GetSavedJobsCount(string token)
    {
        var savedJobsCount = 0;
        _jwt.ValidateToken(token, out JwtSecurityToken jwtToken);
        if (jwtToken != null)
        {
            var userId = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
            savedJobsCount = _context.Users.FirstOrDefault(u => u.UserId == userId).SavedJobs.Count();
        }
        return savedJobsCount;
    }

    public int GetAppliedJobsCount(string token)
    {
        var appliedJobsCount = 0;
        _jwt.ValidateToken(token, out JwtSecurityToken jwtToken);
        if (jwtToken != null)
        {
            var userId = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
            appliedJobsCount = _context.Users.FirstOrDefault(u => u.UserId == userId).AppliedJobs.Count();
            
        }
        return appliedJobsCount;
    }

    public JobModel GetJob(int id, string token)
    {
        var model = new JobModel();
        var job = _context.Jobs.FirstOrDefault(x => x.JobId == id && x.IsDeleted != true);

        if (job != null)
        {
            _mapper.Map(job, model);
        }

        if (token != null)
        {
            _jwt.ValidateToken(token, out JwtSecurityToken jwtToken);
            if(jwtToken != null)
            {
                var userId = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var savedJobs = _context.Users.FirstOrDefault(x => x.UserId == userId).AppliedJobs;
                if (savedJobs != null)
                {
                    if (savedJobs.Contains(job.JobId))
                    {
                        model.isApplied = true;
                    }
                }
            }
        }

        return model;

    }

    public bool AddJob(JobModel model)
    {
        var newJob = new Job();
        _mapper.Map(model, newJob);
        newJob.AppliedBy = new int[0];

        try
        {
            _context.Jobs.Add(newJob);
            _context.SaveChanges();
            return true;
        }

        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }
    }

    public bool EditJob(JobModel model)
    {
        var job = _context.Jobs.FirstOrDefault(j => j.JobId == model.JobId);
        if (job != null)
        {
            _mapper.Map(model, job);

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
        if(jwtToken != null)
        {
            var userId = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user != null)
            {
                List<int> savedJobs = new List<int>();
                foreach (var item in user.SavedJobs)
                {
                    savedJobs.Add(item);
                }
                if(!savedJobs.Contains(jobId))
                {
                    savedJobs.Add(jobId);
                }
                user.SavedJobs = savedJobs.ToArray();

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
        else
        {
            return false;
        }
    }

    public bool UnsaveJob(int jobId, string token)
    {
        _jwt.ValidateToken(token, out JwtSecurityToken jwtToken);
        if (jwtToken != null)
        {
            var userId = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user != null)
            {
                var list = user.SavedJobs.ToList();
                if (list.Remove(jobId))
                {
                    user.SavedJobs = list.ToArray();
                }
                
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
        else
        {
            return false;
        }
    }

    public bool DeleteJob(int jobId)
    {
        var job = _context.Jobs.FirstOrDefault(j => j.JobId == jobId);
        if (job != null)
        {
            job.IsDeleted = true;

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
        else return false;
    }

    public List<JobTypeModel> GetAllJobTypes()
    {
        var types = _context.JobTypes.ToList();
        var model = new List<JobTypeModel>();

        if (types.Count() != 0)
        {
            foreach (var type in types)
            {
                var newJobType = new JobTypeModel();
                model.Add(_mapper.Map(type, newJobType));
            }
        }

        return model;
    }
}
