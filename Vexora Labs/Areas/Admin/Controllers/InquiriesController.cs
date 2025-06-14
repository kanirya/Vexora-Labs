using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vexora.Models;
using Vexora_Labs.Areas.Admin.Models;
using Vexora_Labs.Areas.Admin.Services.Interfaces;
using Vexora_Labs.Areas.Identity.Data;
using Vexora_Labs.Data;

namespace Vexora_Labs.Areas.Admin.Controllers;

[Area("Admin")]
public class InquiriesController : Controller
{
    
     
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
    private readonly IProjectRequestService _projectRequestService;

    public InquiriesController(ApplicationDbContext context,UserManager<ApplicationUser> userManager,IProjectRequestService projectRequestService)
        {
            _context = context;
        _userManager=userManager;
            _projectRequestService = projectRequestService;
    }

        public IActionResult Index()
        {
            
            return View(_context.ServiceInquiryViewModels.ToList());
        }
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Approve(int id)
    {
        var inquiry = await _context.ServiceInquiryViewModels.FindAsync(id);
        var user = await _userManager.GetUserAsync(User);

        if (inquiry != null && user != null)
        {
            var project = new ProjectRequest
            {
                ClientName = inquiry.FullName,
                ClientEmail = inquiry.Email,
                ProjectType = inquiry.ServiceType,
                IsApproved = true,
                ApprovedById = user.Id,
                Description = inquiry.ProjectDescription,
                SubmittedAt = DateTime.Now,
            };
            _context.ServiceInquiryViewModels.Remove(inquiry);
            await _context.SaveChangesAsync(); 

           await  _projectRequestService.CreateAsync(project);
            return RedirectToAction("Index", "ProjectRequest");
        }

        return RedirectToAction("Index");
    }


}

