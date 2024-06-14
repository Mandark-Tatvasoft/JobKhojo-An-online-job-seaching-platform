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

    #region Get

    [HttpGet("GetAllJobs")]
    public IActionResult GetAll()
    {
        var res = new ResponseModel<List<JobModel>>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var jobs = _jobs.GetAllJobs(token);
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
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var jobs = _jobs.GetJobs(limit, token);
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

    [HttpGet("SearchJobs")]
    public IActionResult Search(string title, int jobType, int location)
    {
        var res = new ResponseModel<List<JobModel>>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var jobs = _jobs.SearchJobs(title, jobType, location, token);
        if (jobs.Count == 0)
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
    public IActionResult GetJobById(int id)
    {
        var res = new ResponseModel<JobModel>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var job = _jobs.GetJob(id, token);
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

    #endregion

    #region Edit

    [Authorize("2")]
    [HttpPut("EditJob")]
    public IActionResult EditJob(JobModel job)
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

    #endregion

    #region Delete

    [HttpDelete("DeleteJob")]
    public IActionResult deleteJob(int id)
    {
        var res = new ResponseModel<string>();
        var isSuccess = _jobs.DeleteJob(id);
        if (isSuccess)
        {
            res.IsSuccess = true;
            res.Message = "Job Deleted successfully";
            return Ok(res);
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "There were some errors";
            return BadRequest(res);
        }
    }

    #endregion

    #region Save/Apply

    [Authorize("3")]
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

    [Authorize("3")]
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

    [Authorize("3")]
    [HttpPut("UnsaveJob")]
    public IActionResult UnsaveJob(int jobId)
    {
        var res = new ResponseModel<string>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(' ').Last();
        var isSuccess = _jobs.UnsaveJob(jobId, token);

        if (isSuccess)
        {
            res.IsSuccess = true;
            res.Message = "Unsaved the job";
            return Ok(res);
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "Something went wrong";
            return BadRequest(res);
        }
    }

    [Authorize("3")]
    [HttpGet("GetAppliedJobs")]
    public IActionResult GetApplied()
    {
        var res = new ResponseModel<List<JobModel>>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var data = _jobs.GetAppliedJobs(token);
        if (data.Count != 0)
        {
            res.IsSuccess = true;
            res.Data = data;
            return Ok(res);
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "No saved Jobs found";
            return Ok(res);
        }
    }

    [Authorize("3")]
    [HttpGet("GetSavedJobs")]
    public IActionResult GetSaved()
    {
        var res = new ResponseModel<List<JobModel>>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var data = _jobs.GetSavedJobs(token);
        if (data.Count != 0)
        {
            res.IsSuccess = true;
            res.Data = data;
            return Ok(res);
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "No saved Jobs found";
            return Ok(res);
        }
    }

    [Authorize("3")]
    [HttpGet("GetSavedJobsCount")]
    public IActionResult GetSavedCount()
    {
        var res = new ResponseModel<int>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var data = _jobs.GetSavedJobsCount(token);
        if (data != 0)
        {
            res.IsSuccess = true;
            res.Data = data;
            return Ok(res);
        }
        else
        {
            res.IsSuccess = false;
            return Ok(res);
        }
    }

    [Authorize("3")]
    [HttpGet("GetAppliedJobsCount")]
    public IActionResult GetAppliedCount()
    {
        var res = new ResponseModel<int>();
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var data = _jobs.GetAppliedJobsCount(token);
        if (data != 0)
        {
            res.IsSuccess = true;
            res.Data = data;
            return Ok(res);
        }
        else
        {
            res.IsSuccess = false;
            return Ok(res);
        }
    }

    #endregion
}
