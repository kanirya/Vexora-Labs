using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Vexora_Labs.Areas.Admin.Controllers;

[Authorize]
[Area("Admin")]
public class DashboardController : Controller
{
    
   
    // GET
    public IActionResult Dashboard()
    {
        return View();
    }
}