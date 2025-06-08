using System.ComponentModel.DataAnnotations;
using Vexora_Labs.Areas.Identity.Data;

namespace Vexora_Labs.Areas.Admin.Models
{
    public class ProjectRequest
    {
        [Key]
        public Guid Id { get; set; }

        [Required, MaxLength(150)]
        public string ClientName { get; set; }

        [Required, EmailAddress, MaxLength(150)]
        public string ClientEmail { get; set; }

        [Required]
        public ProjectType ProjectType { get; set; }

        [Required, MaxLength(1000)]
        public string Description { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        public bool IsApproved { get; set; } = false;

        public string? ApprovedById { get; set; }
        public ApplicationUser ApprovedBy { get; set; }

        public Guid? ProjectId { get; set; }
        public Project Project { get; set; }
    }

    public enum ProjectType
    {
        Website,
        WebApplication,
        MobileApplication,
        DesktopApplication,
        Other
    }

}
