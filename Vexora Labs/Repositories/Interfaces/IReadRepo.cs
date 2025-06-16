namespace Vexora_Labs.Repositories.Interfaces
{
    public interface IReadRepo<T>
    {
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
    }
}
