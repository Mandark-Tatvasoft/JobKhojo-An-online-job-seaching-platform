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

    [ForeignKey("CreatedBy")]
    [InverseProperty("Jobs")]
    public virtual User CreatedByNavigation { get; set; } = null!;
}
