using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Models
{
    public class Opinion
    {
        [Required]
        public string Description { get; set; }
        public int Score{ get; set; }
        public string Verified { get; set; }
        public bool Administred { get; set; }
        [Key]
        public string Id { get; set; }

    }
}
