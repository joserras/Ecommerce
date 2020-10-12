using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Models
{
    public class User : IdentityUser
    {
        public string Address { get; set; }

        public string FullName { get; set; }
    }
}
