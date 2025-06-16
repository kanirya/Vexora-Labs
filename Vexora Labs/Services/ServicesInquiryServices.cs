using Vexora_Labs.Repositories.Interfaces;
using Vexora_Labs.Services.Interfaces;

namespace Vexora_Labs.Services
{
    public class ServicesInquiryServices : IServicesInquiryServices
    {
        private readonly IServicesInquiryRepository servicesInquiryServices;
        public ServicesInquiryServices(IServicesInquiryRepository servicesInquiryServices)
        {
            this.servicesInquiryServices = servicesInquiryServices;
        }

        public   Task<ServiceInquiryViewModel> CreateAsync(ServiceInquiryViewModel project)=> servicesInquiryServices.AddAsync(project);
     

      public  Task DeleteAsync(int id)=> servicesInquiryServices.DeleteAsync(id);


      public  Task<IEnumerable<ServiceInquiryViewModel>> GetAllAsync()=>servicesInquiryServices.GetAllAsync();
        

     public   Task<ServiceInquiryViewModel> GetByIdAsync(int id)=>servicesInquiryServices.GetByIdAsync(id);
      
     public   Task UpdateAsync(ServiceInquiryViewModel project)=> servicesInquiryServices.UpdateAsync(project);

    }
}
