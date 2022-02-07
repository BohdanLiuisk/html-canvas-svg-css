using System;
using Newtonsoft.Json;

namespace SimpleChat.Models
{
    public class Message
    {
        [JsonProperty("clientId")]
        public string ClientId { get; set; }
        
        [JsonProperty("type")]
        public string Type { get; set; }
        
        [JsonProperty("content")]
        public string Content { get; set; }
        
        [JsonProperty("date")]
        public DateTime Date { get; set; }
    }
}