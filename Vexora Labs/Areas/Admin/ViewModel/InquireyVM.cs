
using System.ComponentModel.DataAnnotations;

namespace Vexora.Models
{
    public class InquiriesViewModel
    {
        public List<ServiceInquiryViewModel> ServiceInquiries { get; set; }
        public List<UserForm> UserForms { get; set; }
      
    }

    public class InquiriesFilterViewModel
    {
        [Display(Name = "Search")]
        public string Search { get; set; }

        [Display(Name = "Status")]
        public string Status { get; set; } = "all";

        [Display(Name = "From Date")]
        [DataType(DataType.Date)]
        public DateTime? FromDate { get; set; }

        [Display(Name = "To Date")]
        [DataType(DataType.Date)]
        public DateTime? ToDate { get; set; }

        public string ActiveTab { get; set; }
    }
}
