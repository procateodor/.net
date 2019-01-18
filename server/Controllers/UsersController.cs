using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Services;

namespace WebApi.Controllers {
    [Authorize]
    [ApiController]
    [Route ("[controller]")]
    public class UsersController : ControllerBase {
        private IUserService _userService;

        public UsersController (IUserService userService) {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost ("authenticate")]
        public IActionResult Authenticate ([FromBody] User userParam) {
            var user = _userService.Authenticate (userParam.Username, userParam.Password);

            if (user == null)
                return BadRequest (new { message = "Username or password is incorrect" });

            return Ok (user);
        }

        [AllowAnonymous]
        [HttpPost ("create")]
        public IActionResult Create ([FromBody] User userParam) {
            var user = _userService.Create (userParam.Username, userParam.Password, userParam.FirstName, userParam.LastName, userParam.Group);

            if (user == null)
                return BadRequest (new { message = "Data is incorrect" });

            return Ok (user);
        }
    }
}