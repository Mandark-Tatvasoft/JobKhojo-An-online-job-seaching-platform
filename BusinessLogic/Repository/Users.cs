using AutoMapper;
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
        private readonly IMapper _mapper;

        private string contentPath = @"D:\Projects\JobKhojo\Client\job-khojo\src\assets";

        public Users(AppDbContext context, IJwtService jwt, IMapper mapper)
        {
            _context = context;
            _jwt = jwt;
            _mapper = mapper;
        }

        public List<ProfileModel> GetUsers()
        {
            var model = new List<ProfileModel>();
            var users = _context.Users.ToList();
            if(users !=  null)
            {
                foreach(var user in users)
                {
                    var newUser = new ProfileModel();
                    model.Add(_mapper.Map(user, newUser));
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
                        _mapper.Map(user, model);
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
                _mapper.Map(user, model);
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
                    var newRecruiter = new RecruiterModel();
                    model.Add(_mapper.Map(recruiter, newRecruiter));
                }
            }
            return model;
        }

        public bool AddUser(SignupModel model)
        {
            if (model.Password == model.ConfirmPassword)
            {
                var newUser = new User();
                _mapper.Map(model, newUser);
                newUser.AppliedJobs = new int[0];
                newUser.SavedJobs = new int[0];
                newUser.IsActive = true;

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

        public bool ToggleUserActive(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user != null) 
            { 
                user.IsActive = !user.IsActive;

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
                _mapper.Map(model, user);
            }

            else
            {
                return false;
            }

            try
            {
                string path = contentPath;
                string filePath = model.UserId + "_" + model.ResumeFile.FileName;
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
                _mapper.Map(model, user);

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
