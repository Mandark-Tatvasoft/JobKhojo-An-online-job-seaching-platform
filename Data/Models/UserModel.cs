namespace Data.Models;

public class UserModel
{
    public int UserId { get; set; }

    public string UserName { get; set; }

    public string Email { get; set; }

    public string RoleId { get; set; }

    public string Token { get; set; }

    public bool IsActive { get; set; }
}
