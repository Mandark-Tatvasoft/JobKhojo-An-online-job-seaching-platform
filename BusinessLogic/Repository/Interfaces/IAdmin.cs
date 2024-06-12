using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Repository.Interfaces
{
    public interface IAdmin
    {
        public bool AddUser(SignupModel model);

        public bool EditUser(SignupModel model, int id);

        public List<RecruiterModel> GetRecruiters();

        public bool AddJob(JobModel model);

        public bool EditJob(JobModel model);

        public bool AddLocation(LocationModel model);

        public bool EditLocation(LocationModel model);
    }
}
