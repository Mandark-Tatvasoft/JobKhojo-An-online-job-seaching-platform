using System.ComponentModel.DataAnnotations;
using Data.Validations;

namespace Data.Models;

public class LoginModel
{

    [Required(ErrorMessage = "Email is required"), WhiteSpaceValidator]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required"), WhiteSpaceValidator]
    public string Password { get; set; }
}
