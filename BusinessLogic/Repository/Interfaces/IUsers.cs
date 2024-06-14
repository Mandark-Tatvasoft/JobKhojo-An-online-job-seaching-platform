using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Repository.Interfaces
{
    public interface IUsers
    {
        public List<ProfileModel> GetUsers();

        public ProfileModel GetUser(string token);

        public SignupModel GetUserById(int id);

        public List<RecruiterModel> GetRecruiters();

        public bool AddUser(SignupModel model);

        public bool ToggleUserActive(int jobId);

        public bool UpdateUserProfile(ProfileModel model);

        public bool AdminEditUser(SignupModel model, int id);
    }
}
