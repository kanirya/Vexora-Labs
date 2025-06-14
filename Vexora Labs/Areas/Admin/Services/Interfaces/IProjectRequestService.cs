using Vexora_Labs.Areas.Admin.Models;

namespace Vexora_Labs.Areas.Admin.Services.Interfaces
{
    public interface IProjectRequestService
    {
        Task<ProjectRequest> GetByIdAsync(int id);
        Task<IEnumerable<ProjectRequest>> GetAllAsync();
        Task<ProjectRequest> CreateAsync(ProjectRequest projectRequest);
        Task UpdateAsync(ProjectRequest projectRequest);
        Task DeleteAsync(int id);
    }
}
