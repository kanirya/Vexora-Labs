using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vexora.Models;
using Vexora_Labs.Areas.Admin.Models;
using Vexora_Labs.Areas.Identity.Data;
using Vexora_Labs.Data;

namespace Vexora_Labs.Areas.Admin.Controllers;

[Area("Admin")]
public class InquiriesController : Controller
{
    
     
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public InquiriesController(ApplicationDbContext context,UserManager<ApplicationUser> userManager)
        {
            _context = context;
        _userManager=userManager;
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

            _context.ProjectRequests.Add(project);
            _context.ServiceInquiryViewModels.Remove(inquiry);

            await _context.SaveChangesAsync();
        }

        return RedirectToAction("Index");
    }
 



}

