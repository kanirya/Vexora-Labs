namespace Vexora_Labs.Areas.Admin.Repositories.Interfaces
{
    public interface IWriteRepository<T>
    {
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
}
