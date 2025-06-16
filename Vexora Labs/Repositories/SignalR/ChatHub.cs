using Microsoft.AspNetCore.SignalR;

namespace Vexora_Labs.Repo.SignalR
{
    public class ChatHub : Hub
    {
        public async Task JoinAdminGroup()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Admins");
        }
        public async Task SendNotification(string message)
        {
            await Clients.All.SendAsync("ReceiveNotification", message);
        }

    }
}
