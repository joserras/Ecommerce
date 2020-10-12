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

namespace Shop.Controllers
{
    [AllowAnonymous]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {

        private readonly SignInManager<User> _signInManager;
        private UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;

        public class user
        {


            [Required]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }
            public bool RememberMe { get; set; }

            public string Username { get; set; }

            public string FullName { get; set; }

            public string PhoneNumber { get; set; }

            public string Address { get; set; }
            public string Rol { get; set; }
            public static implicit operator user(User c)
            {
                user userConverted = new user();
                userConverted.Email = c.Email;
                userConverted.PhoneNumber = c.PhoneNumber;
                userConverted.Address = c.Address;
                userConverted.Username = c.UserName;
                userConverted.FullName = c.FullName;
                return userConverted;
            }
        }
        public class RegisterForm
        {
            [Required]
            public string Email { get; set; }
            [Required]
            public string FullName { get; set; }
            [Required]
            public string Password { get; set; }
            [Required]
            public string Password2 { get; set; }

        }
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthorizationController(IHttpContextAccessor httpContextAccessor, SignInManager<User> signInManager, UserManager<User> userManager, ApplicationDbContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        [HttpPost]
        public async Task<ActionResult<User>> Login([FromBody] user user)
        {

            //// This doesn't count login failures towards account lockout
            //// To enable password failures to trigger account lockout, set lockoutOnFailure: true



            var result = await _signInManager.PasswordSignInAsync(user.Email, user.Password, user.RememberMe, lockoutOnFailure: false);



            if (result.Succeeded)
            {
                User a = await _userManager.FindByEmailAsync(user.Email);
                user c = (user)a;
                var rol = await _userManager.GetRolesAsync(a);
                c.Rol = rol.First();
                return Ok(c);
            }

            //if (result.RequiresTwoFactor)
            //{
            //    return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = Input.RememberMe });
            //}
            if (result.IsLockedOut)
            {
                return Ok("Blocked user");
            }



            //// If we got this far, something failed, redisplay form
            return NotFound(); ;
        }

        public async Task<string> Register([FromBody] RegisterForm user)
        {
            //los usuarios se loguean con el username por eso utilizo el email
            var user2 = new User { UserName = user.Email, Email = user.Email, FullName = user.FullName, EmailConfirmed = true };
            var result = await _userManager.CreateAsync(user2, user.Password);
            if (result.Succeeded)
            {
                User a = await _userManager.FindByEmailAsync(user.Email);
                var r = await _userManager.AddToRoleAsync(a, "Ordinary");
                if (r.Succeeded)
                    return "Usuario correcto";
                else return r.Errors.ToString();
            }
            else return "Error al crear el usuario";
        }
    }
}
