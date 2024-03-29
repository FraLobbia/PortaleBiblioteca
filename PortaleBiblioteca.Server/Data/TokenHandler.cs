using Microsoft.IdentityModel.Tokens;
using PortaleBiblioteca.Server.Data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PortaleBiblioteca.Server.Data.ModelsForms;

namespace PortaleBiblioteca.Server.Data
{
  public static class TokenHandler
  {

    public static string BuildToken(User user, IConfiguration configuration)
    {
      var claims = new[]
      {
                new Claim(JwtRegisteredClaimNames.Jti, user.IdUser.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
            };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken(
              configuration["Jwt:Issuer"],
              configuration["Jwt:Audience"],
          claims,
          expires: DateTime.Now.AddDays(7),
          signingCredentials: creds
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }
}
