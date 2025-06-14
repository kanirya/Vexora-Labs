using Vexora_Labs.Areas.Admin.Models;

namespace Vexora_Labs.Areas.Admin.Services.Interfaces
{
    public interface IProjectService
    {
        Task<Project> GetByIdAsync(int id);
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project> CreateAsync(Project project);
        Task UpdateAsync(Project project);
        Task DeleteAsync(int id);
    }
}
