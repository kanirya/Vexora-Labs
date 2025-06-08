using Microsoft.Build.Evaluation;
using System.ComponentModel.DataAnnotations;
using Vexora_Labs.Areas.Identity.Data;

namespace Vexora_Labs.Areas.Admin.Models
{
    public class Project
    {
        [Key]
        public Guid Id { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; }

        [MaxLength(200)]
        public string GitHubRepoUrl { get; set; }

        public ProjectStatus Status { get; set; } = ProjectStatus.InProgress;

        public string ClientId { get; set; }
        public ApplicationUser Client { get; set; }

        public ICollection<ApplicationUser> AssignedEmployees { get; set; }
        public ICollection<ProjectStep> Steps { get; set; }
        public ICollection<CommitLog> Commits { get; set; }
        public ICollection<ProjectStepLog> StepLogs { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum ProjectStatus
    {
        InProgress,
        Completed,
        Cancelled,
        OnHold
    }




    public class ProjectStep
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsCompleted { get; set; } = false;

        public Guid ProjectId { get; set; }
        public Project Project { get; set; }

        public ICollection<ProjectStepLog> Logs { get; set; }
    }



    public class ProjectStepLog
    {
        [Key]
        public Guid Id { get; set; }

        public Guid ProjectId { get; set; }
        public Project Project { get; set; }

        public Guid StepId { get; set; }
        public ProjectStep Step { get; set; }

        public string UpdatedById { get; set; }
        public ApplicationUser UpdatedBy { get; set; }

        public string Note { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }







}
