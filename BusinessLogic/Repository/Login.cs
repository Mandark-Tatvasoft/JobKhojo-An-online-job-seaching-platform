using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AutoMapper;
using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Data;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLogic.Repository;

public class Login : ILogin
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public Login(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public UserModel LogIn(LoginModel model)
    {
        var loggedInUser = new UserModel();

        if (model.Password != null && model.Email != null)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Email == model.Email && u.PasswordHashed == model.Password);
                if (user != null)
                {
                    _mapper.Map(user, loggedInUser);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        return loggedInUser;
    }

    public bool SignUp(SignupModel model)
    {
        if (model.Password == model.ConfirmPassword)
        {
            if (model.Email == null || model.Password == null || model.RoleId == 0) return false;

            var newUser = new User() { IsActive = true };
            _mapper.Map(model, newUser);

            try
            {
                _context.Users.Add(newUser);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
        else return false;
    }

}

public class Authorize : Attribute, IAuthorizationFilter
{
    private readonly string _role;

    public Authorize(string role = "")
    {
        _role = role;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var _jwt = context.HttpContext.RequestServices.GetService<IJwtService>();


        var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();


        if (token == null || !_jwt.ValidateToken(token, out JwtSecurityToken jwtToken))
        {
            context.Result = new UnauthorizedObjectResult("Unauthorized!");
            return;
        }



        var roleClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);

        if (roleClaim == null)
        {
            context.Result = new UnauthorizedObjectResult("Unauthorized!");
            return;
        }



        if (roleClaim.Value != _role || _role == null)
        {
            context.Result = new UnauthorizedObjectResult("Unauthorized!");
            return;
        }
    }
}