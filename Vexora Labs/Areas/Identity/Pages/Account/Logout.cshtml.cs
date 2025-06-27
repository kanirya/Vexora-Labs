#nullable disable

using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Vexora_Labs.Areas.Identity.Data;

namespace Vexora_Labs.Areas.Identity.Pages.Account
{
    public class LogoutModel : PageModel
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<LogoutModel> _logger;

        public LogoutModel(SignInManager<ApplicationUser> signInManager,
                           UserManager<ApplicationUser> userManager,
                           ILogger<LogoutModel> logger)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
        }

        public async Task<IActionResult> OnPost(string returnUrl = null)
        {
            var refreshToken = Request.Cookies["refresh_token"];

            if (!string.IsNullOrEmpty(refreshToken))
            {
                var user = _userManager.Users.FirstOrDefault(u => u.RefreshToken == refreshToken);

                if (user != null)
                {
                    user.RefreshToken = null;
                    user.RefreshTokenExpiryTime = DateTime.MinValue;
                    await _userManager.UpdateAsync(user);
                }

                Response.Cookies.Delete("refresh_token");
            }

            Response.Cookies.Delete("access_token");

            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out and tokens cleared.");

            return !string.IsNullOrEmpty(returnUrl) ? LocalRedirect(returnUrl) : RedirectToPage("/Index");
        }
    }
}
