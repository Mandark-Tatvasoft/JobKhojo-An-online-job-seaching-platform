using Data.Models;

namespace BusinessLogic.Repository.Interfaces;

public interface ILogin
{
    public UserModel LogIn(LoginModel model);

    public bool SignUp(SignupModel model);
}
