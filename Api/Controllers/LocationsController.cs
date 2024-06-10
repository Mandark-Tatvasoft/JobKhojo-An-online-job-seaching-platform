using BusinessLogic.Repository.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly ILocations _locations;

        public LocationsController(ILocations locations) 
        {
            _locations = locations;
        }

        [HttpGet("GetAllLocations")]
        public IActionResult GetAll() 
        {
            var data = _locations.GetAllLocations();
            var res = new ResponseModel<List<LocationModel>>();

            if(data.Count() != 0)
            {
                res.IsSuccess = true;
                res.Data = data;
                return Ok(res);
            }

            else
            {
                res.IsSuccess = false;
                res.Message = "No locations found";
                return NotFound(res);
            }
        }
    }
}
