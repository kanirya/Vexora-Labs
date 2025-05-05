using Microsoft.AspNetCore.Mvc;

namespace Vexora_Labs.Controllers
{
    public class ServicesController : Controller
    {
        public IActionResult Web()
        {
            return View();
        }
        public IActionResult MobileDev()
        {
            return View();
        }
        public IActionResult Cloud(){
            return View();
        }

        public IActionResult CRM()
        {
            return View();
        }
    }
}
