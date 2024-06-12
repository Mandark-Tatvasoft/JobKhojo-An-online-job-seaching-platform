using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Data;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Repository
{
    public class Admin : IAdmin
    {
        private readonly AppDbContext _context;

        public Admin(AppDbContext context)
        {
            _context = context;
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

        public bool EditUser(SignupModel model, int id)
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

        public List<RecruiterModel> GetRecruiters()
        {
            var model = new List<RecruiterModel>();
            var recruiters = _context.Users.Where(u => u.RoleId == 2).ToList();
            if(recruiters.Count > 0)
            {
                foreach(var recruiter in recruiters)
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

        public bool AddJob(JobModel model)
        {
            var newJob = new Job()
            {
                IsActive = model.IsActive,
                Title = model.Title,
                Subtitle = model.Subtitle,
                Openings = model.Openings,
                Salary = model.Salary,
                JobType = model.JobType,
                Location = model.Location,
                CreatedBy = model.CreatedBy,
                Description = model.Description,
            };

            try
            {
                _context.Jobs.Add(newJob);
                _context.SaveChanges();
                return true;
            }

            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool EditJob(JobModel model)
        {
            var job = _context.Jobs.FirstOrDefault(j => j.JobId == model.JobId);
            if(job != null)
            {
                job.IsActive = model.IsActive;
                job.Title = model.Title;
                job.Subtitle = model.Subtitle;
                job.Openings = model.Openings;
                job.Salary = model.Salary;
                job.JobType = model.JobType;
                job.Location = model.Location;
                job.CreatedBy = model.CreatedBy;
                job.Description = model.Description;
            }
            else
            {
                return false;
            }

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

        public bool AddLocation(LocationModel model)
        {
            var newLocation = new Location()
            {
                Location1 = model.LocationName
            };

            try
            {
                _context.Locations.Add(newLocation);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool EditLocation(LocationModel model)
        {
            var location = _context.Locations.FirstOrDefault(l => l.Id == model.LocationId);
            if(location != null)
            {
                location.Location1 = model.LocationName;
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
            else
            {
                return false;
            }
        }
    }
}
