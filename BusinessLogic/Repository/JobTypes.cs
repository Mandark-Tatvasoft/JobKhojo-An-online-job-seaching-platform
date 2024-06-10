using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Repository
{
    public class JobTypes : IJobTypes
    {
        private readonly AppDbContext _context;
        public JobTypes(AppDbContext context) 
        {
            _context = context;
        }

        public List<JobTypeModel> GetAllJobTypes()
        {
            var types = _context.JobTypes.ToList();
            var model = new List<JobTypeModel>();

            if (types.Count() != 0) 
            {
                foreach (var type in types)
                {
                    model.Add(new JobTypeModel
                    {
                        JobTypeId = type.Id,
                        JobType = type.JobType1
                    });
                }
            }

            return model;
        }
    }
}
