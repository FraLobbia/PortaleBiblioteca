﻿using Microsoft.AspNetCore.Mvc;
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

            return Unauthorized(new { message = "Email o password non validi" });
        }

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
