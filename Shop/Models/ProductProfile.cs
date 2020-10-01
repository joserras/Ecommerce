using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Models
{
    public class ProductProfile
    {
        [Required]
        public string Name { get; set; }
        public List<Opinion> Opinions { get; set; }

        public int Stock { get; set; }

        [Required]
        public string Description { get; set; }

        public int Amount { get; set; }

        public double Price { get; set; }

        public List<Image> Image { get; set; }
        [Key]
        public string Id { get; set; }

        public DateTime DateRegister { get; set; } = DateTime.Now;
    }
}
