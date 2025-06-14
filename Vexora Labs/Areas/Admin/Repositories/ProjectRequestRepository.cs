using Microsoft.EntityFrameworkCore;
using Vexora_Labs.Areas.Admin.Models;
using Vexora_Labs.Areas.Admin.Repositories.Interfaces;
using Vexora_Labs.Data;

namespace Vexora_Labs.Areas.Admin.Repositories
{
    public class ProjectRequestRepository : IProjectRequestRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<ProjectRequest> _dbSet;
        public ProjectRequestRepository(ApplicationDbContext context) {
        _context=context;
            _dbSet=context.ProjectRequests;
        }

        public async Task<ProjectRequest> GetByIdAsync(int id) => await _dbSet.FindAsync(id);
        public async Task<IEnumerable<ProjectRequest>> GetAllAsync() => await _dbSet.Include(p=>p.ApprovedBy).Include(p => p.Project).ToListAsync();

        public async Task<ProjectRequest> AddAsync(ProjectRequest entity)
        {
            
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(ProjectRequest entity)
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
