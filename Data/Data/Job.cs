using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.Data;

public partial class Job
{
    [Key]
    public int JobId { get; set; }

    [Column(TypeName = "character varying")]
    public string Title { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string? Description { get; set; }

    public int? Openings { get; set; }

    public int CreatedBy { get; set; }

    public DateOnly? CreatedOn { get; set; }

    public DateOnly? UpdatedOn { get; set; }

    public bool? IsActive { get; set; }

    public int[]? AppliedBy { get; set; }

    public int? JobType { get; set; }

    public int? Salary { get; set; }

    public int? Location { get; set; }

    [StringLength(50)]
    public string? Subtitle { get; set; }

    [Column("isDeleted")]
    public bool? IsDeleted { get; set; }

    [ForeignKey("CreatedBy")]
    [InverseProperty("Jobs")]
    public virtual User CreatedByNavigation { get; set; } = null!;

    [ForeignKey("JobType")]
    [InverseProperty("Jobs")]
    public virtual JobType? JobTypeNavigation { get; set; }

    [ForeignKey("Location")]
    [InverseProperty("Jobs")]
    public virtual Location? LocationNavigation { get; set; }
}
