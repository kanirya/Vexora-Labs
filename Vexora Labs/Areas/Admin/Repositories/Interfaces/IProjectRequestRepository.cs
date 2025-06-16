using Vexora_Labs.Areas.Admin.Models;

namespace Vexora_Labs.Areas.Admin.Repositories.Interfaces
{
    public interface IInquiryRepository:IReadRepository<ProjectRequest>,IWriteRepository<ProjectRequest>
    {
    }
}
