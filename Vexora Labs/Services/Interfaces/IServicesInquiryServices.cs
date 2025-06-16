namespace Vexora_Labs.Services.Interfaces
{
    public interface IServicesInquiryServices
    {
        Task<ServiceInquiryViewModel> GetByIdAsync(int id);
        Task<IEnumerable<ServiceInquiryViewModel>> GetAllAsync();
        Task<ServiceInquiryViewModel> CreateAsync(ServiceInquiryViewModel project);
        Task UpdateAsync(ServiceInquiryViewModel project);
        Task DeleteAsync(int id);
    }
}
