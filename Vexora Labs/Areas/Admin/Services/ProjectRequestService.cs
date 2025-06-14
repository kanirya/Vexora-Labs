using Vexora_Labs.Areas.Admin.Models;
using Vexora_Labs.Areas.Admin.Repositories.Interfaces;
using Vexora_Labs.Areas.Admin.Services.Interfaces;

namespace Vexora_Labs.Areas.Admin.Services
{
    public class ProjectRequestService : IProjectRequestService
    {
        private readonly IProjectRequestRepository _repository;
        public ProjectRequestService(IProjectRequestRepository repository)
        {
            _repository = repository;
        }

        public Task<ProjectRequest> GetByIdAsync(int id) => _repository.GetByIdAsync(id);

        public Task<IEnumerable<ProjectRequest>> GetAllAsync() => _repository.GetAllAsync();

        public Task<ProjectRequest> CreateAsync(ProjectRequest projectRequest) => _repository.AddAsync(projectRequest);

        public Task UpdateAsync(ProjectRequest projectRequest) => _repository.UpdateAsync(projectRequest);

        public Task DeleteAsync(int id) => _repository.DeleteAsync(id);
    }
}
