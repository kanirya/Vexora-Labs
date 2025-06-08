using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vexora_Labs.Data;
using Vexora.Models;

namespace Vexora_Labs.Areas.Admin.Controllers;

[Area("Admin")]
public class InquiriesController : Controller
{
    
     
        private readonly ApplicationDbContext _context;

        public InquiriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            
            return View(_context.ServiceInquiryViewModels.ToList());
        }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public int Approve(int id)
    {
        // your logic here, save to db, etc.
        return id;
    }




}

