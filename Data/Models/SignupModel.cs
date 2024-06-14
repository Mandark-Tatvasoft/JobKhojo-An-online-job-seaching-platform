using System.ComponentModel.DataAnnotations;
using Data.Validations;

namespace Data.Models;

public class SignupModel
{
    [Required(ErrorMessage = "Firstname is required"), WhiteSpaceValidator]
    public string Firstname { get; set; }

    [Required(ErrorMessage = "Lastname is required"), WhiteSpaceValidator]
    public string? Lastname { get; set; }

    [Required(ErrorMessage = "Email is required"), WhiteSpaceValidator]
    public string Email { get; set; }

    public string? Mobile { get; set; }

    [Required(ErrorMessage = "Username is required"), WhiteSpaceValidator]
    public string? Username { get; set; }

    [Required(ErrorMessage = "Password is required"), WhiteSpaceValidator]
    public string? Password { get; set; }

    [Required(ErrorMessage = "Confirm password is required"), WhiteSpaceValidator, Compare("Password", ErrorMessage = "Password and confirm password do not match")]
    public string? ConfirmPassword { get; set; }

    [Required(ErrorMessage = "Role is required")]
    public int? RoleId { get; set; }

    public string? CompanyName { get; set; }

    public string? Resume { get; set; }
}
