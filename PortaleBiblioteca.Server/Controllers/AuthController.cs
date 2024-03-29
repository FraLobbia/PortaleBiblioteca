using Microsoft.AspNetCore.Mvc;
using PortaleBiblioteca.Server.Data;
using PortaleBiblioteca.Server.Data.Models;
using PortaleBiblioteca.Server.Data.ModelsForms;
namespace PortaleBiblioteca.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _db;

        public AuthController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpPost("token")]
        public IActionResult CreateToken([FromBody] LoginModel formlogin)
        {
            var user = Authenticate(formlogin);

            if (user != null)
            {
                var tokenString = TokenHandler.BuildToken(user, _configuration);

                return Ok(
                    new
                    {
                        token = tokenString,
                        User = new
                        {
                            user.IdUser,
                            user.FirstName,
                            user.LastName,
                            user.Email,
                            user.Role,
                            user.UserImage,
                        }
                    }
                );
            }

            return Unauthorized();
        }

        // private string BuildToken(User user)
        // {
        //     var claims = new[]
        //     {
        //         new Claim(JwtRegisteredClaimNames.Jti, user.IdUser.ToString()),
        //         new Claim(JwtRegisteredClaimNames.Sub, user.Email),
        //         new Claim(ClaimTypes.Role, user.Role),
        //     };

        //     var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //     var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //     var token = new JwtSecurityToken(
        //         _configuration["Jwt:Issuer"],
        //         _configuration["Jwt:Audience"],
        //         claims,
        //         expires: DateTime.Now.AddDays(7),
        //         signingCredentials: creds
        //     );

        //     return new JwtSecurityTokenHandler().WriteToken(token);
        // }

        private User Authenticate(LoginModel login)
        {
            var user = _db.Users.FirstOrDefault(u =>
                u.Email == login.Email && u.Password == login.Password
            );

            if (user == null)
            {
                return null;
            }

            return new User
            {
                IdUser = user.IdUser,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role,
                UserImage = user.UserImage,
            };
        }
    }
}
