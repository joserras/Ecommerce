using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Models
{
    public class Product
    {
        public ProductProfile ProductProfile { get; set; }
        public User User { get; set; }
        public Categories Categories { get; set; }
        public int Tracking { get; set; }
        [Key]
        public string Id { get; set; }

    }
}
