using System.ComponentModel.DataAnnotations;
using Vexora_Labs.Areas.Identity.Data;

namespace Vexora_Labs.Areas.Admin.Models
{
    public class CommitLog
    {
        [Key]
        public Guid Id { get; set; }

        public Guid ProjectId { get; set; }
        public Project Project { get; set; }

        [Required]
        public string CommitId { get; set; }

        [MaxLength(300)]
        public string Message { get; set; }

        [MaxLength(300)]
        public string Url { get; set; }

        public DateTime CommittedAt { get; set; }

        public string? UserId { get; set; }
        public ApplicationUser User { get; set; } // Optional: resolved by GitHub username/email

        public ICollection<CommitFileChange> FileChanges { get; set; }
    }


    public class CommitFileChange
    {
        [Key]
        public Guid Id { get; set; }

        public Guid CommitLogId { get; set; }
        public CommitLog CommitLog { get; set; }

        [MaxLength(500)]
        public string FilePath { get; set; }

        public FileChangeType ChangeType { get; set; }
    }

    public enum FileChangeType
    {
        Added,
        Modified,
        Deleted,
        Renamed
    }


}
