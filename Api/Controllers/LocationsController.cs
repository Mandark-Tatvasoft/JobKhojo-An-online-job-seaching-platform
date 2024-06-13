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

        #region Get

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

        [HttpGet("GetLocation")]
        public IActionResult Get(int id)
        {
            var res = new ResponseModel<LocationModel>();
            var data = _locations.GetLocationById(id);
            if(data != null)
            {
                res.IsSuccess = true;
                res.Data = data;
                return Ok(res);
            }
            else
            {
                res.IsSuccess = false;
                res.Message = "There is no such location";
                return NotFound(res);
            }
        }

        #endregion
    }
}
