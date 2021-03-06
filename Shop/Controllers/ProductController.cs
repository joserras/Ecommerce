﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Data;
using Shop.Models;

namespace Shop.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private SignInManager<User> _signInManager;
        private UserManager<User> _userManager;
        private ApplicationDbContext _context;
        private IHttpContextAccessor _httpContextAccessor;


        public ProductController(IHttpContextAccessor httpContextAccessor, SignInManager<User> signInManager, UserManager<User> userManager, ApplicationDbContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> NewProductProfile([FromBody] ProductProfile product)
        {

            //// This doesn't count login failures towards account lockout
            //// To enable password failures to trigger account lockout, set lockoutOnFailure: true

            _context.ProductsProfile.Add(product);
            await _context.SaveChangesAsync();

            return Ok();

        }
        [HttpPost]
        public ActionResult<List<ProductProfile>> GetProducts([FromQuery]string value)
        {
            List<ProductProfile> products = _context.ProductsProfile.Where(a => a.Name.Contains(value)).ToList();
            return Ok(products);
        }

        [HttpGet]
        public ActionResult<User> GetLastProducts()
        {

            //// This doesn't count login failures towards account lockout
            //// To enable password failures to trigger account lockout, set lockoutOnFailure: true

            List<ProductProfile> LastProducts = _context.ProductsProfile.OrderBy(a => a.DateRegister).Include(a => a.Image).Include(a => a.Opinions).Take(15).ToList();
            return Ok(LastProducts);

        }


    }
}
