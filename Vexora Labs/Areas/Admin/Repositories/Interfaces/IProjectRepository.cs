using Vexora_Labs.Areas.Admin.Models;

namespace Vexora_Labs.Areas.Admin.Repositories.Interfaces
{
    public interface IProjectRepository:IWriteRepository<Project>, IReadRepository<Project>
    {
    }
  
}
