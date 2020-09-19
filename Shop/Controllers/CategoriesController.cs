using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Shop.Data;
using Shop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Shop.Data.Migrations;

namespace Shop.Controllers
{
    [AllowAnonymous]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {

        private readonly SignInManager<User> _signInManager;
        private UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;
        public CategoriesController(SignInManager<User> signInManager, UserManager<User> userManager, ApplicationDbContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;

        }
        public ActionResult<List<Categories>> GetCategories()
        {
            List<Categories> categories = _context.Categories.OrderBy(a => a.Level).ToList();
            return categories;
        }
    }
}
