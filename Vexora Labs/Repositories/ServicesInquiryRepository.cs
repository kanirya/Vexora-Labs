using Microsoft.EntityFrameworkCore;
using Vexora_Labs.Areas.Admin.Models;
using Vexora_Labs.Areas.Admin.Repositories.Interfaces;
using Vexora_Labs.Data;
using Vexora_Labs.Repositories.Interfaces;

namespace Vexora_Labs.Repositories
{
    public class ServicesInquiryRepository : IServicesInquiryRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<ServiceInquiryViewModel> _dbSet;
        public ServicesInquiryRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet=context.ServiceInquiryViewModels;
        }

       public async Task<ServiceInquiryViewModel> AddAsync(ServiceInquiryViewModel entity)
        {
           await  _dbSet.AddAsync(entity);
          await  _context.SaveChangesAsync();
            return entity;
            
        }

           public async   Task DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

       public async Task<IEnumerable<ServiceInquiryViewModel>> GetAllAsync()=> await _dbSet.ToListAsync();
      

       public async Task<ServiceInquiryViewModel> GetByIdAsync(int id)=> await _dbSet.FindAsync(id);
    

         public async   Task UpdateAsync(ServiceInquiryViewModel entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();

        }
    }
}
