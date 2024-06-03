using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Data;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLogic.Repository;

public class Login : ILogin
{
    private readonly AppDbContext _context;

    public Login(AppDbContext context)
    {
        _context = context;
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
                    loggedInUser.UserName = user.Username;
                    loggedInUser.UserId = user.UserId.ToString();
                    loggedInUser.Role = user.RoleId.ToString();
                    loggedInUser.Email = model.Email;
                    return loggedInUser;
                }
                else
                {
                    return loggedInUser;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return loggedInUser;
            }


        }
        else
        {
            return loggedInUser;
        }
    }

    public bool SignUp(SignupModel model)
    {
        if (model.Password == model.ConfirmPassword)
        {
            if (model.Email == null || model.Password == null || model.Role == 0) return false;

            var newUser = new User()
            {
                Username = model.Username,
                PasswordHashed = model.Password,
                Email = model.Email,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Mobile = model.Mobile,
                RoleId = model.Role,
                CompanyName = model.CompanyName,
                Resume = model.Resume
            };

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


        var request = context.HttpContext.Request;
        var token = request.Cookies["jwt"];


        if (token == null || !_jwt.ValidateToken(token, out JwtSecurityToken jwtToken))
        {
            context.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Auth", action = "Error" }));
            return;
        }



        var roleClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);

        if (roleClaim == null)
        {
            context.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Auth", action = "Error" }));
            return;
        }



        if (roleClaim.Value != _role || _role == null)
        {
            context.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Auth", action = "Error" }));
            return;
        }
    }
}