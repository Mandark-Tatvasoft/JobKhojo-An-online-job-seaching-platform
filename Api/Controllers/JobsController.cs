using BusinessLogic.Repository.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class JobsController : ControllerBase
{

    private readonly IJobs _jobs;
    public JobsController(IJobs jobs)
    {
        _jobs = jobs;
    }

    [HttpGet("GetAllJobs")]
    public IActionResult GetAll()
    {
        var res = new ResponseModel<List<JobModel>>();
        var jobs = _jobs.GetAllJobs();
        if(jobs == null)
        {
            res.IsSuccess = false;
            res.Message = "No jobs found";
            return NotFound(res);
        }
        else
        {
            res.IsSuccess = true;
            res.Data = jobs;
            return Ok(res);
        }
    }

    [HttpGet("GetJobs")]
    public IActionResult GetLimited(int limit)
    {
        var res = new ResponseModel<List<JobModel>>();
        var jobs = _jobs.GetJobs(limit);
        if (jobs == null)
        {
            res.IsSuccess = false;
            res.Message = "No jobs found";
            return NotFound(res);
        }
        else
        {
            res.IsSuccess = true;
            res.Data = jobs;
            return Ok(res);
        }
    }

    [HttpGet("GetJob")]
    public IActionResult Get(int id)
    {
        var res = new ResponseModel<JobModel>();
        var job = _jobs.GetJob(id);
        if (job == null)
        {
            res.IsSuccess = false;
            res.Message = "No job found";
        }
        else
        {
            res.IsSuccess = true;
            res.Data = job;
        }
        return Ok(res);
    }

    [HttpPut("EditJob")]
    public IActionResult Put(JobModel job)
    {
        var res = new ResponseModel<string>();
        if(ModelState.IsValid)
        {
            var isSuccess = _jobs.EditJob(job);
            if (isSuccess)
            {
                res.IsSuccess = true;
                res.Message = "Job data changed successfully";
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "There were some errors editing the job";
                return BadRequest(res);
            }
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "Please provide a proper format of data";
            return BadRequest(res);
        }
    }

    [HttpPut("ApplyForJob")]
    public IActionResult Apply(int jobId)
    {
        var res = new ResponseModel<string>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(' ').Last();
        var isSuccess = _jobs.ApplyForJob(jobId, token);

        if (isSuccess)
        {
            res.IsSuccess = true;
            res.Message = "Applied for the job";
            return Ok(res);
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "Something went wrong";
            return BadRequest(res);
        }
    }

    [HttpPut("SaveJob")]
    public IActionResult SaveJob(int jobId)
    {
        var res = new ResponseModel<string>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(' ').Last();
        var isSuccess = _jobs.SaveJob(jobId, token);

        if (isSuccess)
        {
            res.IsSuccess = true;
            res.Message = "Saved the job";
            return Ok(res);
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "Something went wrong";
            return BadRequest(res);
        }
    }
}
