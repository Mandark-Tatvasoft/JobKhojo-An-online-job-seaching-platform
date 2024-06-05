using BusinessLogic.Repository.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogin _login;
    private readonly IJwtService _jwt;

    public AuthController(ILogin login, IJwtService jwt)
    {
        _login = login;
        _jwt = jwt;
    }

    [HttpPost("Login")]
    public IActionResult Login(LoginModel model)
    {
        var res = new ResponseModel<UserModel>();

        if (model != null)
        {
            var user = _login.LogIn(model);
            if (user.UserId != null)
            {
                Request.HttpContext.Session.SetInt32("userid", user.UserId);
                var jwtToken = _jwt.GenerateToken(user);
                Response.Cookies.Append("jwt", jwtToken);

                user.Token = jwtToken;

                res.IsSuccess = true;
                res.Message = "User Logged in successfully";
                res.Data = user;
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "Wrong Credentials";
                return NotFound(res);
            }
        }
        else
        {
            res.IsSuccess = false;
            res.Message = "Please fill the details";
            return NotFound(res);
        }
    }

    [HttpPost("Signup")]
    
    public IActionResult Signup(SignupModel model)
    {
        if (!ModelState.IsValid)
        {
            var res = new ResponseModel<string>();
            res.IsSuccess = false;
            res.Message = "Validations not true";
            res.Data = ModelState.ErrorCount.ToString();
            return BadRequest(res);
        }
        else
        {
            var res = new ResponseModel<string>();
            var isAdded = _login.SignUp(model);
            if (isAdded)
            {
                res.IsSuccess = true;
                res.Message = "User created Successfully";
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "There is some mistake!";
                return BadRequest(res);
            }
        }
    }

    [HttpGet("Error")]
    public IActionResult Error()
    {
        return Unauthorized("Error!");
    }
}
