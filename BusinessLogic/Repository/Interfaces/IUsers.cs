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
        public ProfileModel GetUser(string token);

        public Boolean UpdateUser(ProfileModel model);
    }
}
