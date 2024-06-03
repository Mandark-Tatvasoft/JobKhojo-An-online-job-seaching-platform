using System.IdentityModel.Tokens.Jwt;
using Data.Models;

namespace BusinessLogic.Repository.Interfaces;

public interface IJwtService
{
    public string GenerateToken(UserModel user);
    public bool ValidateToken(string token, out JwtSecurityToken jwtSecurityToken);
}
