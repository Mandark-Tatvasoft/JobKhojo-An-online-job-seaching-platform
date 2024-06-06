using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.Data;

public partial class Location
{
    [Key]
    public int Id { get; set; }

    [Column("Location", TypeName = "character varying")]
    public string? Location1 { get; set; }

    [InverseProperty("LocationNavigation")]
    public virtual ICollection<Job> Jobs { get; set; } = new List<Job>();
}
