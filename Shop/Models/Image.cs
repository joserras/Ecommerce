using System;
using System.Collections.Generic;
using Newtonsoft.Json;
namespace Shop.Models
{
    public class Image
    {

     
        [System.ComponentModel.DataAnnotations.Key]
        public string Id { get; set; }
        [JsonConverter(typeof(Film.TypeOf.Base64FileJsonConverter))]
        public byte[] Content { get; set; }
    }
}
