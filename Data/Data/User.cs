using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.Data;

public partial class User
{
    [Key]
    public int UserId { get; set; }

    [StringLength(128)]
    public string Username { get; set; } = null!;

    [StringLength(128)]
    public string Firstname { get; set; } = null!;

    [StringLength(128)]
    public string? Lastname { get; set; }

    [Column(TypeName = "character varying")]
    public string Email { get; set; } = null!;

    [StringLength(128)]
    public string PasswordHashed { get; set; } = null!;

    public int? RoleId { get; set; }

    [Column(TypeName = "character varying")]
    public string? Resume { get; set; }

    [Column(TypeName = "character varying")]
    public string? CompanyName { get; set; }

    [Column(TypeName = "character varying")]
    public string? Mobile { get; set; }

    public int[]? AppliedJobs { get; set; }

    public int[]? SavedJobs { get; set; }

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Job> Jobs { get; set; } = new List<Job>();

    [ForeignKey("RoleId")]
    [InverseProperty("Users")]
    public virtual Role? Role { get; set; }
}
