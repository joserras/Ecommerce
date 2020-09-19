using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Models
{
    public class Categories
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public int Identifier { get; set; }
        public int Parent_Identifier { get; set; }
        public int Level { get; set; }


    }
}
