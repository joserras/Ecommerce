using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Shop.Data;
using Shop.Models;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using IdentityServer4.Models;
using System.Security.Claims;
using System.Collections.Generic;
using IdentityServer4.Services;
using System;
using IdentityModel;

using Microsoft.AspNetCore.Http;

namespace Shop
{
    public class Startup
    {

        private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<User>>();

            IdentityResult roleResult;
            //Adding Admin Role
            var roleCheck = await RoleManager.RoleExistsAsync("Admin");
            if (!roleCheck)
            {
                //create the roles and seed them to the database
                roleResult = await RoleManager.CreateAsync(new IdentityRole("Admin"));
            }
            //Adding Admin Role
            var roleCheck2 = await RoleManager.RoleExistsAsync("Ordinary");
            if (!roleCheck2)
            {
                //create the roles and seed them to the database
                roleResult = await RoleManager.CreateAsync(new IdentityRole("Ordinary"));
            }
            //Assign Admin role to the main User here we have given our newly registered 
            //login id for Admin management
            User user = await UserManager.FindByEmailAsync("1@hotmail");
            if (user == null)
            {
                user = new User();
                user.Email = "1@hotmail";
                user.EmailConfirmed = true;
                user.UserName = "1@hotmail";
                user.FullName = "Admin 1";
                await UserManager.CreateAsync(user,"@Lorkino95");
            }
            await UserManager.AddToRoleAsync(user, "Admin");
        }
        public static IEnumerable<ApiResource> GetApis()
        {
            return new ApiResource[]
            {
            new ApiResource("MyApi", "My Admin API")
            {
            UserClaims = { JwtClaimTypes.Name, JwtClaimTypes.Email }
            }
            };
        }
        public class AspNetIdentityProfileService : IProfileService
        {
            protected UserManager<User> _userManager;
            public AspNetIdentityProfileService(UserManager<User> userManager)
            {
                _userManager = userManager;
            }
            public Task GetProfileDataAsync(ProfileDataRequestContext context)
            {
                //Processing
                var user = _userManager.GetUserAsync(context.Subject).Result;
                var claims = new List<Claim>
{
new Claim(ClaimTypes.Name, user.UserName),
};
                context.IssuedClaims.AddRange(claims);
                //Return
                return Task.FromResult(0);
            }
            public Task IsActiveAsync(IsActiveContext context)
            {
                //Processing
                var user = _userManager.GetUserAsync(context.Subject).Result;
                context.IsActive = (user != null) && ((!user.LockoutEnd.HasValue) || (user.LockoutEnd.Value <= DateTime.Now));
                //Return
                return Task.FromResult(0);
            }
        }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));
           services.AddMvc().AddNewtonsoftJson(o => 
    {
    o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    });
            services.Configure<IdentityOptions>(options =>
            {
                // Default Lockout settings.
                options.SignIn.RequireConfirmedEmail = false;
                options.User.RequireUniqueEmail = true;
            });
            services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
            services.AddIdentityServer().AddProfileService<AspNetIdentityProfileService>()
                .AddApiAuthorization<User, ApplicationDbContext>();

            services.AddAuthentication().AddIdentityServerJwt();


            //services.Configure<IdentityOptions>(options =>
            //{
            //    // Password settings.
            //    options.Password.RequireDigit = true;
            //    options.Password.RequireLowercase = true;
            //    options.Password.RequireNonAlphanumeric = true;
            //    options.Password.RequireUppercase = true;
            //    options.Password.RequiredLength = 6;
            //    options.Password.RequiredUniqueChars = 1;
            //    options.SignIn.RequireConfirmedEmail = false;
            //    // Lockout settings.
            //    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            //    options.Lockout.MaxFailedAccessAttempts = 5;
            //    options.Lockout.AllowedForNewUsers = true;

            //    // User settings.
            //    options.User.AllowedUserNameCharacters =
            //    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
            //    options.User.RequireUniqueEmail = true;
            //});
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
           
            services.AddControllersWithViews();
            services.AddRazorPages();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider svProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
            CreateUserRoles(svProvider).Wait();
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
