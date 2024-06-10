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
        private readonly IJobTypes _types;
        public JobTypesController(IJobTypes types) 
        {
            _types = types;
        }

        [HttpGet("GetAllJobTypes")]
        public IActionResult GetAll() 
        {
            var res = new ResponseModel<List<JobTypeModel>>();

            var data = _types.GetAllJobTypes();
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
    }
}
