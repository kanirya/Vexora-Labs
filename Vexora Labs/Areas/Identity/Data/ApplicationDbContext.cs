using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Vexora_Labs.Areas.Admin.Models;
using Vexora_Labs.Areas.Identity.Data;

namespace Vexora_Labs.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<ServiceInquiryViewModel> ServiceInquiryViewModels { get; set; }
    public DbSet<UserForm> UserForms { get; set; }
    public DbSet<ProjectRequest> ProjectRequests { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectStep> ProjectSteps { get; set; }
    public DbSet<ProjectStepLog> ProjectStepLogs { get; set; }
    public DbSet<CommitLog> CommitLogs { get; set; }
    public DbSet<CommitFileChange> CommitFileChanges { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Many-to-Many: Project <-> Employees (ApplicationUser)
        modelBuilder.Entity<Project>()
            .HasMany(p => p.AssignedEmployees)
            .WithMany()
            .UsingEntity(j => j.ToTable("ProjectEmployees"));

        // One-to-Many: ProjectRequest -> Project
        modelBuilder.Entity<ProjectRequest>()
            .HasOne(pr => pr.Project)
            .WithOne()
            .HasForeignKey<ProjectRequest>(pr => pr.ProjectId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ProjectRequest>()
            .HasOne(pr => pr.ApprovedBy)
            .WithMany()
            .HasForeignKey(pr => pr.ApprovedById)
            .OnDelete(DeleteBehavior.Restrict);

        // Project -> Client (User)
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Client)
            .WithMany(u => u.Projects)
            .HasForeignKey(p => p.ClientId)
            .OnDelete(DeleteBehavior.Restrict);

        // CommitLog -> Project
        modelBuilder.Entity<CommitLog>()
            .HasOne(c => c.Project)
            .WithMany(p => p.Commits)
            .HasForeignKey(c => c.ProjectId);

        // CommitLog -> User (optional)
        modelBuilder.Entity<CommitLog>()
            .HasOne(c => c.User)
            .WithMany(u => u.CommitLogs)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<ProjectStepLog>()
      .HasOne(s => s.Step)
      .WithMany(p => p.Logs)
      .HasForeignKey(s => s.StepId)
      .OnDelete(DeleteBehavior.Restrict); // or .NoAction

        modelBuilder.Entity<ProjectStepLog>()
            .HasOne(s => s.Project)
            .WithMany(p => p.StepLogs)
            .HasForeignKey(s => s.ProjectId)
            .OnDelete(DeleteBehavior.Restrict); // or .NoAction

        modelBuilder.Entity<ProjectStepLog>()
            .HasOne(s => s.UpdatedBy)
            .WithMany(u => u.StepLogs)
            .HasForeignKey(s => s.UpdatedById)
            .OnDelete(DeleteBehavior.Restrict);


        // CommitFileChange -> CommitLog
        modelBuilder.Entity<CommitFileChange>()
            .HasOne(f => f.CommitLog)
            .WithMany(c => c.FileChanges)
            .HasForeignKey(f => f.CommitLogId);
    }
}
