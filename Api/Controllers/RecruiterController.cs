using BusinessLogic.Repository;
using BusinessLogic.Repository.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize("2")]
public class RecruiterController : ControllerBase
{
    private readonly IJobs _jobs;
    private readonly IJwtService _jwtService;
    public RecruiterController(IJobs jobs, IJwtService jwtService)
    {
        _jobs = jobs;
        _jwtService = jwtService;
    }

    #region Get listed jobs

    [HttpGet("GetAllListedJobs")]
    public IActionResult GetListedJobs(int id)
    {
        var jobs = _jobs.GetAllListed(id);
        var res = new ResponseModel<List<ListedJobsModel>>();

        if (jobs.Count > 0)
        {
            res.Data = jobs;
            res.IsSuccess = true;
            return Ok(res);
        }
        else
        {
            return Ok(res);
        }
    }

    #endregion

    #region Add job

    [HttpPost("AddJob")]
    public IActionResult AddJob(JobModel model)
    {
        var res = new ResponseModel<string>();
        if (ModelState.IsValid)
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            _jwtService.ValidateToken(token, out JwtSecurityToken validatedToken);
            var userId = int.Parse(validatedToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
            model.CreatedBy = userId;
            var IsSuccess = _jobs.AddJob(model);
            if (IsSuccess)
            {
                res.IsSuccess = true;
                res.Message = "Successfully added the Job listing";
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "There was some error";
                return BadRequest(res);
            }
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "Provide proper data";
            return BadRequest(res);
        }
    }

    #endregion
}
