using Microsoft.EntityFrameworkCore;
using Vexora_Labs.Areas.Admin.Models;
using Vexora_Labs.Areas.Admin.Repositories.Interfaces;
using Vexora_Labs.Data;

namespace Vexora_Labs.Areas.Admin.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Project> _dbSet;

        public ProjectRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Projects;
        }

        public async Task<Project> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

        public async Task<IEnumerable<Project>> GetAllAsync() => await _dbSet.ToListAsync();

        public async Task<Project> AddAsync(Project entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(Project entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
