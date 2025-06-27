using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Vexora_Labs.Areas.Identity.Data;
using Vexora_Labs.Services;

namespace Vexora_Labs.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtTokenService _tokenService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(UserManager<ApplicationUser> userManager, JwtTokenService tokenService, ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _logger = logger;
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken()
        {
            try
            {
                var refreshToken = Request.Cookies["refresh_token"];

                if (string.IsNullOrEmpty(refreshToken))
                {
                    _logger.LogWarning("Refresh token not found in cookie.");
                    return Unauthorized(new { message = "Refresh token is missing." });
                }

                var user = _userManager.Users.SingleOrDefault(u =>
                    u.RefreshToken == refreshToken &&
                    u.RefreshTokenExpiryTime > DateTime.UtcNow);

                if (user == null)
                {
                    _logger.LogWarning("Invalid or expired refresh token.");
                    return Unauthorized(new { message = "Invalid or expired refresh token. Please login again." });
                }

                // generate new access and refresh tokens
                var newAccessToken = _tokenService.GenerateAccessToken(user);
                var newRefreshToken = _tokenService.GenerateRefreshToken();

                // update user record
                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    _logger.LogError("Failed to update user refresh token.");
                    return StatusCode(500, new { message = "Could not update refresh token." });
                }

                Response.Cookies.Append("refresh_token", newRefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddDays(7)
                });

                _logger.LogInformation("Refresh token rotated and access token issued for user {UserId}", user.Id);

                return Ok(new
                {
                    token = newAccessToken
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during refresh token process.");
                return StatusCode(500, new { message = "Internal server error during token refresh." });
            }
        }
    }
}
