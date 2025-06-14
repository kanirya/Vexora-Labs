namespace Vexora_Labs.Areas.Admin.Repositories.Interfaces
{
    public interface IReadRepository<T>
    {
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
    }
}
