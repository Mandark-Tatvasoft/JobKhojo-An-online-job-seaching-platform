using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.Data;

public partial class JobType
{
    [Key]
    public int Id { get; set; }

    [Column("JobType")]
    [MaxLength(1)]
    public char? JobType1 { get; set; }

    [InverseProperty("JobTypeNavigation")]
    public virtual ICollection<Job> Jobs { get; set; } = new List<Job>();
}
