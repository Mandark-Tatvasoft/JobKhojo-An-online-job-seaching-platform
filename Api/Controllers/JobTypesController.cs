using BusinessLogic.Repository.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JobTypesController : ControllerBase
    {
        private readonly IJobs _jobs;
        public JobTypesController(IJobs jobs) 
        {
            _jobs = jobs;
        }

        #region Get 

        [HttpGet("GetAllJobTypes")]
        public IActionResult GetAll() 
        {
            var res = new ResponseModel<List<JobTypeModel>>();

            var data = _jobs.GetAllJobTypes();
            if(data.Count() != 0) 
            {
                res.Data = data;
                res.IsSuccess = true;
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "No job types found";
                return NotFound(res);
            }
        }
        #endregion
    }
}
