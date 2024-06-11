using System.ComponentModel.DataAnnotations;
using Data.Validations;

namespace Data.Models;

public class JobModel
{
    public int JobId { get; set; }

    [Required(ErrorMessage = "Title is required"), WhiteSpaceValidator]
    public string Title { get; set; }

    public string Subtitle { get; set; }

    [Required(ErrorMessage = "Description is required"), WhiteSpaceValidator]
    public string Description { get; set; }

    [Required(ErrorMessage = "No. of Openings are required"), WhiteSpaceValidator]
    public int? Openings { get; set; }

    public int? Salary { get; set; }

    public int? JobType { get; set; }

    public int? Location { get; set; }

    public int CreatedBy { get; set; }

    public bool? IsActive { get; set; }

    public int AppliedBy { get; set; }

    public bool isApplied { get; set; }
}
