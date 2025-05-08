using Microsoft.AspNetCore.Mvc;

namespace Vexora_Labs.Areas.Admin.Controllers;

public class DashboardController : Controller
{
    [Area("Admin")]
    // GET
    public IActionResult Dashboard()
    {
        return View();
    }
}