using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SimpleChat.Models;

namespace SimpleChat.Hubs
{
    public class MessageHub : Hub
    {
        public async Task NewMessage(Message message)
        {
            await Clients.All.SendAsync("MessageReceived", message);
        }
    }
}