using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Vexora_Labs.Areas.Admin.Models;

namespace Vexora_Labs.Areas.Identity.Data;

// Add profile data for application users by adding properties to the ApplicationUser class
public class ApplicationUser : IdentityUser
{
    [Required]
    [StringLength(80)]
    public string Name { get; set; }
    public ICollection<Project> Projects { get; set; }
    public ICollection<CommitLog> CommitLogs { get; set; }
    public ICollection<ProjectStepLog> StepLogs { get; set; }
}

public enum UserRole
{
    Client,
    Employee,
    Admin
}

