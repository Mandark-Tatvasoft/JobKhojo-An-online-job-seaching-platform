using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Data;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
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

        private string contentPath = @"D:\Projects\JobKhojo\Client\job-khojo\src\assets";

        public Users(AppDbContext context, IJwtService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        public List<ProfileModel> GetUsers()
        {
            var model = new List<ProfileModel>();
            var users = _context.Users.ToList();
            if(users !=  null)
            {
                foreach(var user in users)
                {
                    model.Add(new ProfileModel
                    {
                        Email = user.Email,
                        UserId = user.UserId,
                        Firstname = user.Firstname,
                        Lastname = user.Lastname,
                        Username = user.Username,
                        Mobile = user.Mobile
                    });
                }
            }

            return model;
        }

        public ProfileModel GetUser(string token)
        {
            var model = new ProfileModel();
            if(token != null)
            {
                _jwt.ValidateToken(token, out JwtSecurityToken validatedToken);
                if(validatedToken != null)
                {
                    var userId = int.Parse(validatedToken.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                    var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
                    if (user != null)
                    {
                        model.Username = user.Username;
                        model.UserId = user.UserId;
                        model.Firstname = user.Firstname;
                        model.Lastname = user.Lastname;
                        model.Email = user.Email;
                        model.Mobile = user.Mobile;
                        model.Resume = user.Resume!;
                    }
                }
            }

            return model;
        }

        public SignupModel GetUserById(int id)
        {
            var model = new SignupModel();
            var user = _context.Users.FirstOrDefault(u => u.UserId == id);
            if (user != null)
            {
                model.Firstname = user.Firstname;
                model.Lastname = user.Lastname;
                model.Email = user.Email;
                model.Mobile = user.Mobile;
                model.Role = user.RoleId;
                model.CompanyName = user.CompanyName;
            }
            return model;
        }

        public List<RecruiterModel> GetRecruiters()
        {
            var model = new List<RecruiterModel>();
            var recruiters = _context.Users.Where(u => u.RoleId == 2).ToList();
            if (recruiters.Count > 0)
            {
                foreach (var recruiter in recruiters)
                {
                    model.Add(new RecruiterModel
                    {
                        UserId = recruiter.UserId,
                        CompanyName = recruiter.CompanyName
                    });
                }
            }
            return model;
        }

        public bool AddUser(SignupModel model)
        {
            if (model.Password == model.ConfirmPassword)
            {
                var newUser = new User()
                {
                    Username = model.Username,
                    Email = model.Email,
                    Firstname = model.Firstname,
                    Lastname = model.Lastname,
                    PasswordHashed = model.Password,
                    Mobile = model.Mobile,
                    RoleId = model.Role,
                    CompanyName = model.CompanyName,
                    AppliedJobs = new int[0],
                    SavedJobs = new int[0],
                    IsActive = true
                };

                try
                {
                    _context.Users.Add(newUser);
                    _context.SaveChanges();
                    return true;
                }

                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
            else return false;
        }

        public bool DisableUser(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user != null) 
            { 
                user.IsActive = false;

                try
                {
                    _context.SaveChanges();
                    return true;
                }

                catch (Exception ex) 
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
            else return false;
        }

        public bool UpdateUserProfile(ProfileModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == model.UserId);
            if (user != null)
            {
                user.Resume = model.Resume != null || model.Resume != "" ? model.Resume : user.Resume;
                user.Username = model.Username;
                user.Email = model.Email;
                user.Mobile = model.Mobile;
                user.Firstname = model.Firstname;
                user.Lastname = model.Lastname;
            }

            else
            {
                return false;
            }

            try
            {
                string path = contentPath;
                string filePath = model.UserId + "_Resume." + model.ResumeFile.FileName.Split('.').LastOrDefault();
                string fullPath = Path.Combine(path, filePath);

                IFormFile file1 = model.ResumeFile;
                FileStream stream = new FileStream(fullPath, FileMode.Create);
                file1.CopyTo(stream);

                user.Resume = filePath;
                stream.Close();
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
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

        public bool AdminEditUser(SignupModel model, int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == id);
            if (user != null)
            {
                user.Email = model.Email;
                user.Mobile = model.Mobile;
                user.Firstname = model.Firstname;
                user.Lastname = model.Lastname;
                user.RoleId = model.Role;
                user.CompanyName = model.CompanyName;
                try
                {
                    _context.SaveChanges();
                    return true;
                }

                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
            else return false;
        }
    }
}
