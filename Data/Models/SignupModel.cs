namespace Data.Models;

public class SignupModel
{
    public string Firstname { get; set; }

    public string Lastname { get; set; }

    public string Email { get; set; }

    public int Mobile { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string ConfirmPassword { get; set; }

    public int Role { get; set; }

    public string CompanyName { get; set; }

    public string Resume { get; set; }
}
