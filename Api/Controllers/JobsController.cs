using BusinessLogic.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class JobsController : ControllerBase
{
    [HttpGet("GetAllJobs")]
    public IActionResult GetAll()
    {
        return Ok("hi if authenticated!");
    }
}
