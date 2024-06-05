using BusinessLogic.Repository.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class RecruiterController : ControllerBase
{
    private readonly IRecruiter _recruiter;
    public RecruiterController(IRecruiter recruiter)
    {
        _recruiter = recruiter;
    }

    [HttpGet("GetAllListedJobs")]
    public IActionResult Get(int id)
    {
        var jobs = _recruiter.GetAllListed(id);
        var res = new ResponseModel<List<JobModel>>();

        if (jobs.Count > 0)
        {
            res.Data = jobs;
            res.IsSuccess = true;
            return Ok(res);
        }
        else
        {
            res.Message = "No Data Found";
            return Ok(res);
        }
    }

    [HttpPost("AddJob")]
    public IActionResult Post(JobModel model)
    {
        var res = new ResponseModel<string>();
        var IsSuccess = _recruiter.AddJob(model);
        if (IsSuccess)
        {
            res.IsSuccess = true;
            res.Message = "Successfully added the Job listing";
        }
        return Ok(res);
    }

    [HttpPut("EditJob")]
    public IActionResult Put(JobModel model)
    {
        var res = new ResponseModel<string>();
        var IsSuccess = _recruiter.EditJob(model);
        if (IsSuccess)
        {
            res.IsSuccess = true;
            res.Message = "Job edited successfully";
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "There is some error";
        }
        return Ok(res);
    }
}
