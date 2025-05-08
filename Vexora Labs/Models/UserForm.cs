using System.ComponentModel.DataAnnotations;

public class ServiceInquiryViewModel
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "Please provide your full name.")]
    [StringLength(100, ErrorMessage = "Full name cannot exceed 100 characters.")]
    [Display(Name = "Full Name")]
    public string FullName { get; set; }

    [Required(ErrorMessage = "Please provide a valid email address.")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    [Display(Name = "Email Address")]
    public string Email { get; set; }

    [Phone(ErrorMessage = "Please enter a valid phone number.")]
    [Display(Name = "Phone Number (Optional)")]
    public string Phone { get; set; }

    [StringLength(100, ErrorMessage = "Company name cannot exceed 100 characters.")]
    [Display(Name = "Company Name (Optional)")]
    public string Company { get; set; }

    [Required(ErrorMessage = "Please select a service type.")]
    [Display(Name = "Service Type")]
    public string ServiceType { get; set; }

    [Display(Name = "Project Budget")]
    public string ProjectBudget { get; set; }

    [Display(Name = "Project Timeline")]
    public string ProjectTimeline { get; set; }

    [Display(Name = "How Did You Hear About Us?")]
    public string HearAboutUs { get; set; }

    [Required(ErrorMessage = "Please provide a brief description of your project.")]
    [StringLength(1000, ErrorMessage = "Description cannot exceed 1,000 characters.")]
    [DataType(DataType.MultilineText)]
    [Display(Name = "Project Description")]
    public string ProjectDescription { get; set; }

    [Required(ErrorMessage = "You must agree before submitting.")]
    [Range(typeof(bool), "true", "true", ErrorMessage = "You must agree to the privacy policy.")]
    [Display(Name = "I agree to the Privacy Policy")]
    public bool PrivacyPolicy { get; set; }

    [Display(Name = "Subscribe to Newsletter")]
    public bool Newsletter { get; set; }
}


public class UserForm
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "Please provide your full name.")]
    [StringLength(100, ErrorMessage = "Full name cannot exceed 100 characters.")]
    [Display(Name = "Full Name")]
    public string FullName { get; set; }

    [Required(ErrorMessage = "Please provide a valid email address.")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    [Display(Name = "Email Address")]
    public string Email { get; set; }

    [Phone(ErrorMessage = "Please enter a valid phone number.")]
    [Display(Name = "Phone Number (Optional)")]
    public string Phone { get; set; }

    [StringLength(100, ErrorMessage = "Subject cannot exceed 100 characters.")]
    [Display(Name = "Subject (Optional)")]
    public string Subject { get; set; }

    [Display(Name = "Message")]
    public string Message { get; set; }


}