using BusinessLogic.Repository;
using BusinessLogic.Repository.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [Route("[controller]")]
    [Authorize("1")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUsers _user;
        private readonly IJobs _jobs;
        private readonly ILocations _locations;

        public AdminController(IUsers user, IJobs jobs, ILocations locations)
        {
            _user = user;
            _jobs = jobs;
            _locations = locations;
        }

        #region User

        [HttpPost("AddUser")]
        public IActionResult addUser(SignupModel model)
        {
            var res = new ResponseModel<string>();
            if(ModelState.IsValid)
            {
                var isSuccess = _user.AddUser(model);
                if (isSuccess)
                {
                    res.IsSuccess = true;
                    res.Message = "User added successfully";
                    return Ok(res);
                }
                else
                {
                    res.IsSuccess = false;
                    res.Message = "There were some errors";
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

        [HttpPut("EditUser")]
        public IActionResult editUser(SignupModel model, string id)
        {
            var res = new ResponseModel<string>();
            var isSuccess = _user.AdminEditUser(model, int.Parse(id));
            if (isSuccess)
            {
                res.IsSuccess = true;
                res.Message = "User edited successfully";
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "There were some errors";
                return BadRequest(res);
            }
        }

        [HttpPut("DisableUser")]
        public IActionResult disableUser(int id)
        {
            var res = new ResponseModel<string>();
            var isSuccess = _user.DisableUser(id);
            if (isSuccess)
            {
                res.IsSuccess = true;
                res.Message = "User edited successfully";
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

        #region Job

        [HttpPost("AddJob")]
        public IActionResult addJob(JobModel model)
        {
            var res = new ResponseModel<string>();
            var isSuccess = _jobs.AddJob(model);
            if (isSuccess)
            {
                res.IsSuccess = true;
                res.Message = "Job added successfully";
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "There were some errors";
                return BadRequest(res);
            }
        }

        [HttpPut("EditJob")]
        public IActionResult editJob(JobModel model)
        {
            var res = new ResponseModel<string>();
            var isSuccess = _jobs.EditJob(model);
            if (isSuccess)
            {
                res.IsSuccess = true;
                res.Message = "Job edited successfully";
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

        #region Location

        [HttpPost("AddLocation")]
        public IActionResult addLocation(LocationModel model)
        {
            var res = new ResponseModel<string>();
            var isSuccess = _locations.AddLocation(model);
            if (isSuccess)
            {
                res.IsSuccess = true;
                res.Message = "Location added successfully";
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "There were some errors";
                return BadRequest(res);
            }
        }

        [HttpPut("EditLocation")]
        public IActionResult editLocation(LocationModel model)
        {
            var res = new ResponseModel<string>();
            var isSuccess = _locations.EditLocation(model);
            if (isSuccess)
            {
                res.IsSuccess = true;
                res.Message = "Location edited successfully";
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

        #region Recruiter

        [HttpGet("GetRecruiters")]
        public IActionResult GetRecruiters()
        {
            var res = new ResponseModel<List<RecruiterModel>>();
            var data = _user.GetRecruiters();
            if(data.Count > 0)
            {
                res.IsSuccess = true;
                res.Data = data;
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "No recruiters found";
                return BadRequest(res);
            }
        }

        #endregion
    }
}
