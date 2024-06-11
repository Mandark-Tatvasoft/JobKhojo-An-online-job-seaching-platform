using BusinessLogic.Repository.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsers _user;

        public UserController(IUsers user)
        {
            _user = user;
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAll() 
        {
            var res = new ResponseModel<List<ProfileModel>>();
            var data = _user.GetUsers();
            if(data.Count > 0)
            {
                res.IsSuccess = true;
                res.Data = data;
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "No users found";
                return NotFound(res);
            }
        }

        [HttpGet("GetUser")]
        public IActionResult Get()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var res = new ResponseModel<ProfileModel>();
            var data = _user.GetUser(token);
            if (data.UserId != 0)
            {
                res.IsSuccess = true;
                res.Data = data;
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "No user found";
                return NotFound(res);
            }
        }

        [HttpGet("GetUserById")]
        public IActionResult GetUser(int id)
        {
            var res = new ResponseModel<SignupModel>();
            var data = _user.GetUserById(id);
            if (data.Role != 0)
            {
                res.IsSuccess = true;
                res.Data = data;
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "No user found";
                return NotFound(res);
            }
        }

        [HttpPut("EditUser")]
        public IActionResult Edit(ProfileModel model)
        {
            var res = new ResponseModel<string>();
            if(ModelState.IsValid)
            {
                var isSuccess = _user.UpdateUser(model);
                if(isSuccess)
                {
                    res.IsSuccess = true;
                    res.Message = "Updated user successfully";
                    return Ok(res);
                }
                else
                {
                    res.IsSuccess = false;
                    res.Message = "Something went wrong";
                    return BadRequest(res);
                }
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "Provided data is not in a valid format";
                return BadRequest(res);
            }
        }
    }
}
