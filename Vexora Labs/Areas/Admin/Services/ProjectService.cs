using Vexora_Labs.Areas.Admin.Models;
using Vexora_Labs.Areas.Admin.Repositories.Interfaces;
using Vexora_Labs.Areas.Admin.Services.Interfaces;

namespace Vexora_Labs.Areas.Admin.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _repository;

        public ProjectService(IProjectRepository repository)
        {
            _repository = repository;
        }

        public Task<Project> GetByIdAsync(int id) => _repository.GetByIdAsync(id);

        public Task<IEnumerable<Project>> GetAllAsync() => _repository.GetAllAsync();

        public Task<Project> CreateAsync(Project project) => _repository.AddAsync(project);

        public Task UpdateAsync(Project project) => _repository.UpdateAsync(project);

        public Task DeleteAsync(int id) => _repository.DeleteAsync(id);
    }
}
