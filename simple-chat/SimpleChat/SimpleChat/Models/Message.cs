using System;

namespace SimpleChat.Models
{
    public class Message
    {
        public string ClientId { get; set; }
        
        public string Type { get; set; }
        
        public string Content { get; set; }
        
        public DateTime Date { get; set; }
    }
}