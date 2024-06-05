using BusinessLogic.Repository;
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
        return Ok("hi if authenticated!");
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
        var isSuccess = _jobs.EditJob(job);
        var res = new ResponseModel<string>()
        {
            IsSuccess = false,
            Message = "There were some errors editing the job"
        };
        if (isSuccess)
        {
            res.IsSuccess = true;
            res.Message = "Job data chenged successfully";
        }
        return Ok(res);
    }
}
