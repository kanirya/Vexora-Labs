using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics;
using Vexora_Labs.Data;
using Vexora_Labs.Models;
using Vexora_Labs.Repo.SignalR;

namespace Vexora_Labs.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;


        private readonly IHubContext<ChatHub> _hubContext;


        public HomeController(
            ILogger<HomeController> logger,
            ApplicationDbContext context,
            IHubContext<ChatHub> hubContext)
        {
            _context = context;
            _logger = logger;
            _hubContext = hubContext; // ✅ this was missing
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
        public async Task<IActionResult> UserForm(ServiceInquiryViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            // Save inquiry to database
            await _context.ServiceInquiryViewModels.AddAsync(model);
            await _context.SaveChangesAsync();

            // Send SignalR message to Admin group
            await _hubContext.Clients.Group("Admins")
                .SendAsync("ReceiveNotification", new
                {
                    Message = "📩 New service inquiry submitted",
                    Time = DateTime.Now.ToString("HH:mm:ss")
                });

            return RedirectToAction("ThankYou");
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(UserForm model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            await _context.UserForms.AddAsync(model);
            _context.SaveChanges();
            
            return RedirectToAction("ThankYou");
        }

        public IActionResult ThankYou()
        {
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
