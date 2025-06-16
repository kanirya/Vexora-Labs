namespace Vexora_Labs.Repositories.Interfaces
{
    public interface IWriteRepo<T>
    {
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
}
