using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Repository
{
    public class Users : IUsers
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwt;

        public Users(AppDbContext context, IJwtService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        public ProfileModel GetUser(string token)
        {
            var model = new ProfileModel();
            if(token != null)
            {
                _jwt.ValidateToken(token, out JwtSecurityToken validatedToken);
                var userId = int.Parse(validatedToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
                if (user != null)
                {
                    model.Username = user.Username;
                    model.UserId = user.UserId;
                    model.Resume = user.Resume != null ? user.Resume : null;
                    model.Firstname = user.Firstname;
                    model.Lastname = user.Lastname;
                    model.Email = user.Email;
                    model.Mobile = user.Mobile;
                }
            }

            return model;
        }

        public bool UpdateUser(ProfileModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == model.UserId);
            if (user != null)
            {
                user.Resume = model.Resume;
                user.Username = model.Username;
                user.Email = model.Email;
                user.Mobile = model.Mobile;
                user.Firstname = model.Firstname;
                user.Lastname = model.Lastname;
            }

            try
            {
                _context.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
