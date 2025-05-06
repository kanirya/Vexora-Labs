using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Vexora_Labs.Data;
using Vexora_Labs.Models;

namespace Vexora_Labs.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;
        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _context = context;
            
            
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
          public IActionResult UserForm()
        {
            return View(new ServiceInquiryViewModel());
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(ServiceInquiryViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);
            await _context.ServiceInquiryViewModels.AddAsync(model);
            _context.SaveChanges();
            return RedirectToAction("ThankYou");
            
        }




        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
