using System.ComponentModel.DataAnnotations;

namespace Data.Validations;

public class WhiteSpaceValidator : ValidationAttribute
{
    public WhiteSpaceValidator()
    {
        const string defaultErrorMessage = "Whitespace not allowed";
        ErrorMessage ??= defaultErrorMessage;
    }

    protected override ValidationResult? IsValid(object? value,
                                         ValidationContext validationContext)
    {
        if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
        {
            return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
        }
        return ValidationResult.Success;
    }
}